import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

function EditClient() {
	let {id} = useParams();
	const [client, setClient] = useState({});
	const [error, setError] = useState(null)
// fix to edit render once
	useEffect(()=>{
		fetch(`/client/edit/?id=${id}`)
		.then(res => res.json()) 
		.then((result) => {
			setClient(result)},
	(error) => {setError(error)}
	)}, [])
if (error){
	return <div>Error loading data</div>
}	
	return (
		<div className="container">
			<form action="/client/edit/process/" method="POST">
				<div className="form-row">
					<div className="col-sm">
						<label for="name">Name</label>
						<input
							className="form-control"
							id="name"
							type="text"
							name="name"
							value = {client.Name}
							onChange={e => setClient({Name: e.target.value})}
						/>
						<br />
					</div>
					<div className="col-sm">
						<label for="email">Email</label>
						<input
							className="form-control"
							type="text"
							name="email"
							value = {client.Email}
							onChange={e => setClient({Email: e.target.value})}
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col">
						<label>Address</label>
						<input
							className="form-control"
							type="text"
							name="address"
							value={client.Street}
							onChange={e => setClient({Address: e.target.value})}
						/>
					</div>
					<div className="form-row">
						<div className="form-group col">
							<label>City</label>
							<input
								className="form-control"
								type="text"
								name="city"
								value={client.City}
							onChange={e => setClient({City: e.target.value})}
							/>
						</div>
					</div>
					<div className="form-group col">
						<label>Zip</label>
						<input
							className="form-control"
							type="text"
							name="zip"
							value={client.Zip}
							onChange={e => setClient({Zip: e.target.value})}
						/>
					<div className="form-group col">
						<label>User ID</label>
						<input
							className="form-control"
							type="text"
							name="usrid"
							value={client.Usrid}
							readOnly
						/>
					</div>
					</div>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
export default EditClient;