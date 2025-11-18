const Loader = (newComponent)=>{

    return (props)=>{
        <newComponent {...props}/>
    }
}
 export default Loader;