import logo from './logo.svg';
import './App.css';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import { useForm } from "react-hook-form";
function App() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  if(user){
    console.log(user);
  }
  return (
    <div className="App">
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
                    required:{
                      value:true,
                      message:'Please Fill Required'
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
                    required:{
                      value:true,
                      message:'Please Fill Required'
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
              <input className='btn btn-primary w-full' type="submit" value="Login" />
            </form> 
            <div className="divider">OR</div>
          <button onClick={() => signInWithGoogle()} className="btn btn-primary">SignInWithGoogle</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
