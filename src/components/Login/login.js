import {useForm} from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import axios from 'axios'
import { dbUrl } from './dbUrl'
import { useDispatch } from 'react-redux'
import { setUser } from '../Redux/slices'
import { ACTIVE_ROUTES, useRegisterRoute } from '../RouteProvider'


const Login = () => {
const{register, handleSubmit, formState:{errors} } = useForm()
const [isRegisterFailed, setIsRegisterFailed] = useState(false)
const navigate = useNavigate()
const dispatch = useDispatch()
const {setActiveRoute} = useRegisterRoute()

const onSubmit = (data) => {
axios.get(`${dbUrl}/users`)
.then(res => {
    if(res.data.find(user => user.name === data.login && user.password === data.password)){
        dispatch(setUser(data.login))
        setTimeout(() => {
            navigate('../Home')
        },1000)

    }else{
        setIsRegisterFailed(true)
        alert('Ooops, the server did not find the user!')
    }
})
.catch(err => alert(err.message))
}
    return(
        <div id='login'>
            
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
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
                isRegisterFailed && <button className='registerbtn' onClick={() => /*setActiveRoute(ACTIVE_ROUTES[1])*/{}}>GO TO REGISTRATION</button>
            }
            
        </div>
    );
}
export default Login