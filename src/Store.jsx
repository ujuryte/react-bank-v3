import { createContext, useEffect } from "react";
import useData from "./Hooks/useData";
import useMessage from "./Hooks/useMessage";
import useRoute from "./Hooks/useRoute";
import usePageLogin from "./Hooks/usePageLogin";
import useUser from "./Hooks/useUser";

export const Store = createContext();

export const Data = ({children}) => {
    
    const [data, setCreateData, setEditData, setDeleteData] = useData();
    const [messages, msg, addServerMessage] = useMessage();
    const [displayPage, goToPage, pageSlug] = useRoute();
    const [loginResponse, setLoginRequest] = usePageLogin();
    const[user, setUser] = useUser();

    useEffect(() => {
        if(null === loginResponse){
            return;
        }

        if(loginResponse?.status === 'login-ok'){
            console.log(loginResponse.message)
            setUser(loginResponse.user);
            addServerMessage(loginResponse.message);
            goToPage('home');
        }

        if(loginResponse?.status === 'error'){
            addServerMessage(loginResponse.message);
        }

        if(loginResponse?.status === 'logout-ok'){
            console.log(loginResponse.message)
            setUser(null)
            addServerMessage(loginResponse.message);
            goToPage('home')
        }

    },[loginResponse, goToPage, msg, setUser, addServerMessage])
    
    
    return(
        <Store.Provider value={{
            data, setCreateData, setEditData, setDeleteData,
            messages, msg, addServerMessage,
            displayPage, goToPage, pageSlug,
            setLoginRequest, user
        }}>
            {children}
        </Store.Provider>
    )
}