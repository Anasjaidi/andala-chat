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
	const token = useSelector((state) => state.user.token);
	const dispatcher = useDispatch();

	useEffect(() => {
		const fetchConvs = async () => {
			if (isLoggedIn) {
				/**
				 * get all conversations
				 */
				const data = await axios.get("/api/v1/conversation", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				/**
				 *
				 * add new conversation
				 */
				const newCnv = await axios.post(
					"/api/v1/conversation",
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				/**
				 * ask ai a question
				 */
				const response = await axios.post(
					`/api/v1/conversation/${data.data.data[0].uid}`,
					{
						content: "hello, chat gpt",
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const messages = await axios.get(
					`/api/v1/conversation/${data.data.data[0].uid}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				console.log("----------------------------");
				console.log("reponse of asking ai");
				console.log(response.data);
				console.log("----------------------------");
				console.log("reponse of adding new conversation");
				console.log(newCnv.data);
				console.log("----------------------------");
				console.log("reponse of all user conversations");
				console.log(data.data);
				console.log("----------------------------");
				console.log("reponse of all messages in conversations");
				console.log(messages);
				console.log("----------------------------");
			}
		};

		fetchConvs().then(() => {});
	}, []);

	return (
		<div className="w-screen h-screen bg-black/90">
			<Layout>
				{isLoggedIn && <Chat />}
				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>

					{!isLoggedIn && (
						<Route path="/auth">
							<AuthPage />
						</Route>
					)}

					<Route path="*">
						<Redirect to="/" />
					</Route>
				</Switch>
			</Layout>
		</div>
	);
}

export default App;
