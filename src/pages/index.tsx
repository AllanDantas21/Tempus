import { useState, useEffect } from 'react';

export default function Home() {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [hoursPerDay, setHoursPerDay] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);

  useEffect(() => {
    const workingDaysPerMonth = 22;
    const calculatedIncome = hourlyRate * hoursPerDay * workingDaysPerMonth;
    setMonthlyIncome(calculatedIncome);
  }, [hourlyRate, hoursPerDay]);

  return (
    <div className="flex flex-col items-center px-8 py-8 mx-auto max-w-6xl min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Tempus</h1>
      <p className="text-xl text-gray-600 mb-8">Calculadora de Renda Mensal</p>
      
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden md:flex-row flex-col">
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
        
        <div className="md:w-px w-full md:h-auto h-px bg-gray-200"></div>
        
        <div className="flex-1 p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Dados de trabalho</h2>
          
          <div className="mb-6">
            <label htmlFor="hourlyRate" className="block mb-2 font-medium text-gray-700">
              Valor por hora (R$):
            </label>
            <input
              id="hourlyRate"
              type="number"
              min="0"
              step="0.01"
              value={hourlyRate || ''}
              onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="hoursPerDay" className="block mb-2 font-medium text-gray-700">
              Horas trabalhadas por dia:
            </label>
            <input
              id="hoursPerDay"
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={hoursPerDay || ''}
              onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
