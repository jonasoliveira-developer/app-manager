'use client';

import { useRef, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { showCustomToast } from "@/utils/toast";

interface SignatureFieldProps {
  name: string;
  reportId: string;
  type: "assignClient" | "assignUser";
}

export function SignatureField({ name, reportId, type }: SignatureFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/reports/${reportId}`);
        const report = res.data;

        const url = type === "assignClient" ? report?.assignUrlClient : report?.assignUrlUser;

        if (url) {
          setSignatureUrl(url);
          setSigned(true);
        }
      } catch (error) {
        console.error("Erro ao carregar assinatura:", error);
      }
    };

    fetchReport();
  }, [reportId, type]);

  const prepareCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const centerY = canvas.height / 2;
    ctx.strokeStyle = "#50c878";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || signed) return;
    const ctx = canvas.getContext("2d");
    if (ctx) prepareCanvas(ctx, canvas);
  }, [signed]);

  useEffect(() => {
    if (signed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let drawing = false;

    const getPosition = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

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

  const isCanvasBlank = (canvas: HTMLCanvasElement) => {
    const blank = document.createElement("canvas");
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() === blank.toDataURL();
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    prepareCanvas(ctx, canvas);
    setSignatureUrl(null);
    setSigned(false);
  };

  const handleSign = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isCanvasBlank(canvas)) {
      showCustomToast("Assinatura está vazia. Desenhe algo antes de enviar.", "warning");
      return;
    }

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      setLoading(true);
      const formData = new FormData();
      const normalizedType = type === "assignClient" ? "assignclient" : "assignuser";

      formData.append("image", blob, `${normalizedType}-signature.png`);
      formData.append("type", normalizedType);
      formData.append("id", reportId);

      try {
        const res = await api.post("/images/upload", formData);
        const imageUrl = res.data.url;

        setSignatureUrl(imageUrl);
        setSigned(true);
        showCustomToast("Assinatura enviada e vinculada ao relatório!", "success");
      } catch (error) {
        showCustomToast("Erro ao salvar assinatura", "error");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, "image/png");
  };

  return (
    <section className="w-full">
      {signed && signatureUrl ? (
        <div className="flex flex-col items-center justify-center mt-10 print:text-xs">
          <img src={signatureUrl} alt="Assinatura" className="w-[300px] h-auto rounded" />
          <p className="mt-2 text-gray-600 text-sm text-center">{name}</p>
        </div>
      ) : (
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
              disabled={loading}
            >
              Apagar
            </button>
            <button
              onClick={handleSign}
              className="w-full sm:w-auto px-4 py-2 bg-defaultGreen hover:bg-defaultGreenHover text-defaultWhite font-semibold rounded transition"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Assinar"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}