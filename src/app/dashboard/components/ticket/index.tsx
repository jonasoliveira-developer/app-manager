"use client"
import Link from "next/link";
import { FaFolderPlus } from "react-icons/fa";

import { api } from "@/lib/api"
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export interface ClientFormData {
  id:string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  age?: string;
  weight?: string;
  height?: string;
  local?: string;
}

export function TicketItem() {

  const { user } = useAuth();

  const [clients, setClients] = useState<ClientFormData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchUser() {
      try {
        const response = await api.get("/clients", {
          params: {
            userId: user?.id,
          },
        });

        setClients(response.data.content);
      } catch (error) {

      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [clients]);


  const handleRowClick = (index: number) => {

  }
  return (
    <>
      {clients?.map((client, index) => (
        <tr
          key={index}
          onClick={() => handleRowClick(index)}
          className="cursor-pointer hover:bg-gray-50 transition-colors border-b"
        >
          <td className="p-2">{client.name}</td>
          <td className="p-2 hidden sm:block">{client.phoneNumber}</td>
          <td className="p-2">{client.local}</td>
          <td className="p-2 flex justify-center">

            <Link href={`/dashboard/clients/profile/${client.id}`}>
              <FaFolderPlus size={20} className="text-defaultDarkGreen hover:text-defaultLightGreen" />
            </Link>

          </td>
        </tr>
      ))}
    </>
  )
}