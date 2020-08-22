import React, { useState, useEffect } from "react";
function Quotes() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [quotes, setQuote] = useState([]);

  function deleteQuote(quote){
    fetch(`/quote/delete/process`,{
      method: "post",
      body: JSON.stringify(quote)
    })
  }
	useEffect(() => {
		fetch("/quote")
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setQuote(result);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			);
	}, []);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<div className="container-fluid">
				<div className="row text-center flex-wrap mt-2">
					{quotes.map((quote) => (
						<div className="col-sm">
							<div className="card">
								<h5 className="card-header mr-7">Job: {quote.Job}</h5>
								<div className="card-body">
									<h5 className="card-title">
										{quote.Qty} {quote.Product}
									</h5>
									<p className="card-text">${quote.EstRev}</p>
                  <div className="btn-group">
										<a href="/quote" className="btn btn-outline-success mr-4" onClick={()=>window.confirm("are you sure")}>
											Email Quote
										</a>
										<a href="/" className="btn btn-outline-warning mr-4">
											Edit
										</a>
										<a href= "/quote" className="btn btn-outline-danger mr-4" onClick={()=>deleteQuote(quote)}>
											Delete
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}
export default Quotes;
