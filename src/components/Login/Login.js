import React, { useEffect } from 'react';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from '../../Shared/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
const Login = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
  
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    useEffect(()=>{
        if (user || gUser) {
            console.log(user || gUser);
            navigate(from, { replace: true });
        }
    })
    if (loading || gLoading) {
        return <Loading></Loading>
    }
    let signInError;
    if (error || gError) {
        signInError = <p className='text-red-500'>{error?.message || gError?.message}</p>
    }
    const onSubmit = (data) => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password)
    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="tetx-center text-xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Please Fill Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/,
                                        message: 'Please Give a Valid Email' // JS only: <p>error message</p> TS only support string
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className='text-red-500 font-bold'>{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className='text-red-500 font-bold'>{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Please Fill Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Atleast Write 6 Character',
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className='text-red-500 font-bold'>{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-500 font-bold'>{errors.password.message}</span>}
                            </label>
                        </div>
                        {signInError}
                        <input className='btn btn-primary w-full' type="submit" value="Login" />
                    </form>
                    <p>New to Doctors Portal? <a className='text-primary' href="/signup">Create New Account</a></p>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-primary">SignInWithGoogle</button>
                </div>
            </div>
        </div>
    );
};

export default Login;