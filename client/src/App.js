import logo from './logo.svg';
import './App.css'
import Chat from './component/chat';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import {useEffect} from "react";
import axios from "axios";
import store from './store/store';
import { Provider } from 'react-redux';


function App() {

	const fetchUser  = async () =>
	{
		const data = await axios.get('/api/v1/user/signup')

        console.log(data)
	}

    useEffect(async () => {
        // const data = await fetch('/api/v1/user/')
		fetchUser();
		
    }, [])

  return (
		<div className="w-screen h-screen bg-black/90">
			<Provider store={store}>
				<Layout>
					<Switch>
						<Route path="/" exact>
							<HomePage />
						</Route>
						<Route path="/auth">
							<AuthPage />
						</Route>
						<Route path="/profile">
							<UserProfile />
						</Route>
					</Switch>
				</Layout>
				<Chat />
			</Provider>
		</div>
	);
}

export default App;




