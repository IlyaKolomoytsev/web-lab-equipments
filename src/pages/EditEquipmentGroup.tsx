import React, {useEffect, useState} from "react";
import InputField from "../components/Forms/InputField.tsx";
import Button from "../components/Buttons/Button.tsx";
import {BackIcon, EditIcon} from "../components/Icons/Icons.tsx";
import {useEquipmentsStore} from "../utils/EquipmentContext.tsx";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header/Header.tsx";

const EditEquipmentGroup: React.FC = () => {
    const equipment = useEquipmentsStore()
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (id) {
            const equipmentId = parseInt(id, 10);
            const foundEntry = equipment.groups.find(group => group.id === equipmentId);
            if (foundEntry) {
                setTitle(foundEntry.title);
                setDescription(foundEntry.description);
                return;
            }
        }
        alert(`Equipment group with id: ${id} not found!`);
        navigate("/"); // Перенаправляем на главную, если запись не найдена
    }, [id, equipment.groups, navigate]);



    return (
        <div>
            <Header title={"Edit equipment"}></Header>
            <form className="edit-form">
                <InputField
                    label="Edit equipment title"
                    placeholder="Edit equipment title"
                    content={title}
                    setContent={setTitle}
                ></InputField>
                <InputField
                    label="Edit description"
                    placeholder="Edit description"
                    content={description}
                    setContent={setDescription}
                ></InputField>
                <div>
                    <Button variant="primary" style={{marginRight: "0.2rem"}}>{BackIcon()} Back</Button>
                    <Button variant="primary">{EditIcon()} Edit</Button>
                </div>
            </form>

        </div>)
}

export default EditEquipmentGroup;