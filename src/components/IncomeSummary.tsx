import { IncomeSummaryProps } from '../types/components';

export const IncomeSummary = ({ 
  monthlyIncome, 
  workingDays = 22,
  isLoading = false,
  holidays = []
}: IncomeSummaryProps) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center p-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Seu salário mensal estimado:</h2>
        <div className="text-4xl font-bold text-success my-6 py-6 px-8 bg-gradient-to-br from-white/40 to-white/10 rounded-2xl shadow-inner border border-white/30">
          {isLoading ? (
            <span className="text-2xl">Calculando...</span>
          ) : (
            `R$ ${monthlyIncome.toFixed(2)}`
          )}
        </div>
        <p className="text-sm opacity-70">
          *Baseado em {workingDays} dias úteis no mês atual
        </p>
        
        {holidays.length > 0 && (
          <div className="mt-6 text-left">
            <p className="text-sm font-medium">Feriados deste mês:</p>
            <ul className="mt-2 text-xs opacity-70 space-y-1">
              {holidays.map((holiday, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
                  {holiday}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};