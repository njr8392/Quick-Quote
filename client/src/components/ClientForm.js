import React from "react";
function ClientForm() {
	return (
		<div className="container">
			<form action="/client/new/process" method="POST">
				<div className="form-row">
					<div className="col-sm">
						<label for="name">Name</label>
						<input
							className="form-control"
							id="name"
							type="text"
							placeholder="name"
							name="name"
						/>
						<br />
					</div>
					<div className="col-sm">
						<label>Email</label>
						<input
							className="form-control"
							type="text"
							placeholder="xxx@gmail.com"
							name="email"
						/>
					</div>
				</div>
				<div className="form-row">
					<div className="form-group col">
						<label>Address</label>

						<input
							className="form-control"
							type="text"
							placeholder="52 Vine Ave"
							name="address"
						/>
					</div>
					<div className="form-row">
						<div className="form-group col">
							<label>City</label>
							<input
								className="form-control"
								type="text"
								placeholder="Bloomfield"
								name="city"
							/>
						</div>
					</div>
					<div className="form-group col">
						<label>Zip</label>
						<input
							className="form-control"
							type="text"
							placeholder="01234"
							name="zip"
						/>
					</div>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
export default ClientForm;
