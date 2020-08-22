import React from "react";
import { useState, useEffect } from "react";
function LoginFrom() {
	const [info, setInfo] = useState({
		user: "",
		password: "",
	});
	// why is only the pasword being sent
	function submitLogin() {
		fetch("/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(info),
		}).catch((err) => console.log(err));
	}
	useEffect(() => console.log(info));

	return (
		// need to a some padding
		<div className="container-fluid-bg m-5">
			<form
				className="form-container justify-content-center"
				action="/"
				method="POST"
			>
				<div className="form-group">
					<label for="email">Email</label>
					<input
						type="text"
						className="form-control"
						id="email"
						value={info.user}
						placeholder="email@email.com"
						onChange={(e) => setInfo({ user: e.target.value })}
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
						onChange={(e) => setInfo({ password: e.target.value })}
					/>
				</div>
				<div id="loginbutton">
					<button
						type="button"
						className="btn btn-outline-secondary"
                        onClick={submitLogin}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
export default LoginFrom;
