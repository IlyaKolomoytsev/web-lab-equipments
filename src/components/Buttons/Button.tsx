import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
                                           variant = "primary",
                                           className,
                                           children,
                                           ...props
                                       }) => {
    const classes = [
        styles.button,
        styles["button_" + variant],
        className, // ← пользователь может добавить свои классы
    ]
        .filter(Boolean)
        .join(" ");

    console.log(classes, variant);
    return (
        <button
            {...props} // ← теперь onClick, type, disabled, aria-* работают корректно
            className={classes}
        >
            {children}
        </button>
    );
};

export default Button;
