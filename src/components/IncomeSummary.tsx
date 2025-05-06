import { IncomeSummaryProps } from '../types/components';

export const IncomeSummary = ({ 
  monthlyIncome, 
  workingDays = 22,
  isLoading = false,
  holidays = []
}: IncomeSummaryProps) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">Seu salário mensal estimado:</h2>
        <div className="text-4xl font-bold text-green-700 my-6 py-4 px-6 bg-green-50 rounded-lg">
          {isLoading ? (
            <span className="text-2xl">Calculando...</span>
          ) : (
            `R$ ${monthlyIncome.toFixed(2)}`
          )}
        </div>
        <p className="text-sm text-gray-500">
          *Baseado em {workingDays} dias úteis no mês atual
        </p>
        
        {holidays.length > 0 && (
          <div className="mt-4 text-left">
            <p className="text-sm font-medium text-gray-600">Feriados deste mês:</p>
            <ul className="mt-1 text-xs text-gray-500 list-disc list-inside">
              {holidays.map((holiday, index) => (
                <li key={index}>{holiday}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};