import styles from "./Card.module.css"
import Button from "../Buttons/Button.tsx";

interface CardProps {
    title: string;
    description: string;
    mainAction?: () => void;
    editAction?: () => void;
    removeAction?: () => void;
}

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-pencil">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
    </svg>
)

const RemoveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-2">
        <path d="M3 6h18"/>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
        <line x1="10" x2="10" y1="11" y2="17"/>
        <line x1="14" x2="14" y1="11" y2="17"/>
    </svg>
)

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