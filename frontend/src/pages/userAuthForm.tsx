import AnimationWrapper from '../common/page-animation';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import InputBox from '../components/input.component';
import googleIcon from "../images/google.png";
import { Link } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

interface UserAuthFormProps {
  type: 'login' | 'signup';
}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ type }) => {
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { signup, error: signupError, isLoading: signupIsLoading } = useSignup();
  const { login, error: loginError, isLoading: loginIsLoading } = useLogin();
  const [isFormSubmitted, setFormSubmitted] = useState<boolean>(false);
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (type === "login") {
      await login(email, password);
    } else {
      await signup(email, password, fullname, username);
    }

      
      toast.success(`Successfully ${type === 'login' ? 'Logged In' : 'Signed Up'}`);
      
      
  };

  const errorToDisplay = type === 'login' ? loginError : signupError;
  useEffect(() => {
    if (isFormSubmitted && errorToDisplay) {
      toast.dismiss();
      toast.error(errorToDisplay);
    }
  }, [isFormSubmitted, errorToDisplay]);

  const animationProps = {
    initial: { opacity: 0 }, 
    animate: { opacity: 1 },
    transition: { duration: 1 }, 
    keyValue: type
  };

  return (
    <AnimationWrapper {...animationProps}>
      <section className="h-screen flex items-center justify-center">
        <Toaster />
        <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-gelasio capitalize text-center mb-8">
            {type === 'login' ? 'Welcome Back' : 'Join Us Today'}
          </h1>
          
          {type !== 'login' && (
            <InputBox
              name="username"
              type="text"
              id="username"
              placeholder="User Name"
              label="User Name"
              icon="fi-rr-id-card-clip-alt"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          )}

          {type !== 'login' && (
            <InputBox
              name="fullname"
              type="text"
              id="fullname"
              placeholder="Full Name"
              label="Full Name"
              icon="fi-rr-user"
              value={fullname}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFullname(e.target.value)}
            />
          )}

          <InputBox
            name="email"
            type="email"
            id="email"
            placeholder="Email"
            label="Email"
            icon="fi-rr-envelope"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <InputBox
            name="password"
            type="password"
            id="password"
            placeholder="Password"
            label="Password"
            icon="fi-rr-lock"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className={`btn-dark center py-2 ${type === 'login' ? (loginIsLoading && 'loading') : (signupIsLoading && 'loading')}`}
            disabled={type === 'login' ? loginIsLoading : signupIsLoading}
          >
            {type === 'login' ? 'Login' : 'Sign Up'}
          </button>

          <div className="relative flex w-full gap-2 items-center my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center ">
            <img src={googleIcon} className="w-5" alt="google_icon" />
            continue With Google
          </button>
          
          {type === "login" ? 
            <p className="mt-6 text-dark-gray text-xl text-center">
              Don’t have an account ?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
            :
            <p className="mt-6 text-dark-gray text-xl text-center">
              Already a member ?
              <Link to="/login" className="underline text-black text-xl ml-1">
                Login here.
              </Link>
            </p>
          }
          
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
