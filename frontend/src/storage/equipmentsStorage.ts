import type {EquipmentGroup} from "../types/equipments.ts";

const STORAGE_KEY = "equipments";

export function loadEquipments(): EquipmentGroup[] {
    if (typeof window === "undefined") return [];

    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as EquipmentGroup[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function saveEquipments(data: EquipmentGroup[]): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // можно залогировать ошибку
    }
}