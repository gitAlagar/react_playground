import { NavLink,useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate=useNavigate();
    // const users:string[] = ['alagar','ajin','gopi'];

    const goToProfile = () => {
        navigate('/profile?name=John&age=25', { state: { location: 'New York' } });
    };

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='/signup'>Sign-Up</NavLink>
                    </li>
                </ul>
            </nav>

            <h2>users</h2>
            {/* <ul>
                {users.map(user=>(
                    <li key={user}>
                    <button onClick={()=>navigate(`/profile/${user}`)}>{user}</button>
                </li>
                ))}
            </ul> */}
            <div>
                <button onClick={goToProfile}>user Details</button>
            </div>
            {/* <Outlet /> */}
        </>
    )
}