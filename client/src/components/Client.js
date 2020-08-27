import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// function editClient(client) {
// 	fetch(`/client/edit`, {
// 		method: "post",
// 		body: JSON.stringify(client),
// 	});
// }
function Quotes() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [clients, setClient] = useState([]);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		fetch("/client")
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setClient(result);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
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
					{clients.map((client) => (
						<div className="col-md-3 col-sm-6 mt-5">
							<div class="card">
								<h5 class="card-header mr-7 p3">{client.Name}</h5>
								<div class="card-body">
									<h5 class="card-title">
										{client.Street} {client.City}
									</h5>
									<p class="card-text">{client.Email}</p>
									<Link
										to={`client/edit/${client.Usrid}`}
										className="btn btn-outline-primary"
									>
										Edit
									</Link>
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
