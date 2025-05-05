import { IncomeCalculator } from '../components/IncomeCalculator';

export default function Home() {
  return (
    <div className="flex flex-col items-center px-8 py-8 mx-auto max-w-6xl min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Tempus</h1>
      <p className="text-xl text-gray-600 mb-8">Calculadora de Renda Mensal</p>
      
      <IncomeCalculator />
    </div>
  );
}
