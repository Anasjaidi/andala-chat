import logo from "./logo.svg";
import "./App.css";
import Chat from "./component/chat";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { userAction } from "./store/userSlice";
function App() {
	const isLoggedIn = useSelector((state) => state.user.loggedIn);
	const thetoken = useSelector((state) => state.user.token);
	const dispatcher = useDispatch();

	useEffect(() => {
		// const data = await fetch('/api/v1/user/')

		const fetchConvs = async () => {
			if (!isLoggedIn) {
				const token = localStorage.getItem("token");
				if (token) {
					dispatcher(userAction.login({ token: token }));
				}
			}
			if (isLoggedIn) {
				console.log("reach here " + thetoken);

				axios.get("/api/v1/conversation", {
					headers: {
						Authorization: `Bearer ${thetoken}`,
					},
				}).then(data=> console.log(data));

			
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
			</Layout>
			<Redirect to="/auth" />
		</div>
	);
}

export default App;
