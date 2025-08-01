import { Container } from "@/components/container";


export default function Finance() {
  const pagamentos = [
    { cliente: "Ana Souza", status: "CLOSED", valor: 150 },
    { cliente: "Carlos Lima", status: "OPEN", valor: 200 },
    { cliente: "Maria Silva", status: "LATE", valor: 100 },
    { cliente: "João Almeida", status: "OPEN", valor: 75 },
    { cliente: "Fernanda Costa", status: "LATE", valor: 120 },
    { cliente: "Lucas Ferreira", status: "CLOSED", valor: 220 },
  ];

  const calcularTotalPorStatus = (status: string) => {
    return pagamentos
      .filter((p) => p.status === status)
      .reduce((total, p) => total + p.valor, 0);
  };

  const totalClosed = calcularTotalPorStatus("CLOSED");
  const totalOpen = calcularTotalPorStatus("OPEN");
  const totalLate = calcularTotalPorStatus("LATE");
  const totalGeral = pagamentos.reduce((total, p) => total + p.valor, 0);


  type StatusPagamento = "CLOSED" | "OPEN" | "LATE";

  const statusColorMap: Record<StatusPagamento, string> = {
    CLOSED: "bg-blue-500 text-white",
    OPEN: "bg-green-500 text-white",
    LATE: "bg-yellow-400 text-black",
  };

  return (
    <Container>
      {/* Cards de resumo */}
      <div className="mt-5">
            {/* Cards de resumo reorganizados */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Geral - Azul */}
                    <div className="rounded p-4 bg-blue-400 text-defaultWhite shadow">
                      <p className="text-sm">GERAL</p>
                      <p className="text-2xl font-bold">R$ {totalGeral}</p>
                    </div>
                    {/* Encerrados - Verde */}
                    <div className="rounded p-4 bg-green-400 text-defaultWhite shadow">
                      <p className="text-sm">ENCERRADOS</p>
                      <p className="text-2xl font-bold">R$ {totalClosed}</p>
                    </div>
                    {/* Abertos - Amarelo */}
                    <div className="rounded p-4 bg-yellow-400 text-defaultWhite shadow">
                      <p className="text-sm">ABERTOS</p>
                      <p className="text-2xl font-bold">R$ {totalOpen}</p>
                    </div>

                    {/* Atrasados - Vermelho */}
                    <div className="rounded p-4 bg-red-400 text-defaultWhite shadow">
                      <p className="text-sm">ATRASADOS</p>
                      <p className="text-2xl font-bold">R$ {totalLate}</p>
                    </div>
            </div>
      </div>


      {/* Tabela */}
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="bg-defaultBlack text-defaultWhite">
            <tr>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Valor</th>
            </tr>
          </thead>
        <tbody>
            {pagamentos.map((p, i) => (
                <tr key={i} className="border-b hover:bg-defaultMintGreen transition ">
                <td className="p-3">{p.cliente}</td>
                <td className="p-3">{p.status}</td>
                <td className="p-3">R$ {p.valor}</td>
                </tr>
            ))}
        </tbody>

        </table>
      </div>
    </Container>
  );
}