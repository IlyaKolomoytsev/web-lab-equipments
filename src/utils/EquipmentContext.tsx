import {createContext, useContext} from "react";
import {useEquipments, type EquipmentsStore} from "../hooks/useEquipments.ts";

const EquipmentsContext = createContext<EquipmentsStore | undefined>(undefined);

export const EquipmentsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const equipments = useEquipments();

    return (
        <EquipmentsContext.Provider value={equipments}>
            {children}
        </EquipmentsContext.Provider>
    );
};

export const useEquipmentsStore = () => {
    const context = useContext(EquipmentsContext);
    if (!context) {
        throw new Error("useEquipmentsStore must be used within EquipmentsProvider");
    }
    return context;
};