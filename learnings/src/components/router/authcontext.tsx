import {createContext, useContext, useState, type ReactNode } from 'react';

type User ={
    name:string;
}|null;

interface AuthContextType{
    user:User;
    login:()=>void;
    logout:()=>void;
};
const Authcontext = createContext<AuthContextType|undefined>(undefined);

export const useAuth=():AuthContextType=>{
    const context = useContext(Authcontext);
    if(!context) throw new Error("useAuth must be used within an AuthProvider");

    return context;
};

interface AuthproviderProps{
    children:ReactNode;
}

export const AuthProvider:React.FC<AuthproviderProps> = ({children}) => {
    const[user,setUser]=useState<User>(null);
    const login=()=>setUser({name:'alagar'})
    const logout=()=>setUser(null);
    return (
        <Authcontext.Provider value={{user,login,logout}}>
            {children}
        </Authcontext.Provider>
    )
}