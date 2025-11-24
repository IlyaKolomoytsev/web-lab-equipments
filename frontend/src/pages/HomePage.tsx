import React, {useEffect, useRef, useState} from 'react';
import Header from "../components/Header/Header.tsx";
import Button from "../components/Buttons/Button.tsx";
import {AddIcon, HideIcon, RemoveIcon, ShowIcon} from "../components/Icons/Icons.tsx";
import GroupCard from "../components/cards/GroupCard.tsx";
import InputField from "../components/Forms/InputField.tsx";
import {useEquipmentsStore} from "../utils/EquipmentContext.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import Pagination from "../components/pagination/Pagination.tsx";

const ELEMENT_COUNT_ON_PAGE = 2

const HomePage: React.FC = () => {
    const equipments = useEquipmentsStore();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [formVisibility, setFormVisibility] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const removeAll = () => {
        if (confirm("Are you sure?")) {
            equipments.clearAll();
        }
    }

    const removeGroupId = (id: number) => {
        if (confirm("Are you sure?")) {
            equipments.removeGroup(id);
        }
    }

    const formRef = useRef<HTMLFormElement>(null);

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

    const pageString = searchParams.get("page");
    const page = Number(pageString) > 0 ? Number(pageString) : 1;
    const groupsCount = equipments.groups?.length ? equipments.groups.length : 1;
    const maxPage = Math.ceil(groupsCount / ELEMENT_COUNT_ON_PAGE)
    return <div>
        <Header title={"Groups of equipments"}></Header>
        <div className="toolbar">
            <Button variant="danger" onClick={removeAll}>
                {RemoveIcon()} RemoveAll
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
                label="Add new group"
                placeholder="Add group title"
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
                    equipments.addGroup(title, description)
                    setTitle("");
                    setDescription("")
                }}
            >
                {AddIcon()} Add
            </Button>
        </form>
        <div className="list">
            {equipments.groups
                ?.filter((group, index) => {
                        const first = (page - 1) * ELEMENT_COUNT_ON_PAGE;
                        const last = first + ELEMENT_COUNT_ON_PAGE;
                        return first <= index && index < last;
                    }
                )
                .map(group => (
                    <GroupCard
                        title={group.title}
                        description={group.description}
                        mainAction={() => navigate("/equipment/" + group.id)}
                        editAction={() => navigate(`/equipment-group/${group.id}/edit`)}
                        removeAction={() => {
                            removeGroupId(group.id)
                        }}
                    />
                ))}
        </div>
        <Pagination currentPage={page} maximum={maxPage} baseUrl={"/"}/>
    </div>
}

export default HomePage;
