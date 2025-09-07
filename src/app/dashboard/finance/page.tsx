"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaTrash } from "react-icons/fa";
import { Container } from "@/components/container";

type StatusPagamento = "FECHADO" | "ABERTO" | "ATRASADO";

interface Despesa {
  nome: string;
  tipo: string;
  valor: number;
}

const tiposDespesa = [
  "Gasolina",
  "Alimentação",
  "Material de trabalho",
  "Auto-empréstimo",
  "Outros",
];

const coresStatus: Record<StatusPagamento, string> = {
  FECHADO: "#22c55e",
  ABERTO: "#facc15",
  ATRASADO: "#ef4444",
};

export default function Finance() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [novaDespesa, setNovaDespesa] = useState("");
  const [valorDespesa, setValorDespesa] = useState("");
  const [tipoDespesa, setTipoDespesa] = useState(tiposDespesa[0]);
  const [salarioMeta, setSalarioMeta] = useState(3000);

  const pagamentos = [
    { title: "Sessão de Fisioterapia", status: "FECHADO", valor: 150 },
    { title: "Sessão de Fisioterapia", status: "ABERTO", valor: 200 },
    { title: "Sessão de Fisioterapia", status: "ATRASADO", valor: 100 },
    { title: "Sessão de Fisioterapia", status: "ABERTO", valor: 75 },
    { title: "Sessão de Fisioterapia", status: "ATRASADO", valor: 120 },
    { title: "Sessão de Fisioterapia", status: "FECHADO", valor: 220 },
  ];

  const calcularTotalPorStatus = (status: StatusPagamento) =>
    pagamentos.filter((p) => p.status === status).reduce((acc, p) => acc + p.valor, 0);

  const totalRecebido = calcularTotalPorStatus("FECHADO");
  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);
  const lucro = totalRecebido - totalDespesas;
  const progresso = Math.min((totalRecebido / salarioMeta) * 100, 100).toFixed(1);

  const dadosPizza = (["FECHADO", "ABERTO", "ATRASADO"] as StatusPagamento[]).map((status) => ({
    name: status,
    value: calcularTotalPorStatus(status),
    color: coresStatus[status],
  }));

  const dadosLinha = [
    { mes: "Jan", receita: 500, despesa: 300 },
    { mes: "Fev", receita: 400, despesa: 350 },
    { mes: "Mar", receita: 600, despesa: 250 },
    { mes: "Abr", receita: 700, despesa: 400 },
    { mes: "Mai", receita: 500, despesa: 300 },
    { mes: "Jun", receita: 650, despesa: 450 },
    { mes: "Jul", receita: 700, despesa: 500 },
    { mes: "Ago", receita: 800, despesa: 600 },
    { mes: "Set", receita: 750, despesa: 550 },
    { mes: "Out", receita: 850, despesa: 650 },
    { mes: "Nov", receita: 900, despesa: 700 },
    { mes: "Dez", receita: 950, despesa: 750 },
  ];

  const adicionarDespesa = () => {
    const valor = parseFloat(valorDespesa);
    if (!novaDespesa.trim() || isNaN(valor) || valor <= 0) return;
    setDespesas([...despesas, { nome: novaDespesa, tipo: tipoDespesa, valor }]);
    setNovaDespesa("");
    setValorDespesa("");
  };

  const removerDespesa = (index: number) => {
    setDespesas(despesas.filter((_, i) => i !== index));
  };

  return (
    <Container>
        <main className="space-y-8 px-4 py-6">
          {/* Painel financeiro */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500 text-white p-4 rounded shadow">
              <h2 className="text-sm">Receita Recebida</h2>
              <p className="text-2xl font-bold">R$ {totalRecebido}</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded shadow">
              <h2 className="text-sm">Despesas</h2>
              <p className="text-2xl font-bold">R$ {totalDespesas}</p>
            </div>
            <div className="bg-green-600 text-white p-4 rounded shadow">
              <h2 className="text-sm">Lucro</h2>
              <p className="text-2xl font-bold">R$ {lucro}</p>
            </div>
          </div>

          {/* Meta salarial */}
          <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-1">Meta de salário mensal</label>
              <input
                type="number"
                value={salarioMeta}
                onChange={(e) => setSalarioMeta(Number(e.target.value))}
                className="border p-2 rounded w-full md:w-64"
              />
            </div>
            <div className="text-sm text-gray-700">
              Progresso: <span className="font-bold text-defaultGreen">{progresso}%</span> atingido
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-2">Distribuição de Pagamentos</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={dadosPizza} dataKey="value" nameKey="name" outerRadius={80}>
                    {dadosPizza.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-around mt-2 text-sm">
                {dadosPizza.map((d) => (
                  <span key={d.name} className="font-semibold" style={{ color: d.color }}>
                    {d.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-2">Projeção Anual</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dadosLinha}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="receita" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="despesa" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cadastro de despesa */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <input
              type="text"
              placeholder="Nome da despesa"
              value={novaDespesa}
              onChange={(e) => setNovaDespesa(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Valor"
              value={valorDespesa}
              onChange={(e) => setValorDespesa(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <select
              value={tipoDespesa}
              onChange={(e) => setTipoDespesa(e.target.value)}
              className="border p-2 rounded w-full"
            >
              {tiposDespesa.map((tipo) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
            <button
              onClick={adicionarDespesa}
              className="bg-defaultGreen hover:bg-defaultGreenHover text-white font-semibold px-4 py-2 rounded transition w-full"
            >
              Adicionar despesa
            </button>
          </div>

          {/* Painel de tipos e valores */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {tiposDespesa.map((tipo) => {
              const total = despesas
                .filter((d) => d.tipo === tipo)
                .reduce((acc, d) => acc + d.valor, 0);

              return (
                <div
                  key={tipo}
                  className="bg-gray-100 p-4 rounded shadow text-center w-full sm:w-64"
                >
                  <p className="text-sm font-semibold text-gray-700">{tipo}</p>
                  <p className="text-xl font-bold text-defaultDarkGreen">R$ {total}</p>
                </div>
              );
            })}
          </div>

          {/* Lista de despesas */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4 text-defaultDarkGreen">Despesas cadastradas</h3>
            {despesas.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhuma despesa registrada.</p>
            ) : (
              <ul className="space-y-3">
                {despesas.map((d, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-white p-4 rounded shadow hover:shadow-md transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{d.nome}</p>
                      <p className="text-sm text-gray-500">{d.tipo}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-red-500">R$ {d.valor}</p>
                      <button
                        onClick={() => removerDespesa(index)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Remover despesa"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>

    </Container>
  );
}