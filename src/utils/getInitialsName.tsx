'use client';

interface InitialsAvatarProps {
  name: string;
  className?: string;
}

export function InitialsAvatar({ name, className = '' }: InitialsAvatarProps) {

  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
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