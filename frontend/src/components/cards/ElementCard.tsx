import styles from "./Card.module.css"
import Button from "../Buttons/Button.tsx";
import {EditIcon, RemoveIcon, RentedIcon, StockIcon} from "../Icons/Icons.tsx";

interface CardProps {
    title: string;
    description: string;
    rented: boolean;
    toggleStatus?: () => void;
    editAction?: () => void;
    removeAction?: () => void;
}

const ElementCard: React.FC<CardProps> = (props) => {
    const statusContent = (rented: boolean) => {
        if (rented) {
            return [RentedIcon(), "Rented"];
        } else {
            return [StockIcon(), "In stock"];
        }
    }

    const titleColor = (rented: boolean) => {
        if (rented) {
            return {
                color: "var(--secondary-color)"
            }
        }
        return {}
    }

    return (
        <div className={styles.card}>
            <div className={styles.card_header} onClick={props.toggleStatus}>
                <h3 className={styles.card_title} style={titleColor(props.rented)}>
                    {props.title}
                </h3>
                <h5 className={styles.card_status}>
                    Status: {statusContent(props.rented)}
                </h5>
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

export default ElementCard;