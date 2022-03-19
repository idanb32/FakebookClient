import "./Input.css";

const Input = (props) => {
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
                onChange = {props.onChange}
                accept = {props.accept}
            />
        </div>
    )
}

export default Input;