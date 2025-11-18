import { createContext, useState } from 'react';
import { Toolbar } from './useContext.tsx';

type MyContextType = {
    theme: string;
    toggleTheme: () => void;
}

export const MyContext = createContext<MyContextType>({
    theme: 'light',
    toggleTheme: () => { }
});

export const ContextProvider = () => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    }
    return(
        <MyContext.Provider value={{ theme, toggleTheme }}>
            <Toolbar />
        </MyContext.Provider>
    )
}