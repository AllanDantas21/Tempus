type IncomeSummaryProps = {
  monthlyIncome: number;
};

export const IncomeSummary = ({ monthlyIncome }: IncomeSummaryProps) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">Seu salário mensal estimado:</h2>
        <div className="text-4xl font-bold text-green-700 my-6 py-4 px-6 bg-green-50 rounded-lg">
          R$ {monthlyIncome.toFixed(2)}
        </div>
        <p className="text-sm text-gray-500">
          *Baseado em 22 dias úteis por mês
        </p>
      </div>
    </div>
  );
};