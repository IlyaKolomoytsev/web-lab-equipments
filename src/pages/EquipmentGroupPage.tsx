import {useEquipmentsStore} from "../utils/EquipmentContext.tsx";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header/Header.tsx";
import Button from "../components/Buttons/Button.tsx";
import {AddIcon, HideIcon, HomeIcon, ShowIcon} from "../components/Icons/Icons.tsx";
import InputField from "../components/Forms/InputField.tsx";
import type {EquipmentGroup} from "../types/equipments.ts";
import ElementCard from "../components/cards/ElementCard.tsx";

const EquipmentGroupPage: React.FC = () => {
    console.log("EquipmentGroupPage");
    const equipments = useEquipmentsStore()
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    let foundEntry: EquipmentGroup | undefined;
    if (id) {
        const equipmentId = parseInt(id, 10);
        foundEntry = equipments.groups.find(group => group.id === equipmentId);
    }

    const [formVisibility, setFormVisibility] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!foundEntry) {
            alert(`Equipment group with id: ${id} not found!`);
            navigate("/"); // Перенаправляем на главную, если запись не найдена
        }
    }, [navigate, foundEntry, id]);

    useEffect(() => {
        if (!formRef.current) return;
        let height;
        if (!formVisibility) {
            height = "0px";
        } else {
            const contentHeight = formRef.current.scrollHeight;
            height = `${contentHeight}px`
        }
        formRef.current.style.height = height;
    }, [formVisibility]);

    const formVisibilityButton = (isOpen: boolean) => {
        if (isOpen) {
            return ["Hide", HideIcon()]
        } else {
            return ["Show", ShowIcon()]
        }
    }
    const changeFormVisibility = () => {
        setFormVisibility(visibility => !visibility);
    }
    if (!foundEntry) {
        return null;
    }
    return <div>
        <Header title={foundEntry.title}></Header>
        <div className="toolbar">
            <Button variant="primary" onClick={() => {
                navigate("/")
            }}>
                {HomeIcon()} Home
            </Button>
            <Button variant="secondary" onClick={changeFormVisibility}>
                {formVisibilityButton(formVisibility)}
            </Button>
        </div>
        <form
            ref={formRef}
            className="create-form"
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
            }}>
            <InputField
                label="Add new equipment"
                placeholder="Add equipment title"
                content={title}
                setContent={setTitle}
            ></InputField>
            <InputField
                label="Add description"
                placeholder="Add description"
                content={description}
                setContent={setDescription}
            ></InputField>
            <Button
                variant="primary"
                onClick={() => {
                    if (title === "") return;
                    equipments.addEquipment(foundEntry.id, title, description)
                    setTitle("");
                    setDescription("")
                }}
            >
                {AddIcon()} Add
            </Button>
        </form>
        <div className="list">
            {foundEntry.equipments.map(element => (
                <ElementCard
                    title={element.title}
                    description={element.description}
                    toggleStatus={() => {
                        equipments.toggleRented(foundEntry.id, element.id)
                    }}
                    editAction={() => navigate(`/equipment/${element.groupId}/${element.id}/edit`)}
                    removeAction={() => {
                        equipments.removeEquipment(element.groupId, element.id)
                    }}
                    rented={element.rented}
                />
            ))}
        </div>
    </div>
}

export default EquipmentGroupPage;