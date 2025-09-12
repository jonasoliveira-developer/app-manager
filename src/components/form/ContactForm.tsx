"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { api } from "@/lib/api";
import { showCustomToast } from "@/utils/toast";

const contactSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
email: z
  .string()
  .min(1, "O e-mail é obrigatório")
  .email("Formato de e-mail inválido"),
  message: z.string().min(1, "A mensagem é obrigatória"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  async function handleSend(data: ContactFormData) {
    try {
        alert("chegou aqui")
      await api.post("/email/send", {
        to: "appmanageradm@gmail.com",
        subject: data.title,
        body: data.message,
        userName: data.email,
      });

      showCustomToast("Mensagem enviada com sucesso!", "success");
    } catch (error) {
        console.log(error, "error =========")
      showCustomToast("Erro ao enviar mensagem", "error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSend)}
      className="w-full max-w-2xl flex flex-col gap-4 bg-white p-6 rounded-xl shadow text-gray-500"
    >
      <Input
        type="text"
        name="title"
        placeholder="Título"
        error={errors.title?.message}
        register={register}
      />
      <Input
        type="text"
        name="email"
        placeholder="digite seu email"
        error={errors.email?.message}
        register={register}
      />
      <Textarea
        name="message"
        placeholder="Sua mensagem"
        error={errors.message?.message}
        register={register}
      />
      <button
        type="submit"
        className="w-full px-4 py-3 rounded-lg bg-defaultGreen text-defaultWhite font-semibold hover:opacity-90 transition-all"
      >
        Enviar mensagem
      </button>
    </form>
  );
}