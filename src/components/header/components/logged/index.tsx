'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useUserContext } from '@/context/UserContext';
import { InitialsAvatar } from '@/utils/getInitialsName';

export function ImageAndNameUserWithNavLink() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const { userData, fetchUser } = useUserContext();

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchUser(user.id);
    }
  }, [isAuthenticated, user?.id]);

  const navLinks = [
    { name: 'Agenda', href: '/dashboard', exact: true },
    { name: 'Pacientes', href: '/dashboard/clients' },
    { name: 'Financeiro (breve)', href: '/dashboard/finance', disabled: true },
  ];

  if (!isAuthenticated || !userData) return null;

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 w-full max-w-7xl mx-auto p-4">
      {/* Imagem + Nome */}
      <div className="flex justify-center md:justify-start items-center gap-3">
        <Link href="/user/profile" className="flex items-center gap-3">
          <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center">
            {userData?.imageUrl ? (
              <Image
                src={userData.imageUrl}
                alt="Perfil do usuário"
                fill
                className="object-cover hover:opacity-80 transition rounded-full"
                unoptimized
              />
            ) : (
              <InitialsAvatar name={userData.name} />
            )}
          </div>

          <h1 className="text-2xl md:text-3xl text-defaultSnow">{userData.name}</h1>
        </Link>
      </div>

      {/* Navegação condicional */}
      {user?.accessLevel !== 'ROLE_CLIENT' && (
        <nav className="flex flex-wrap justify-center md:justify-end items-center gap-5 print:hidden">
          {navLinks.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);

            if (link.disabled) {
              return (
                <span
                  key={link.name}
                  className="font-bold text-xl text-gray-100 cursor-not-allowed opacity-60"
                  title="Em breve"
                >
                  {link.name}
                </span>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-bold text-xl ${
                  isActive ? 'text-blue-600 underline' : 'text-defaultSnow'
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