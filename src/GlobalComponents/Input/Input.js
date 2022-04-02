import "./Input.css";

const Input = (props) => {
    const hangleOnChange =(e)=>{
        props.onChange(props.id, e)
    }

    return (
        <div  className={props.className + " Input"}>
            <input
                className={props.classNameInput+ " Input"}
                value={props.value}
                onChange={props.onChange}
                type={props.type || 'text'}
                placeholder={props.placeholder}
                onClick ={props.onClick}
                checked={props.checked}
                onChange = {(props.id || props.id==0 )? hangleOnChange : props.onChange}
                accept = {props.accept}
            />
        </div>
    )
}

export default Input;