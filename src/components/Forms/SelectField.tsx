import styles from "./Forms.module.css"
import React from "react";

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement>
{
    label: string;
    rented: boolean;
    setRented: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectField: React.FC<SelectFieldProps> = (props) => {
    const fromStrToBool = (str: string) => {
        return str == "Rented";
    }
    const fromBoolToStr = (rented: boolean) => {
        if (rented) {
            return "Rented";
        } else {
            return "In stock";
        }
    }
    return (
        <div className={styles["form-group"]}>
            <label>{props.label}</label>
            <select
                className={styles.input}
                value={fromBoolToStr(props.rented)}
                onChange={(e) => props.setRented(fromStrToBool(e.target.value))}
                {...props} >
                <option>{fromBoolToStr(true)}</option>
                <option>{fromBoolToStr(false)}</option>
            </select>
        </div>
    )
}

export default SelectField;