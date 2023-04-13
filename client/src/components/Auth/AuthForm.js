import { useState , useRef} from 'react';

import classes from './AuthForm.module.css';
import axios from "axios";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const passwordRef = useRef()
  const emailRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitFormHandler = async e => {
    e.preventDefault()
    const entredEmailValue = emailRef.current.value
    const entredPasswordValue = passwordRef.current.value

    const data = await axios.post('/api/v1/user/signup', {
      firstName: "new name",
      lastName: "new last name",
      email: entredEmailValue,
      password: entredPasswordValue
    })
    console.log(data)
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef}/>
        </div>
        <div className={classes.actions}>
          <button onClick={submitFormHandler}>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
