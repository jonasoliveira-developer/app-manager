"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/api";

export interface UserType {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  accountStatus: "ACTIVE" | "INACTIVE" | "BLOCKED" | "DELETED";
  councilRegistrationNumber?: string;
  subscriptionType?: "BASIC" | "PREMIUM" | "FREE";
  imageUrl?: string;
  imageMimeType?: string;
  imageProfile?: string; // se estiver usando base64 ou URL
  imageWatermark?: string; // idem
  biography?: string;
  aboutMe?: string;
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
            const user = response.data;

            if (user && user.id) {
                // imageUrl já vem completa, não precisa montar
                setUserData(user);
                localStorage.setItem("userData", JSON.stringify(user));
            }
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem("userData");

        if (
            storedData &&
            storedData !== "undefined" &&
            storedData !== "null" &&
            storedData.trim() !== ""
        ) {
            try {
                const parsed: UserType = JSON.parse(storedData);
                if (parsed && parsed.id) {
                    setUserData(parsed);
                }
            } catch (err) {
                console.error("Erro ao ler localStorage do usuário:", err);
                localStorage.removeItem("userData");
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