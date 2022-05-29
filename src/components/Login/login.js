import {useForm} from 'react-hook-form'
import { useState } from 'react'
import './login.css'
const Login = () => {
const{register, handleSubmit, formState:{errors} } = useForm()
const [isRegisterFailed, setIsRegisterFailed] = useState(false)

    return(
        <div id='login'>
            <form className='form' onSubmit={handleSubmit()}>
                <label className='label'>LOGIN<br/>
                    <input {...register('login',{minLength: 3})} type='text' placeholder='userName or login'/>
                    {errors && <div>{errors.login?.message}</div>}
                </label>
                <label className='label'>
                    PASSWORD<br/>
                    <input {...register('password')} type="password" placeholder='password'/>
                </label>
                <br/>
                <label>
                    <input type="checkbox" {...register('save')}/>
                    Remember me
                </label>
                <br/>
                <button type='submit' className='registerbtn'>LOG IN</button>
            </form>
            {
                isRegisterFailed && <button>Go to Registration</button>
            }
        </div>
    );
}
export default Login