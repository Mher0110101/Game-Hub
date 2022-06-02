import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { dbUrl } from "../Login/dbUrl"
import '../Login/login.css'
import { ACTIVE_ROUTES, useRegisterRoute } from "../RouteProvider"

const [LOGIN] = ACTIVE_ROUTES

const Register = () => {
    const [isRegisterFailed, setIsRegisterFailed] = useState(true)
    const {setActiveRoute} = useRegisterRoute()
    const {register, handleSubmit, formState: {errors}} = useForm()

    const onSubmit = data => {
        axios.post(`${dbUrl}/users`, {
            name: data.login,
            password: data.password
        })

        setIsRegisterFailed(false)
        setTimeout(() => {
            setActiveRoute(LOGIN)
        }, 1000)
    }

    return (
        <div>
            <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
                <label className='label'>
                    LOGIN
                    <input {...register('login', {required: true, minLength: 4})} type="text"/>
                </label>
                <label className='label'>
                    PASSWORD
                    <input {...register('password', {required: true, minLength: 4})} type="password"/>
                </label>
                <label className='label'>
                    REPEAT PASSWORD
                    <input {...register('rePassword', {required: true})} type="password"/>
                </label>
                <button type='submit' className="registerbtn" >REGISTER</button>
            </form>
            {
                !isRegisterFailed && <p>Registration succeed!</p>
            }
        </div>
    )
}

export default Register