import React, {useState, useEffect} from 'react';
function Quotes(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [quote, setQuote] = useState([]);
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("/quote")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setQuote(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return(
        <ul>
            <li>{quote.Name}</li>
            <li>{quote.Job}</li>
            <li>{quote.Supplies}</li>
        </ul>
      );
    }
  }
export default Quotes;