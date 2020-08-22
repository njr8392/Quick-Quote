import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Clients from "./Client";
import Navbar from "./components/Navbar";
import ClientForm from "./components/ClientForm";
import Quotes from "./Quote";
import EditClient from "./components/EditClient";
import QuoteForm from "./components/QuoteForm";
import LoginFrom from "./components/LoginForm";
function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/">
						<LoginFrom/>
					</Route>
					<Route exact path="/client">
						<Clients />
					</Route>
					<Route exact path="/quote">
						<Quotes />
					</Route>
					<Route path="/client/new">
						<ClientForm />
					</Route>
					<Route path="/client/edit/:id">
						<EditClient />
					</Route>
					<Route exact path = "/quote/new">
						<QuoteForm />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
