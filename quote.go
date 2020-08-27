package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/jackc/pgx"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"strconv"
)

type Client struct {
	Name   string
	Usrid  int
	Street string
	City   string
	Email  string
	Zip    int
}
type Quote struct {
	Job     string
	Product string
	Qty     int
	EstRev  int
	Usrid   int
}
type User struct {
	Email string `json: email`
	Password string`json: password` 
	Usrid int
}

var conn *pgx.Conn

func init() {
	var err error
	conn, err = pgx.Connect(context.Background(), "user="+os.Getenv("PGUSER")+" password="+os.Getenv("PGPASSWORD")+" dbname="+os.Getenv("PGDATABASE"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to the database:\t%v", err)
	} else {
		fmt.Printf("Successfully connected to db: %s\n", os.Getenv("PGDATABASE"))
	}
}
func renderJson(d interface{}) []byte {
	data, err := json.Marshal(d)
	if err != nil {
		fmt.Printf("Error converting to JSON:\t %v", err)
	}
	return data
}
func homeHand(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Page Not Found", 404)
	}
	fmt.Fprint(w, "Hello World")
}

//get all of the user quotes and send as json
func quoteHand(w http.ResponseWriter, r *http.Request) {
	var quotes []Quote
	if r.Method != "GET" {
		http.Error(w, "Page Not Found", 404)
	}
	rows, err := conn.Query(context.Background(), "select * from quote")
	if err != nil {
		fmt.Printf("Error getting quotes:\t %v", err)
	}
	for rows.Next() {
		q := Quote{}
		err := rows.Scan(&q.Job, &q.Product, &q.Qty, &q.EstRev, &q.Usrid)
		if err != nil {
			fmt.Printf("Error scaning quote for db : %s\n", err)
		}
		quotes = append(quotes, q)
	}
	w.Write(renderJson(quotes))
}

//get all of the user's clients and send as json
func clientHandler(w http.ResponseWriter, r *http.Request) {
	var clients []Client
	if r.Method != "GET" {
		http.Error(w, http.StatusText(400), http.StatusBadRequest)
	}
	rows, err := conn.Query(context.Background(), "SELECT * FROM client ORDER BY Usrid")
	if err != nil {
		fmt.Printf("Error getting client:\t %s", err)
	}
	for rows.Next() {
		var c Client
		err := rows.Scan(&c.Name, &c.Usrid, &c.Street, &c.City, &c.Email, &c.Zip)
		if err != nil {
			fmt.Errorf("Error Scanning client rows:\t", err.Error())
		}
		clients = append(clients, c)
	}
	defer rows.Close()
	w.Write(renderJson(clients))
}

// Parse post request for a new client and insert it into the "client" database
func newClient(w http.ResponseWriter, r *http.Request) {
	// don't know why r.FormValue is not working
	// in the mean time i will read the request body and parse it myself
	c := Client{}
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println(err)
	}
	u, _ := url.ParseQuery(string(data))
	c.Name = u.Get("name")
	c.Street = u.Get("address")
	c.City = u.Get("city")
	c.Email = u.Get("email")
	zip, _ := strconv.Atoi(u.Get("zip"))
	c.Zip = zip
	fmt.Printf("Read Body: %s\n", data)
	fmt.Printf("client: %+v\n", c)
	_, er := conn.Exec(context.Background(), "insert into client(Name, Street, City, Email, Zip) values($1,$2,$3,$4,$5)", c.Name, c.Street, c.City, c.Email, c.Zip)
	if er != nil {
		fmt.Printf("Error inserting into cleint table:\t %v", er.Error())
	}
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

//list all data from any table in postgres (not implemented)
func listData(data interface{}, query string) (interface{}, error) {
	var d []interface{}
	rows, err := conn.Query(context.Background(), query)
	if err != nil {
		fmt.Printf("Error getting data:\t%s", err.Error())
		return nil, err
	}

	for rows.Next() {
		err := rows.Scan(data)
		if err != nil {
			return nil, err
		}
		d = append(d, data)
	}
	return d, nil
}

// delete spefic quote from the database
//the quote id will be pass to backend by the urlpath
func deleteQuote(w http.ResponseWriter, r *http.Request) {
	q := Quote{}
	test, _ := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err := json.Unmarshal(test, &q); err != nil {
		fmt.Printf("error unmarshaling json usrid: %s", err)
	}
	fmt.Printf("%v", q)

	_, er := conn.Exec(context.Background(), "delete from quote where Usrid=$1", q.Usrid)
	if er != nil {
		fmt.Printf("Error deleting quote from the database:\t %v", er.Error())
	}
	http.Redirect(w, r, "/quote", http.StatusSeeOther)
}

// need to fix the quote database better under standing of foriegn key constrant
// queries client by id to populate edit form on the client side
func editClient(w http.ResponseWriter, r *http.Request) {
	c := Client{}
	u := r.URL.Query()
	id, er := strconv.Atoi(u.Get("id"))
	if er != nil {
		fmt.Println(er)
	}
	err := conn.QueryRow(context.Background(), "select * from client where Usrid=$1", id).Scan(&c.Name, &c.Usrid, &c.Street, &c.City, &c.Email, &c.Zip)
	if err != nil {
		fmt.Println(err)
	}
	w.Write(renderJson(c))
}
// takes a post request on any changes in the clients information
// and adds it to the database
func updateClient(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		c := Client{}
		req, _ := ioutil.ReadAll(r.Body)
		u, _ := url.ParseQuery(string(req))
		fmt.Println(string(req))
		defer r.Body.Close()
		c.Email = u.Get("email")
		c.Name = u.Get("name")
		c.City = u.Get("city")
		c.Street = u.Get("address")
		c.Zip, _ = strconv.Atoi(u.Get("zip"))
		c.Usrid, _ = strconv.Atoi(u.Get("usrid")) 
		fmt.Printf("%+v\n", c)

		_, err := conn.Exec(context.Background(), "update client set name = $1, Email = $2, City = $3, Street = $4, Zip = $5 where Usrid = $6", c.Name, c.Email,c.City, c.Street, c.Zip, c.Usrid)
		if err != nil {
			fmt.Printf("Error updating client: %s\n" ,err)
		}
	}
		http.Redirect(w, r, "/client", http.StatusSeeOther)
}
// hash works but can't get http.Redirect to work
func login(w http.ResponseWriter, r *http.Request){
	if r.Method == "POST"{
		u := User{}
		info, _ := ioutil.ReadAll(r.Body)	
		defer r.Body.Close()
		if err := json.Unmarshal(info, &u); err != nil{
			fmt.Printf("Error parsing login information: %s\n", err)
		}
		account, ok := isUser(u.Email)
		if !ok{
			//handle signup temp fix
		//	w.Write([]byte("Need to signup!"))
			fmt.Println("error checking password")
		}
		//check passwords match
		pswrd := checkPwrd(u.Password, account.Password)
		if !pswrd{

			//handle signup temp fix
		//	w.Write([]byte("Need to signup!"))
			fmt.Println("error checking password")
		}
		fmt.Printf("Login sucessful")
		http.Redirect(w, r, "/client", http.StatusSeeOther)
	}
	
}

func main() {
	http.HandleFunc("/", login)
	http.HandleFunc("/client", clientHandler)
	http.HandleFunc("/client/edit/", editClient)
	http.HandleFunc("/quote", quoteHand)
	http.HandleFunc("/client/edit/process/", updateClient)
	http.HandleFunc("/client/new/process", newClient)
	http.HandleFunc("/quote/delete/process", deleteQuote)
	http.ListenAndServe(":5000", nil)
}
