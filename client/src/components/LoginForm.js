import React from "react";
import { useState, useEffect } from "react";
function LoginFrom() {
	const [info, setInfo] = useState({
		email: "",
		password: "",
	});
	// why is only the pasword being sent
	const submitForm = function(){
	 	fetch("/", {
	 		method: "POST",
	 		headers: {
	 			"Content-Type": "application/json",
	 		},
	 		body: JSON.stringify(info),
		 })
		 .then(data => console.log(data))
		 .catch((err) => console.log(err));
	 }
	useEffect(() => console.log(info));

	const changeEmail = (event)=>{
		setInfo(({...info, email: event.target.value}))
	}
	const changePass = (event)=>{
		setInfo(({...info, password: event.target.value}))
	}

	return (
		// need to a some padding
		<div className="container-fluid-bg m-5">
			<form
				//  className="form-container justify-content-center"
				//  action="/"
				//  method="POST"
			>
				<div className="form-group">
					<label for="email">Email</label>
					<input
						type="text"
						className="form-control"
						id="email"
						value={info.email}
						placeholder="email@email.com"
						onChange={changeEmail}
					/>
				</div>
				<div className="form-group">
					<label for="Password">PassWord</label>
					<input
						type="password"
						className="form-control"
						id="Password"
						value={info.password}
						placeholder="Password"
						onChange={changePass}
					/>
				</div>
				<div id="loginbutton">
					<button
						type="button"
						className="btn btn-outline-secondary"
                        onClick={submitForm}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
export default LoginFrom;
