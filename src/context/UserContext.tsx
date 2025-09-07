"use client";

import { createContext, useContext, useState } from "react";
import { api } from "@/lib/api";

export interface UserType {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    accountStatus: string;
    councilRegistrationNumber?: string;
    subscriptionType?: "BASIC" | "PREMIUM" | "FREE";
    imageUrl?: string;
}

interface UserContextType {
    userData: UserType | null; // usuário já carregado
    setUserData: (user: UserType | null) => void;
    fetchUser: (id: string) => Promise<void>; // função para atualizar via GET
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<UserType | null>(null);

    async function fetchUser(id: string) {
        try {
            const response = await api.get(`/users/${id}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    }

    return (
        <UserContext.Provider value={{ userData, setUserData, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}