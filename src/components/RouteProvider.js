import { createContext,useContext,useState } from "react";

export const ACTIVE_ROUTES = [
    'LOGIN',
    'REGISTER'
]
const RouteContext = createContext(null)

const RouteProvider = ({children}) => {
    const [activeRoute, setActiveRoute] = useState(ACTIVE_ROUTES[0])

    return <RouteContext.Provider value={{activeRoute, setActiveRoute}}>
        {children}
    </RouteContext.Provider>
}
export const useRegisterRoute = () => useContext(RouteContext)

export default RouteProvider