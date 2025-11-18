import styles from "./Forms.module.css"
import React from "react";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    content:string;
    setContent: React.Dispatch<React.SetStateAction<string>>
}

const InputField: React.FC<InputFieldProps> = (props) => {
    return (
        <div className={styles["form-group"]}>
            <label>{props.label}</label>
            <input
                className={styles.input}
                value={props.content}
                onChange={(e) => props.setContent(e.target.value)}
                {...props} />
        </div>
    )
}

export default InputField;