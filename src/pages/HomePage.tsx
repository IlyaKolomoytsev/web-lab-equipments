import React, {useState} from 'react';
import Header from "../components/Header/Header.tsx";
import Button from "../components/Buttons/Button.tsx";
import {HideIcon, RemoveIcon, ShowIcon} from "../components/Icons/Icons.tsx";
import GroupCard, {type GroupCardProps} from "../components/cards/GroupCard.tsx";
import type {useEquipments} from "../hooks/useEquipments.ts";

type EquipmentsStore = ReturnType<typeof useEquipments>;

interface HomePageProps {
    equipments: EquipmentsStore;
}

const HomePage: React.FC<HomePageProps> = () => {

    const [formVisibility, setFormVisibility] = useState(false);

    const data: GroupCardProps[] = [
        {
            title: "Микрофоны",
            description: "оборудование",
        },
        {
            title: "Колонки",
            description: "палёные",
        }
    ];

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

    return <div>
        <Header title={"Groups of equipments"}></Header>
        <div className="toolbar">
            <Button variant="danger">
                {RemoveIcon()} RemoveAll
            </Button>
            <Button variant="secondary" onClick={changeFormVisibility}>
                {formVisibilityButton(formVisibility)}
            </Button>
        </div>
        <div className="create-form">

        </div>
        <div className="list">
            {data.map(item => (
                <GroupCard {...item} />
            ))}
        </div>
    </div>
}

export default HomePage;
