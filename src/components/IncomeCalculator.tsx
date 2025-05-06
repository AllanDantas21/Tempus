import { useState, useEffect } from 'react';
import { IncomeSummary } from './IncomeSummary';
import { WorkDataForm } from './WorkDataForm';
import { fetchWorkingDays } from '../services/workingDaysService';

export const IncomeCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [hoursPerDay, setHoursPerDay] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [workingDays, setWorkingDays] = useState<number>(22);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [holidays, setHolidays] = useState<string[]>([]);

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

  return (
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
  );
};