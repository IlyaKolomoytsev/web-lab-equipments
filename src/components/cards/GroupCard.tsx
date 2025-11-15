import styles from "./Card.module.css"
import Button from "../Buttons/Button.tsx";
import {EditIcon, RemoveIcon} from "../Icons/Icons.tsx";

interface CardProps {
    title: string;
    description: string;
    mainAction?: () => void;
    editAction?: () => void;
    removeAction?: () => void;
}

const GroupCard: React.FC<CardProps> = (props) => {
    return (
        <div className={styles.card}>
            <div className={styles.card_header} onClick={props.mainAction}>
                <h3 className={styles.card_title}>
                    {props.title}
                </h3>
                <div className={styles.card_description}>
                    {props.description}
                </div>
            </div>
            <div className={styles.card_toolbar}>
                <Button variant="primary" onClick={props.editAction}>
                    {EditIcon()} Edit
                </Button>
                <Button variant="danger" onClick={props.removeAction}>
                    {RemoveIcon()} Remove
                </Button>
            </div>
        </div>
    )
}

export default GroupCard;