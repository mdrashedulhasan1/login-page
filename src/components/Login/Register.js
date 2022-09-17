import React from 'react';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from '../../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
const Register = () => {
    const navigate = useNavigate();
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
   
    if (loading || gLoading || updating) {
        return <Loading></Loading>
    }
    let signInError;
    if (error || gError || updateError) {
        signInError = <p className='text-red-500'>{error?.message || gError?.message || updateError?.message}</p>
    }
    if (user || gUser) {
        console.log(user || gUser);
    }
    const onSubmit = async(data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName:data.name });
        alert('Updated profile');
        console.log(data);
        navigate('/')
    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="tetx-center text-xl font-bold">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Email Address"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Please Fill Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className='text-red-500 font-bold'>{errors.name.message}</span>}
                            </label>
                        </div>
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
                        <input className='btn btn-primary w-full' type="submit" value="SignUp" />
                    </form>
                    <p><small>Already Have an Account? <Link to='/login' className='text-primary'>Please Login</Link></small></p>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-primary">SignInWithGoogle</button>
                </div>
            </div>
        </div>
    );
};

export default Register;