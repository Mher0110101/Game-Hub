import { useMemo } from "react"
import Login from "../Login/login"
import Register from "../Register/register"
import { ACTIVE_ROUTES, useRegisterRoute } from "../RouteProvider"

const [LOGIN, REGISTRATION] = ACTIVE_ROUTES


const component = {
    [LOGIN]: <Login />,
    [REGISTRATION]: <Register />
}

const RegisterComponent = () => {
    const {activeRoute} = useRegisterRoute()

    const ActiveComponent = useMemo(() => component[activeRoute], [activeRoute])

    return (
        <>
            {ActiveComponent}
        </>
    )
}

export default RegisterComponent