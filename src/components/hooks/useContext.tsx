import { useContext } from 'react';
import { MyContext } from './createContext.tsx';

export const Toolbar = () => {
    return (
        <>
            <ThemeButton />
        </>
    )
}

const ThemeButton = () => {
    const{theme,toggleTheme}=useContext(MyContext);
    const styles={
        backgroundColor: theme === 'dark' ? '#333' : '#ccc',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '100px 200px',
        border: 'none',
        cursor: 'pointer'
    }
    return(
        <div style={styles}>
            <button onClick={toggleTheme}>
                Current Theme: {theme}
            </button>
        </div>
    )
}