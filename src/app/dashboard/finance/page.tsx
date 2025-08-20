import { Container } from "@/components/container";
import PrivateRoute from "@/components/private";
import Link from "next/link";


export default function Finance() {
  const pagamentos = [
    { title: "Sessão de Fisioterapia", status: "FECHADO", valor: 150 },
    { title: "Sessão de Fisioterapia", status: "ABERTO", valor: 200 },
    { title: "Sessão de Fisioterapia", status: "ATRASADO", valor: 100 },
    { title: "Sessão de Fisioterapia", status: "ABERTO", valor: 75 },
    { title: "Sessão de Fisioterapia", status: "ATRASADO", valor: 120 },
    { title: "Sessão de Fisioterapia", status: "FECHADO", valor: 220 },
  ];

  const calcularTotalPorStatus = (status: string) => {
    return pagamentos
      .filter((p) => p.status === status)
      .reduce((total, p) => total + p.valor, 0);
  };

  const totalClosed = calcularTotalPorStatus("FECHADO");
  const totalOpen = calcularTotalPorStatus("ABERTO");
  const totalLate = calcularTotalPorStatus("ATRASADO");
  const totalGeral = pagamentos.reduce((total, p) => total + p.valor, 0);


  type StatusPagamento = "FECHADO" | "ABERTO" | "ATRASADO";

  const statusColorMap: Record<StatusPagamento, string> = {
    FECHADO: "bg-blue-500 text-white",
    ABERTO: "bg-green-500 text-white",
    ATRASADO: "bg-yellow-400 text-black",
  };

  return (
    <Container>
      <PrivateRoute>
        <main>

          {/* Cards de resumo */}
          <div >
            {/* Cards de resumo reorganizados */}
            <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-4 mb-6">
              {/* Geral - Azul */}
              <div className="rounded p-4 bg-blue-400 text-defaultWhite shadow flex-1">
                <p className="text-sm">GERAL</p>
                <p className="text-2xl font-bold">R$ {totalGeral}</p>
              </div>
              {/* Encerrados - Verde */}
              <div className="rounded p-4 bg-green-400 text-defaultWhite shadow flex-1">
                <p className="text-sm">ENCERRADOS</p>
                <p className="text-2xl font-bold">R$ {totalClosed}</p>
              </div>
              {/* Abertos - Amarelo */}
              <div className="rounded p-4 bg-yellow-400 text-defaultWhite shadow flex-1">
                <p className="text-sm">ABERTOS</p>
                <p className="text-2xl font-bold">R$ {totalOpen}</p>
              </div>

              {/* Atrasados - Vermelho */}
              <div className="rounded p-4 bg-red-400 text-defaultWhite shadow flex-1">
                <p className="text-sm">ATRASADOS</p>
                <p className="text-2xl font-bold">R$ {totalLate}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 mb-2">
            <h1 className="text-3xl font-bold">Pagamentos</h1>
            <Link href="dashboard/new" className="bg-defaultFlagGreen px-4 py-1 rounded text-defaultWhite ">
              Novo pagamento
            </Link>
          </div>


          {/* Tabela */}
          <div className="overflow-x-auto rounded border">

            <table className="min-w-full text-sm">
              <thead className="bg-defaultBlack text-defaultWhite">
                <tr>
                  <th className="p-3 text-left">Titulo</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Valor</th>
                </tr>
              </thead>
              <tbody>
                {pagamentos.map((p, i) => (
                  <tr key={i} className="border-b hover:bg-defaultMintGreen transition ">
                    <td className="p-3">{p.title}</td>
                    <td className="p-3">{p.status}</td>
                    <td className="p-3">R$ {p.valor}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </main>
      </PrivateRoute>
    </Container>
  );
}