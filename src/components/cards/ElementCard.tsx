import styles from "./Card.module.css"
import Button from "../Buttons/Button.tsx";
import {useState} from "react";
import {EditIcon, RemoveIcon, RentedIcon, StockItem} from "../Icons/Icons.tsx";

interface CardProps {
    title: string;
    description: string;
    rented: boolean;
    editAction?: () => void;
    removeAction?: () => void;
}

const GroupCard: React.FC<CardProps> = (props) => {
    const [rented, setRented] = useState(props.rented);

    const changeStatus = () => {
        setRented(rented => !rented);
    }

    const statusContent = (rented: boolean) => {
        if (rented) {
            return [RentedIcon(), "Rented"];
        } else {
            return [StockItem(), "In stock"];
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
            <div className={styles.card_header} onClick={changeStatus}>
                <h3 className={styles.card_title} style={titleColor(rented)}>
                    {props.title}
                </h3>
                <h5 className={styles.card_status}>
                    Status: {statusContent(rented)}
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

export default GroupCard;