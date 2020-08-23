package main
import(
"crypto/sha256"
"fmt"
"context"
)
//checks if the user is registered
func isUser(email string) (*User, bool){
	var u User
	if err := conn.QueryRow(context.Background(), "select * from users where Email = $1", email).Scan(&u.Email, &u.Password, &u.Usrid ); err != nil{
		fmt.Printf("Error retriving user: %s", err)
		return nil, false
	}
	return &u, true

}
//check if passwords match takes user entered password hashes it and converts back to a string to compare
//to the saved type that is entered into the password
func checkPwrd(pwd, savedpwd string)bool{
	fmt.Printf("password enterd is %s\n", pwd)
	hash := sha256.Sum256([]byte(pwd))
	fmt.Printf("hash of pass: %s\n", hashString(hash))
	if hashString(hash) == savedpwd{
		return true
	}
	return false
}
//change sha256 into hex string to compare to the text type saved in the database
func hashString(data [32]byte)string{
	return fmt.Sprintf("%x", data)
}
