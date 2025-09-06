"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { showCustomToast } from "@/utils/toast";

const paymentSchema = z.object({
  amount: z.string().min(1, "Informe o valor"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface Props {
  carePlanId: string;
  onSuccess: () => void;
}

export function CreatePaymentForm({ carePlanId, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
  });

  async function handleRegister(data: PaymentFormData) {
    try {
      await api.post("/payments", {
        carePlanId,
        amount: parseFloat(data.amount),
        
      });

      showCustomToast("Pagamento criado com sucesso!", "success");
      onSuccess();
    } catch (error: any) {
      const title = error?.response?.data?.title;
      showCustomToast(title || "Erro ao criar pagamento", "error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="flex flex-col gap-4 max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <Input
        type="text"
        name="amount"
        placeholder="Valor do pagamento"
        error={errors.amount?.message}
        register={register}
      />

      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
      >
        Criar pagamento
      </button>
    </form>
  );
}