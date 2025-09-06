'use client';

import { useRef, useState } from 'react';
import { api } from '@/lib/api';
import { showCustomToast } from '@/utils/toast';
import Image from 'next/image';
import { InitialsAvatar } from '@/utils/getInitialsName';
import { useAuth } from '@/context/AuthContext';

interface ImageUploaderProps {
  userId: string;
  profileImage?: string;
  username: string;
}

export function ImageUploader({ userId, profileImage, username }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); 

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
  };

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', 'user');
    formData.append('id', userId);

    try {
      await api.post('/images/upload', formData);

      showCustomToast('Imagem atualizada com sucesso!', 'info');
      setPreview(null);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      showCustomToast('Erro ao enviar imagem.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const imageSrc = preview || profileImage;
  const hasImage = typeof imageSrc === 'string' && imageSrc.trim() !== '';

  return (
    <div className="flex items-center gap-4">
      {/* Avatar */}
      <div
        className="relative w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-defaultMutedGreen cursor-pointer hover:opacity-80 transition"
        onClick={handleClick}
      >
        {hasImage ? (
          <Image
            src={imageSrc}
            alt="Foto de perfil"
            width={60}
            height={60}
            className="rounded-full object-cover"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <InitialsAvatar name={username} className="w-full h-full" />
        )}

        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Botão de envio */}
      <button
        onClick={handleUpload}
        disabled={!preview || loading}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          preview && !loading
            ? 'bg-defaultGreen text-white hover:bg-defaultGreenHover'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {loading ? 'Salvando...' : 'Salvar imagem'}
      </button>
    </div>
  );
}