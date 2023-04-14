
import "./App.css";
import Chat from "./component/chat";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userAction } from "./store/userSlice";

function App() {
	const isLoggedIn = useSelector((state) => state.user.loggedIn);
	const dispatcher = useDispatch();

	useEffect(() => {
		const fetchConvs = async () => {
			if (!isLoggedIn) {
				const token = localStorage.getItem("token");
				console.log("from localstorage :", token)
				if (token) {
					dispatcher(userAction.login({ token: token }));
					console.log("reach here " + token);
					await axios.get("/api/v1/conversation", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}).then(data => console.log(data));
				}
			}
		};

		fetchConvs().then(() => {});
	}, []);

	return (
		<div className="w-screen h-screen bg-black/90">
			<Layout>
				<Switch>
					{isLoggedIn && (
						<Route path="/" exact>
							<HomePage />
						</Route>
					)}

					{!isLoggedIn && (
						<Route path="/auth">
							<AuthPage />
						</Route>
					)}
				</Switch>
				{isLoggedIn && <Chat />}
			<Redirect to="/auth" />
			</Layout>
		</div>
	);
}

export default App;
