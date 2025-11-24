import {useEffect, useState} from "react";
import type {EquipmentGroup} from "../types/equipments.ts";


export function useEquipments() {
    const [groups, setGroups] = useState<EquipmentGroup[] | undefined>(undefined);

    const updateGroups = () => {
        fetch("/api/groups") // Замените на свой URL
            .then(response => response.json()) // Парсим ответ как JSON
            .then(data => setGroups(data)) // Сохраняем полученные данные в стейт
            .catch(error => console.error("Error fetching data:", error)); // Обработка ошибок
    }

    useEffect(() => {
        updateGroups()
    }, []);

    // CRUD-операции:

    const addGroup = (title: string, description: string) => {
        fetch("/api/groups", {
            method: "POST", // Отправка POST запроса
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title, description}), // Отправляем данные в теле запроса
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Group created:", data)
                const newGroup: EquipmentGroup = {
                    ...data,
                    equipments: [],
                };
                setGroups((prev) => [...prev, newGroup]);
            })
            .catch((error) => console.error("Error:", error));
    };

    const removeGroup = (id: number) => {
        fetch("/api/groups/" + id, {
            method: "DELETE", // Отправка POST запроса
        })
            .then(() => {
                console.log("Group deleted:", id)
                setGroups((prev) => prev?.filter((g) => g.id !== id));
            })
            .catch((error) => console.error("Error:", error));
    };

    const addEquipment = (
        groupId: number,
        title: string,
        description: string
    ) => {
        fetch(`/api/groups/${groupId}/equipments`, {
            method: "POST", // Отправка POST запроса
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title, description}), // Отправляем данные в теле запроса
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Group created:", data)
                setGroups(prevGroups =>
                    prevGroups?.map(group => {
                        if (group.id !== groupId) {
                            return group;
                        }
                        return {
                            ...group,
                            equipments: [...group.equipments, data],
                        };
                    })
                );
            })
            .catch((error) => console.error("Error:", error));
    };

    const removeEquipment = (groupId: number, equipmentId: number) => {
        fetch(`/api/groups/${groupId}/equipments/${equipmentId}`, {
            method: "DELETE",
        })
            .then(() => {
                console.log("Equipment deleted:", equipmentId, "from group", groupId);
                setGroups(prevGroups =>
                    prevGroups?.map(group => {
                        // Если это не та группа — возвращаем как есть
                        if (group.id !== groupId) {
                            return group;
                        }

                        // Обновляем только нужную
                        const updatedEquipments = group.equipments.filter(
                            eq => eq.id !== equipmentId
                        );

                        return {
                            ...group,
                            equipments: updatedEquipments,
                        };
                    })
                );
            })
            .catch((error) => console.error("Error:", error));


    };

    const toggleRented = (groupId: number, equipmentId: number) => {
        const group = groups?.find(value => value.id === groupId)
        const equipment = group?.equipments.find(equipment => equipment.id === equipmentId)
        if (!equipment) {
            console.error("Can't find equipment with group id:", groupId, "and equipment id:", equipmentId);
            return;
        }
        editEquipment(groupId, equipmentId, equipment.title, equipment.description, !equipment.rented);
    };

    const editGroup = (groupId: number, newTitle: string, newDescription: string) => {
        fetch(`/api/groups/${groupId}`, {
            method: "PUT", // Отправка PUT запроса
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title: newTitle, description: newDescription}), // Отправляем данные в теле запроса
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Group updated:", data)
                setGroups(prevGroups =>
                    prevGroups?.map(group => {
                        if (group.id === groupId) {
                            return {
                                ...group,
                                ...data
                            };
                        }
                        return group;
                    })
                );
            })
            .catch((error) => console.error("Error:", error));
    };

    const editEquipment = (groupId: number, equipmentId: number, title: string, description: string, rented: boolean) => {
        fetch(`/api/groups/${groupId}/equipments/${equipmentId}`, {
            method: "PUT", // Отправка PUT запроса
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title, description, rented}), // Отправляем данные в теле запроса
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Group updated:", data)
                setGroups(prevGroups => {
                    return prevGroups?.map(group => {
                        if (group.id !== groupId) {
                            return group;
                        }

                        const updatedEquipments = group.equipments.map(eq => {
                            if (eq.id !== equipmentId) {
                                return eq;
                            }

                            return {
                                ...eq,
                                ...data
                            };
                        });

                        return {
                            ...group,
                            equipments: updatedEquipments,
                        };
                    });
                });
            })
            .catch((error) => console.error("Error:", error))

    };

    const clearAll = () => {
        groups?.map((group) => {
            removeGroup(group.id);
        })
    };

    return {
        groups,
        setGroups,
        addGroup,
        removeGroup,
        addEquipment,
        toggleRented,
        removeEquipment,
        editGroup,
        editEquipment,
        clearAll,
    };
}

export type EquipmentsStore = ReturnType<typeof useEquipments>;
