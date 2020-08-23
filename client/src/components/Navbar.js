import React from "react";
import {Link} from 'react-router-dom';
function Navbar() {
	return (
        <div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="/">
				Quoting System
			</a>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavAltMarkup"
				aria-controls="navbarNavAltMarkup"
				aria-expanded="False"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
				<div class="navbar-nav">
                    <Link className="nav-item nav-link active" to= "/">Home<span class="sr-only">(current)</span></Link>
					<Link className="nav-item nav-link" to="/client">
						Clients
					</Link>
					<Link className="nav-item nav-link" to="/client/new">
						New Client
					</Link>
					<Link className="nav-item nav-link" to="/quote">
						Quotes
					</Link>
					<Link className="nav-item nav-link" to="/quote/new">
						New Quote
					</Link>
				</div>
			</div>
		</nav>
    </div>
    );
}
export default Navbar;