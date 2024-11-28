import {useState} from "react";
import {IDepartment} from "../models/IDepartment.ts";

export const useDepartmentModals = () => {
    const [modals, setModals] = useState({
        updateDepartmentInfo: false,
        addEmployees: false,
        removeEmployees: false,
        createDepartment: false,
    });
    const [selectedDepartment, setSelectedDepartment] = useState<IDepartment | null>(null);

    const openModal = (modalKey: keyof typeof modals, department:IDepartment | null = null) => {
        setModals({ ...modals, [modalKey]: true });
        setSelectedDepartment(department);
    };

    const closeModal = (modalKey: keyof typeof modals) => {
        setModals({ ...modals, [modalKey]: false });
    };

    return { modals, selectedDepartment, openModal, closeModal };
};