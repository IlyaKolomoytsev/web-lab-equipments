import {useEffect, useState} from "react";
import {loadEquipments, saveEquipments} from "../storage/equipmentsStorage";
import type {Equipment, EquipmentGroup} from "../types/equipments.ts";

export interface EquipmentsStore {
    groups: EquipmentGroup[],
    setGroups: React.Dispatch<React.SetStateAction<EquipmentGroup[]>>,
    addGroup: (title: string, description: string) => void,
    removeGroup: (groupId: number) => void,
    addEquipment: (groupId: number, title: string, description: string) => void,
    toggleRented: (groupId: number, equipmentId: number) => void,
    removeEquipment: (groupId: number, equipmentId: number) => void,
    clearAll: () => void
}

export function useEquipments():EquipmentsStore {
    const [groups, setGroups] = useState<EquipmentGroup[]>(() => loadEquipments());

    // синхронизируем state → localStorage
    useEffect(() => {
        saveEquipments(groups);
    }, [groups]);

    // генерация id (простой вариант)
    const getNextGroupId = () =>
        (groups.reduce((max, g) => Math.max(max, g.id), 0) || 0) + 1;

    const getNextEquipmentId = (groupId: number) => {
        // ищем нужную группу
        const group = groups.find(g => g.id === groupId);
        if (!group) return 1; // если группы нет — начинаем с 1

        // ищем максимальный id оборудования в этой группе
        const maxId =
            group.equipments.reduce((max, e) => Math.max(max, e.id), 0);

        return maxId + 1;
    };


    // CRUD-операции:

    const addGroup = (title: string, description: string) => {
        const newGroup: EquipmentGroup = {
            id: getNextGroupId(),
            title,
            description,
            equipments: [],
        };
        setGroups((prev) => [...prev, newGroup]);
    };

    const removeGroup = (groupId: number) => {
        setGroups((prev) => prev.filter((g) => g.id !== groupId));
    };

    const addEquipment = (
        groupId: number,
        title: string,
        description: string
    ) => {
        setGroups(prevGroups =>
            prevGroups.map(group => {
                if (group.id !== groupId) {
                    return group;
                }

                const newEquipment: Equipment = {
                    id: getNextEquipmentId(groupId),
                    title,
                    description,
                    rented: false,
                    groupId,
                };

                return {
                    ...group,
                    equipments: [...group.equipments, newEquipment],
                };
            })
        );
    };

    const removeEquipment = (groupId: number, equipmentId: number) => {
        setGroups(prevGroups =>
            prevGroups.map(group => {
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
    };

    const toggleRented = (groupId: number, equipmentId: number) => {
        setGroups(prevGroups =>
            prevGroups.map(group => {
                if (group.id !== groupId) {
                    return group;
                }

                const updatedEquipments = group.equipments.map(eq => {
                    if (eq.id !== equipmentId) {
                        return eq;
                    }

                    return {...eq, rented: !eq.rented};
                });

                return {
                    ...group,
                    equipments: updatedEquipments,
                };
            })
        );
    };


    const clearAll = () => {
        setGroups([]);
    };

    return {
        groups,
        setGroups,
        addGroup,
        removeGroup,
        addEquipment,
        toggleRented,
        removeEquipment,
        clearAll,
    };
}
