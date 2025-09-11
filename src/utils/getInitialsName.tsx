'use client';

interface InitialsAvatarProps {
  name: string;
  className?: string;
}

export function InitialsAvatar({ name, className = '' }: InitialsAvatarProps) {
  const getInitials = (fullName: string): string => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-defaultMutedGreen text-white text-xl font-bold rounded-full ${className}`}
    >
      {initials}
    </div>
  );
}