import logo from './logo.svg';
import './App.css'
import Chat from './component/chat';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="w-screen h-screen bg-black/90">
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/auth'>
                    <AuthPage />
                </Route>
                <Route path='/profile'>
                    <UserProfile />
                </Route>
            </Switch>
        </Layout>
		<Chat />
    </div>
  );
}

export default App;




