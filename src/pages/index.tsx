import { IncomeCalculator } from '../components/IncomeCalculator';

export default function Home() {
  return (
    <div className="flex flex-col items-center px-8 py-12 mx-auto max-w-6xl min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-3 gradient-text">Tempus</h1>
        <p className="text-xl opacity-80 mb-2">Calculadora de Renda Mensal</p>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full"></div>
      </div>
      
      <IncomeCalculator />
    </div>
  );
}
