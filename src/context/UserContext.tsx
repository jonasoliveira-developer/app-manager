"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
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
    userData: UserType | null;
    setUserData: (user: UserType | null) => void;
    fetchUser: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useState<UserType | null>(null);

    async function fetchUser(id: string) {
        try {
            const response = await api.get(`/users/${id}`);
            setUserData(response.data);
            Cookies.set("userData", JSON.stringify(response.data), { expires: 7 });
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    }

    useEffect(() => {
        const cookieData = Cookies.get("userData");
        if (cookieData) {
            try {
                const parsed = JSON.parse(cookieData);
                setUserData(parsed);
            } catch (err) {
                console.error("Erro ao ler cookie do usuário:", err);
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData, fetchUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}