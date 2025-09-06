export function base64Render(base64: string): string {
  if (!base64 || typeof base64 !== 'string') return '';

  // Detecta o tipo MIME com base no prefixo do base64
  const mimeType = detectMimeType(base64);

  return `data:${mimeType};base64,${base64}`;
}

function detectMimeType(base64: string): string {
  if (base64.startsWith('iVBOR')) return 'image/png'; // PNG
  if (base64.startsWith('/9j/')) return 'image/jpeg'; // JPEG
  if (base64.startsWith('UklGR')) return 'image/webp'; // WebP
  if (base64.startsWith('R0lGOD')) return 'image/gif'; // GIF
  if (base64.startsWith('PHN2Z')) return 'image/svg+xml'; // SVG (base64 de XML)

  return 'image/jpeg'; // padrão seguro
}