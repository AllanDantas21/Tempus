import { useState, useEffect } from 'react';
import { IncomeSummary } from './IncomeSummary';
import { WorkDataForm } from './WorkDataForm';
import { MonthlyIncomeGrid } from './MonthlyIncomeGrid';
import { fetchWorkingDays } from '../services/workingDaysService';

export const IncomeCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [hoursPerDay, setHoursPerDay] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [workingDays, setWorkingDays] = useState<number>(22);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [showProjection, setShowProjection] = useState<boolean>(false);

  useEffect(() => {
    const getWorkingDays = async () => {
      setIsLoading(true);
      try {
        const result = await fetchWorkingDays();
        setWorkingDays(result.workingDays);
        setHolidays(result.holidays);
      } catch (error) {
        console.error('Error fetching working days:', error);
        setWorkingDays(22);
      } finally {
        setIsLoading(false);
      }
    };

    getWorkingDays();
  }, []);

  useEffect(() => {
    const calculatedIncome = hourlyRate * hoursPerDay * workingDays;
    setMonthlyIncome(calculatedIncome);
  }, [hourlyRate, hoursPerDay, workingDays]);

  const toggleProjection = () => {
    setShowProjection(!showProjection);
  };

  return (
    <>
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden md:flex-row flex-col">
        <IncomeSummary 
          monthlyIncome={monthlyIncome}
          workingDays={workingDays}
          isLoading={isLoading}
          holidays={holidays}
        />
        
        <div className="md:w-px w-full md:h-auto h-px bg-gray-200"></div>
        
        <WorkDataForm
          hourlyRate={hourlyRate}
          setHourlyRate={setHourlyRate}
          hoursPerDay={hoursPerDay}
          setHoursPerDay={setHoursPerDay}
        />
      </div>
      
      <button
        onClick={toggleProjection}
        className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
      >
        {showProjection ? 'Ocultar Projeção Anual' : 'Mostrar Projeção Anual'}
        <svg 
          className={`ml-2 w-5 h-5 transition-transform duration-300 ${showProjection ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {showProjection && (
        <MonthlyIncomeGrid 
          hourlyRate={hourlyRate}
          hoursPerDay={hoursPerDay}
        />
      )}
    </>
  );
};