"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";
import {
    FaCalendarAlt,
    FaDollarSign,
    FaTrash,
    FaPlusCircle,
    FaRegFileAlt,
    FaPen,
} from "react-icons/fa";
import { showCustomToast } from "@/utils/toast";
import { CreateCalendarModal } from "@/app/dashboard/clients/profile/components/CreateCalendarModal";
import { formatDateToBR } from "@/utils/dateFprmate";
import { CreatePaymentModal } from "@/app/dashboard/clients/profile/components/CreatePaymentModal";
import {ReceiptModal  } from "@/app/dashboard/clients/profile/components/ReceiptModal"
import { formatCurrencyBRL } from "@/utils/formatCurrencyBRL"
import { SlArrowLeft } from "react-icons/sl";
import { useUserContext } from "@/context/UserContext";


interface ScheduleItem {
    id: string;
    dayOfWeek: string;
    sessionTime: string;
}

export interface Payment {
    id: string;
    amount: number;
    openedDate: string;
    closedDate: string | null;
    paymentStatus: "OPEN" | "CLOSED" | "LATE"
    carePlanId: string;
    clientId: string;
}

interface Report {
    id: string;
    title: string;
    councilRegistrationNumber: string;
    date: string;
    text: string;
    clientId: string;
    userId: string;
}

interface CarePlan {
    id: string;
    title: string;
    startDate: string;
    expectedEndDate: string;
    actualEndDate: string | null;
    paymentId?: string
    schedule: ScheduleItem[];
    reports?: Report[];
}

export default function CarePlanDetails() {
    const { unique, id } = useParams();
    const pathname = usePathname();
    const router = useRouter();

    const { userData } = useUserContext();

    const [carePlan, setCarePlan] = useState<CarePlan | null>(null);
    const [payment, setPayment] = useState<Payment | null>(null);
    const [schedules, setSchedules] = useState<ScheduleItem[] | undefined>([]);
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);



    function handleOpenCalendar() {
        setShowCalendarModal(true);
    }

    function handleCloseCalendar() {
        setShowCalendarModal(false);
    }

    async function handleClosePayment(status: "OPEN" | "CLOSED") {
        if (!payment?.id) return;

        const actionLabel = status === "OPEN" ? "reabrir" : "encerrar";
        const confirmed = window.confirm(`Tem certeza que deseja ${actionLabel} este pagamento?`);
        if (!confirmed) return;

        try {
            await api.put(`/payments/${payment.id}`, {
                paymentStatus: status,
            });

            showCustomToast(`Pagamento atualizado com sucesso!`, "info");

            // Recarrega os dados atualizados
            await fetchPayment(payment.id);
        } catch (error) {
            console.error(`Erro ao ${actionLabel} pagamento:`, error);
            showCustomToast(`Erro ao ${actionLabel} o pagamento.`, "error");
        }
    }

    async function handleDeletePayment() {
        // lógica para excluir o pagamento
        if (!payment?.id) return;

        const confirmed = window.confirm("Tem certeza que deseja encerrar este pagamento?");
        if (!confirmed) return;

        try {
            await api.delete(`/payments/${payment.id}`);
            showCustomToast("Pagamento encerrado com sucesso!", "info");
            setPayment(null);
        } catch (error) {
            console.error("Erro ao encerrar pagamento:", error);
            showCustomToast("Erro ao encerrar o pagamento.", "error");
        }

    }

    const fetchCarePlan = async () => {
        try {
            const res = await api.get(`/care-plans/${unique}`);
            const plan = res.data;

            setCarePlan(plan);
            setSchedules(plan.schedule);
            console.log(plan)
            if (plan.paymentId) {
                await fetchPayment(plan.paymentId);
            }

            return plan.clientId;
        } catch (error) {
            console.error("Erro ao buscar CarePlan:", error);
        }
    };

    const fetchReports = async (clientId: string) => {
        try {
            const res = await api.get("/reports", {
                params: { clientId },
            });
            setReports(res.data.content || []);
        } catch (error) {
            console.error("Erro ao buscar Reports:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPayment = async (paymentId: string) => {
        try {
            const res = await api.get(`/payments/${paymentId}`);
            setPayment(res.data);
        } catch (error) {

        }
    };


    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                const res = await api.get(`/care-plans/${unique}`);
                const plan = res.data;

                if (!isMounted) return;

                setCarePlan(plan);
                setSchedules(plan.schedule);

                if (plan?.paymentId != null && plan.paymentId !== '') {
                    try {
                        const paymentRes = await api.get(`/payments/${plan.paymentId}`);
                        if (isMounted) setPayment(paymentRes.data);
                    } catch (error) {

                    }
                }

                if (plan.clientId) {
                    const reportsRes = await api.get("/reports", {
                        params: { clientId: plan.clientId },
                    });
                    if (isMounted) setReports(reportsRes.data.content || []);
                }
            } catch (error) {
                console.error("Erro ao carregar dados do plano:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        if (unique) fetchData();

        return () => {
            isMounted = false;
        };
    }, [unique]);



    async function handleDeleteEvaluate() {
        const confirm = window.confirm("Tem certeza que deseja excluir este plano?");
        if (!confirm || !carePlan?.id) return;

        try {
            await api.delete(`/care-plans/${carePlan.id}`);
            showCustomToast("Plano excluído com sucesso!", "info");
            router.back()
        } catch (error) {
            showCustomToast("Erro ao excluir plano.", "error");
            console.error(error);
        }
    }

    async function handleDeleteCalendar(id: string) {

        try {
            await api.delete(`/schedules/${id}`);
            showCustomToast("Calendário deletado com sucesso:", "success");
            await fetchCarePlan();

        } catch (error) {
            showCustomToast("Ocorreu um erro ao tentar deletar o calendário.", "error");
        }
    };

    async function handleReportDelete(id: string, clientId: string) {
        try {
            await api.delete(`/reports/${id}`);
            showCustomToast("evolução deletada com sucesso:", "success");
            await fetchReports(clientId);

        } catch (error) {
            showCustomToast("Ocorreu um erro ao tentar deletar a evolução.", "error");
        }
    }

    if (loading) return <p className="text-center text-gray-500">Carregando plano...</p>;
    if (!carePlan) return <p className="text-center text-red-500">Plano não encontrado.</p>;

    return (
        <div className="max-w-6xl w-full mx-auto p-8 bg-white rounded-lg border border-defaultMutedGreen">
            {/* Título */}
            <div className="w-full  flex items-center justify-between mb-5">
                <Link href={`/dashboard/clients/profile/${id}`}>
                    <SlArrowLeft className="hover:cursor-pointer text-defaultGreen" />
                </Link>
                <div className="w-full mx-auto">
                    <h1 className="text-2xl md:text-3xl font-medium mb-5 text-center">{carePlan.title}</h1>
                </div>
            </div>

            {/* Datas */}
            <div className="flex flex-col md:flex-row gap-4 text-gray-700 mb-6">
                <div className="flex-1">
                    <p><strong>Início:</strong> {formatDateToBR(carePlan.startDate)}</p>
                </div>
                <div className="flex-1">
                    <p><strong>Estimativa:</strong> {formatDateToBR(carePlan.expectedEndDate)}</p>
                </div>
                <div className="flex-1">
                    <p><strong>Término:</strong> {carePlan?.actualEndDate ? formatDateToBR(carePlan.actualEndDate) : "ao fim do atendimento"}</p>
                </div>
            </div>

            {/* Pagamento */}
            <div
                className={`mb-8 border border-defaultDarkGreen p-4 w-fit rounded ${payment?.paymentStatus === "OPEN"
                    ? "text-red-600"
                    : payment?.paymentStatus === "CLOSED"
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
            >
                <p>
                    <strong className="text-gray-700">Valor do pagamento:</strong>{" "}
                    {formatCurrencyBRL(payment?.amount ?? 0)}
                </p>

                {/* Ações baseadas no status e valor */}
                {payment?.amount && payment.amount > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4">
                        {payment.paymentStatus === "OPEN" ? (
                            <>
                                <button
                                    onClick={() => handleClosePayment("CLOSED")}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white text-sm rounded transition"
                                >
                                    Encerrar
                                </button>

                                <button
                                    onClick={handleDeletePayment}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white text-sm rounded transition"
                                >
                                    Excluir
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleClosePayment("OPEN")}
                                    className="px-3 py-1 bg-green-500 hover:bg-green-700 text-white text-sm rounded transition"
                                >
                                    Reabrir pagamento
                                </button>

                                <button
                                    onClick={() => setShowReceiptModal(true)}
                                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded transition flex items-center gap-2"
                                >
                                    🧾 Recibo
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
              <ReceiptModal
                isOpen={showReceiptModal}
                onClose={() => setShowReceiptModal(false)}
                userName={userData?.name ?? "Usuário"}
                id={payment?.clientId ?? "-"}
                amount={payment?.amount ?? 0}
                carePlanId={carePlan.id ?? "-"}
                formatCurrencyBRL={formatCurrencyBRL}
            />

            {/* Agenda + Evoluções */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Cronograma */}
                <div className="md:w-3/5">

                    <div className="flex justify-between items-center group cursor-pointer px-3">
                        <h2 className="text-xl font-semibold mb-4">Cronograma</h2>
                        <FaCalendarAlt className="text-blue-400 hover:text-blue-600 text-sm" onClick={handleOpenCalendar} />
                    </div>
                    {carePlan.schedule.length > 0 ? (
                        <ul className="space-y-2">
                            {carePlan.schedule.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-300 rounded-lg p-3 transition"
                                >
                                    <div className="text-defaultDarkGreen font-medium flex-1">{item.dayOfWeek}</div>
                                    <div className="text-sm text-gray-600 sm:text-right flex-1">
                                        Horário: {item.sessionTime}
                                    </div>
                                    <FaTrash
                                        onClick={() => handleDeleteCalendar(item.id)}
                                        className="text-red-400 text-sm hover:text-red-600 ml-5"
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">Crie o primeiro cronograma</p>
                    )}
                </div>

                {/* Separador */}
                <div className="hidden md:block w-px bg-gray-300 mx-2" />

                {/* Evoluções */}
                <div className="md:w-2/5 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Evoluções</h2>
                        <Link
                            href={`${pathname}/report/create`}
                            className="flex items-center gap-2 text-defaultGreen hover:text-defaultGreenHover transition-colors"
                        >
                            <FaPlusCircle />
                        </Link>
                    </div>
                    {reports && reports.length > 0 ? (
                        <ul className="space-y-2">
                            {reports.map((report, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg p-3 hover:border-defaultDarkGreen transition"
                                >
                                    <Link href={`${pathname}/report/${report.id}`} >
                                        <FaRegFileAlt className="text-defaultDarkGreen text-xl" />
                                    </Link>
                                    <section className="flex flex-col items-center w-full">
                                        <span className="text-gray-700 font-medium">{report.title}</span>
                                        <span className="text-gray-500"> {formatDateToBR(report.date)}</span>
                                    </section>

                                    <div className="flex flex-col items-center group cursor-pointer gap-3">
                                        <Link href={`${pathname}/report/${report.id}/update`}><FaPen className="text-blue-400 text-sm hover:text-blue-600" /></Link>
                                        <FaTrash onClick={() => handleReportDelete(report.id, report.clientId)} className="text-red-400 text-sm hover:text-red-600" />
                                    </div>


                                </div>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500">Crie a primeira evolução</p>
                    )}
                </div>
            </div>

            {/* Ações rápidas */}
            <div className="flex justify-center mt-10">
                <div className="flex gap-6">
                    {/* Pagamento */}
                    <div
                        onClick={() => setShowPaymentModal(true)}
                        className="flex flex-col items-center group cursor-pointer"
                    >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 transition">
                            <FaDollarSign className="text-white text-xl" />
                        </div>
                        <span className="mt-2 text-sm text-gray-700 group-hover:text-yellow-600 font-medium">Pagamento</span>
                    </div>

                    {/* Excluir */}
                    <div onClick={handleDeleteEvaluate} className="flex flex-col items-center group cursor-pointer">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 transition">
                            <FaTrash className="text-white text-xl" />
                        </div>
                        <span className="mt-2 text-sm text-gray-700 group-hover:text-red-600 font-medium">Excluir</span>
                    </div>
                </div>
            </div>
            {showCalendarModal && carePlan?.id && (
                <CreateCalendarModal
                    carePlanId={carePlan.id}
                    onClose={handleCloseCalendar}
                    onCreated={fetchCarePlan}
                />
            )}
            {showPaymentModal && carePlan?.id && (
                <CreatePaymentModal
                    carePlanId={carePlan.id}
                    onClose={() => setShowPaymentModal(false)}
                    onCreated={fetchCarePlan}
                />
            )}


        </div>
    );

}