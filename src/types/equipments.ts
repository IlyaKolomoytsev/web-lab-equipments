export type Equipment = {
    id: number;
    title: string;
    description: string;
    rented: boolean;
    groupId: number;
};

export type EquipmentGroup = {
    id: number;
    title: string;
    description: string;
    equipments: Equipment[];
};