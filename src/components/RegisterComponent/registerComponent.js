import { useMemo } from "react"
import Login from "../Login/login"
import Register from "../Register/register"
import { ACTIVE_ROUTES, useRegisterRoute } from "../RouteProvider"


const component = {
    [ACTIVE_ROUTES[0]]: <Login />,
    [ACTIVE_ROUTES[1]]: <Register />
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