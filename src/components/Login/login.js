import {useForm} from 'react-hook-form'

const Login = () => {
const{register, handleSubmit, formState:{errors} } = useForm()

    return(
        <div>
            <form classname='form' onSubmit={handleSubmit(onSubmit)}>
                <label className='label'>Login
                    <input {...register('login',{minLength: 3})} type='text'/>
                </label>
            </form>
        </div>
    );
}