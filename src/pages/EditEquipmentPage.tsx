import React, {useEffect, useState} from "react";
import InputField from "../components/Forms/InputField.tsx";
import Button from "../components/Buttons/Button.tsx";
import {BackIcon, EditIcon} from "../components/Icons/Icons.tsx";
import {useEquipmentsStore} from "../utils/EquipmentContext.tsx";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header/Header.tsx";
import type {Equipment} from "../types/equipments.ts";
import SelectField from "../components/Forms/SelectField.tsx";

const EditEquipmentGroupPage: React.FC = () => {
    const equipment = useEquipmentsStore()
    const navigate = useNavigate();
    const {idGroup, idEquipment} = useParams<{ idGroup: string, idEquipment: string }>();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);

    let foundEntry: Equipment | undefined;
    if (idGroup && idEquipment) {
        const groupId = parseInt(idGroup, 10);
        const equipmentId = parseInt(idEquipment, 10);
        const group = equipment.groups.find(group => group.id === groupId);
        foundEntry = group?.equipments.find(equipment => equipment.id === equipmentId)
    }

    useEffect(() => {
        if (foundEntry) {
            setTitle(foundEntry.title);
            setDescription(foundEntry.description);
            setStatus(foundEntry.rented);
            return;
        }
        alert(`Equipment at group ${idGroup} with id: ${idEquipment} not found!`);
        navigate("/"); // Перенаправляем на главную, если запись не найдена
    }, [navigate, foundEntry, idGroup, idEquipment]);

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
                <SelectField
                    label="Edit status"
                    rented={status}
                    setRented={setStatus}
                />
                <div>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/equipment/"+foundEntry.groupId)}
                        style={{marginRight: "0.2rem"}}
                    >{BackIcon()} Back</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            equipment.editEquipment(foundEntry.groupId, foundEntry.id, title, description, status)
                            alert("Changes saved!")
                        }}
                    >{EditIcon()} Edit</Button>
                </div>
            </form>

        </div>)
}

export default EditEquipmentGroupPage;