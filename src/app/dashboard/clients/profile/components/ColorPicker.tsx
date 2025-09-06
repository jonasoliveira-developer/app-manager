"use client";

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    error?: string;
}

export function ColorPicker({ value, onChange, error }: ColorPickerProps) {
    const predefinedColors = [
        "#00A859", "#3174ad", "#f59e0b", "#ef4444", "#8b5cf6", "#10b981",
        "#e11d48", "#6366f1", "#f43f5e", "#14b8a6", "#f97316", "#6b7280",
        "#1e293b", "#3b82f6", "#a855f7", "#22c55e", "#eab308", "#dc2626",
    ];

    const handleColorClick = (color: string) => {
        onChange(color);
    };

    const handleInputChange = (hex: string) => {
        onChange(hex);
    };

    return (
        <div className="border rounded-md p-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Cor do evento
            </label>

            <div className="grid grid-cols-9 gap-2 mb-4">
                {predefinedColors.map((color) => (
                    <button
                        key={color}
                        type="button"
                        onClick={() => handleColorClick(color)}
                        className={`w-8 h-8 rounded-full border ${value === color ? "border-black scale-105" : "border-gray-300"
                            } transition`}
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            <label className="block mb-1 text-sm font-medium text-gray-700">
                Ou insira um valor hexadecimal:
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="#000000"
                className="w-full p-2 border rounded bg-gray-50 text-gray-800"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}