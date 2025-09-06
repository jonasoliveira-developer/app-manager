'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { InitialsAvatar } from '@/utils/getInitialsName';
import { base64Render } from '@/utils/base64RenderUtils';

interface User {
    id: string;
    name: string;
    imageProfile?: string;
}

export function ImageAndNameUserWithNavLink() {
    const pathname = usePathname();
    const { user, isAuthenticated } = useAuth();
    const [userUpdate, setUserUpdate] = useState<User | null>(null);

    const navLinks = [
        { name: 'Agenda', href: '/dashboard', exact: true },
        { name: 'Pacientes', href: '/dashboard/clients' },
        { name: 'Financeiro', href: '/dashboard/finance' },
    ];

    useEffect(() => {
        if (!user?.id) return;

        async function fetchUser(userId: string) {
            try {
                const { data } = await api.get(`/users/${userId}`);
                setUserUpdate(data);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        }

        fetchUser(user.id);
    }, [user?.id]);

    if (!isAuthenticated || !userUpdate) return null;

    return (
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full max-w-7xl mx-auto p-4">
            {/* Imagem + Nome */}
            <div className="flex justify-center md:justify-start items-center gap-3">
                <Link href="/user/profile" className="flex items-center gap-3">
                    <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center">
                        {userUpdate.imageProfile ? (
                            <Image
                                src={base64Render(userUpdate.imageProfile)}
                                alt="Perfil do usuário"
                                fill
                                className="object-cover hover:opacity-80 transition rounded-full"
                                unoptimized
                            />
                        ) : (
                            <InitialsAvatar name={userUpdate.name} />
                        )}
                    </div>

                    <h1 className="text-2xl md:text-3xl text-defaultSnow">{userUpdate.name}</h1>
                </Link>
            </div>

            {/* Navegação condicional */}
            {user?.accessLevel !== 'ROLE_CLIENT' && (
                <nav className="flex flex-wrap justify-center md:justify-end items-center gap-5 print:hidden">
                    {navLinks.map((link) => {
                        const isActive = link.exact
                            ? pathname === link.href
                            : pathname.startsWith(link.href);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`font-bold text-xl ${isActive ? 'text-gray-950 underline' : 'text-defaultSnow'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </div>
    );
}