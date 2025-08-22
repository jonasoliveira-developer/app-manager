import { toast } from "react-hot-toast";

export function showCustomToast(message: string, type?: "success" | "error" | "warning" | "info") {
  const styleMap = {
    success: { background: "#FFF" ,color: "#22C55E"},
    error: { background: "#EF4444",color: "#fff" }, 
    warning: { background: "#EAB308" ,color: "#fff"},
    info: { background: "#3B82F6",color: "#fff"},
  };

  const selected = type ? styleMap[type] : styleMap.info;

  toast(message, {
    style: {
      borderRadius: "8px",
      padding: "12px 16px",
      color: selected.color,
      fontWeight: "500",
      background: selected.background,
    },
  });
}

