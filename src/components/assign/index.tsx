"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

interface SignatureFieldProps {
    name: string;
}

export function SignatureField({ name }: SignatureFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [signatureData, setSignatureData] = useState<string | null>(null);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        if (signed) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let drawing = false;

        const startDrawing = (e: MouseEvent | TouchEvent) => {
            drawing = true;
            const pos = getPosition(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        };

        const draw = (e: MouseEvent | TouchEvent) => {
            if (!drawing) return;
            const pos = getPosition(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        const stopDrawing = () => {
            drawing = false;
            ctx.closePath();
        };

        const getPosition = (e: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
            const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top,
            };
        };

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);

        canvas.addEventListener("touchstart", startDrawing);
        canvas.addEventListener("touchmove", draw);
        canvas.addEventListener("touchend", stopDrawing);

        return () => {
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("mouseup", stopDrawing);
            canvas.removeEventListener("mouseleave", stopDrawing);

            canvas.removeEventListener("touchstart", startDrawing);
            canvas.removeEventListener("touchmove", draw);
            canvas.removeEventListener("touchend", stopDrawing);
        };
    }, [signed]);

    const handleClear = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGuideLine(ctx, canvas);
        setSignatureData(null);
    };

    const handleSign = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataURL = canvas.toDataURL("image/png");
        setSignatureData(dataURL);
        setSigned(true);
    };

    const drawGuideLine = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        const centerY = canvas.height / 2;


        ctx.strokeStyle = "#50c878"; // defaultGreen
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, centerY); // linha guia no canvas
        ctx.lineTo(500, centerY);
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || signed) return;
        const ctx = canvas.getContext("2d");
        if (canvas && ctx) drawGuideLine(ctx, canvas);

    }, [signed]);

    return (
        <section className="w-full  ">
            {signed ? (
                // ✅ Exibe apenas a imagem e o nome, com layout compacto
                <div className="flex flex-col items-center justify-center mt-10 print:text-xs">
                    <Image
                        src={signatureData ?? ""}
                        alt="Assinatura"
                        className="w-[300px] h-auto"
                    />
                    <p className="mt-2 text-gray-600 text-sm text-center">{name}</p>
                </div>
            ) : (
                // 🖊️ Modo de assinatura ativo
                <div className="flex flex-col items-center justify-center mt-20 print:text-xs">
                    <p className="text-gray-700 text-lg font-semibold">Assinatura</p>

                    <div className="w-full flex justify-center">
                        <canvas
                            ref={canvasRef}
                            width={500}
                            height={150}
                            className="border border-defaultMutedGreen rounded"
                        />
                    </div>

                    <p className="mt-2 text-gray-600 text-sm text-center">{name}</p>

                    <div className="flex flex-col items-center justify-center sm:flex-row gap-4 mt-6 w-full max-w-3xl">
                        <button
                            onClick={handleClear}
                            className="w-full sm:w-auto px-4 py-2 bg-defaultMutedGreen hover:bg-defaultCeladonGreen text-defaultBlack rounded transition"
                        >
                            Apagar
                        </button>
                        <button
                            onClick={handleSign}
                            className="w-full sm:w-auto px-4 py-2 bg-defaultGreen hover:bg-defaultGreenHover text-defaultWhite font-semibold rounded transition"
                        >
                            Assinar
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}