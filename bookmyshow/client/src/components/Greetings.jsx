function Greeting(props) {
    return (
        <>
            {props.name ? (<h1>Hello {props.name},How are you doing.</h1>) : (<h1>Hello,How are you doing.</h1>)}
        </>
    )

}
export default Greeting;