import React, {useEffect, useState} from "react";
import InputField from "../components/Forms/InputField.tsx";
import Button from "../components/Buttons/Button.tsx";
import {BackIcon, EditIcon} from "../components/Icons/Icons.tsx";
import {useEquipmentsStore} from "../utils/EquipmentContext.tsx";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import type {EquipmentGroup} from "../types/equipments.ts";

const EditEquipmentGroupPage: React.FC = () => {
    const equipment = useEquipmentsStore()
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    let foundEntry: EquipmentGroup | undefined;
    if (id) {
        const equipmentId = parseInt(id, 10);
        foundEntry = equipment.groups.find(group => group.id === equipmentId);
    }

    useEffect(() => {
        if (foundEntry) {
            setTitle(foundEntry.title);
            setDescription(foundEntry.description);
            return;
        }
        alert(`Equipment group with id: ${id} not found!`);
        navigate("/"); // Перенаправляем на главную, если запись не найдена
    }, [navigate, foundEntry, id]);

    if (!foundEntry) {
        return null;
    }
    return (
        <div>
            <Header title={"Edit equipment"}></Header>
            <form className="edit-form"
                  onSubmit={(e: React.FormEvent) => {
                      e.preventDefault();
                  }}>
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
                    <Button
                        variant="primary"
                        onClick={() => navigate("/")}
                        style={{marginRight: "0.2rem"}}
                    >{BackIcon()} Back</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            equipment.editGroup(foundEntry.id, title, description)
                            alert("Changes saved!")
                        }}
                    >{EditIcon()} Edit</Button>
                </div>
            </form>

        </div>)
}

export default EditEquipmentGroupPage;