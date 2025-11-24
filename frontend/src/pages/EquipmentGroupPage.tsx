import {useEquipmentsStore} from "../utils/EquipmentContext.tsx";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header/Header.tsx";
import Button from "../components/Buttons/Button.tsx";
import {AddIcon, HideIcon, HomeIcon, RemoveIcon, ShowIcon} from "../components/Icons/Icons.tsx";
import InputField from "../components/Forms/InputField.tsx";
import type {EquipmentGroup} from "../types/equipments.ts";
import ElementCard from "../components/cards/ElementCard.tsx";

const EquipmentGroupPage: React.FC = () => {
    console.log("EquipmentGroupPage");
    const equipments = useEquipmentsStore()
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    let foundEntry: EquipmentGroup | undefined;
    const serachEntry = (id: string | undefined) => {
        if (id) {
            const equipmentId = parseInt(id, 10);
            foundEntry = equipments.groups?.find(group => group.id === equipmentId);
        }
    };
    serachEntry(id);

    const [formVisibility, setFormVisibility] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [filter, setFilter] = useState<boolean | undefined>(undefined);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (equipments.groups && !foundEntry) {
            alert(`Equipment group with id: ${id} not found!`);
            navigate("/"); // Перенаправляем на главную, если запись не найдена
        }
    }, [equipments.groups]);

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
    }, [formRef.current, formVisibility]);

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
            <Button
                variant="danger"
                onClick={() => {
                    if (confirm("Are you sure?")) {
                        foundEntry?.equipments.map(value => {
                            equipments.removeEquipment(foundEntry!.id, value.id);
                        })
                    }
                }}>
                {RemoveIcon()} Remove elements
            </Button>
            <Button variant="secondary" onClick={changeFormVisibility}>
                {formVisibilityButton(formVisibility)}
            </Button>
        </div>
        <form
            ref={formRef}
            className="create-form"
            style={{height: "0px"}}
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
                    equipments.addEquipment(foundEntry!.id, title, description)
                    setTitle("");
                    setDescription("")
                }}
            >
                {AddIcon()} Add
            </Button>
        </form>
        <div className="equipment-filter">
            <span>Filter by status</span>
            <select
                className="input"
                onChange={(e) => {
                    switch (e.target.value) {
                        case "All":
                            setFilter(undefined);
                            break;
                        case "Rented":
                            setFilter(true);
                            break;
                        case "In stock":
                            setFilter(false);
                            break;
                    }
                }}
            >
                <option>All</option>
                <option>Rented</option>
                <option>In stock</option>
            </select>
        </div>
        <div className="list">
            {foundEntry.equipments.map(element => {
                console.log(filter);
                if (filter !== undefined && filter !== element.rented) {
                    return null;
                }
                return (
                    <ElementCard
                        title={element.title}
                        description={element.description}
                        toggleStatus={() => {
                            equipments.toggleRented(foundEntry!.id, element.id)
                        }}
                        editAction={() => navigate(`/equipment/${element.groupId}/${element.id}/edit`)}
                        removeAction={() => {
                            if (confirm("Are you sure?")) {
                                equipments.removeEquipment(element.groupId, element.id)
                            }
                        }}
                        rented={element.rented}
                    />
                )
            })}
        </div>
    </div>
}

export default EquipmentGroupPage;