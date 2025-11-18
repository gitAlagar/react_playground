import Loader from "./samplae2";
 Users =(user)=>{
return <ul>
    {user.map((u)=><li key={u.id}>{u.name}</li>)}
</ul>
};

const UserDetails = Loader(Users);