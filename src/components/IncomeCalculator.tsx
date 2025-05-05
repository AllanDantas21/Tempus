import { useState, useEffect } from 'react';
import { IncomeSummary } from './IncomeSummary';
import { WorkDataForm } from './WorkDataForm';

export const IncomeCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [hoursPerDay, setHoursPerDay] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);

  useEffect(() => {
    const workingDaysPerMonth = 22;
    const calculatedIncome = hourlyRate * hoursPerDay * workingDaysPerMonth;
    setMonthlyIncome(calculatedIncome);
  }, [hourlyRate, hoursPerDay]);

  return (
    <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden md:flex-row flex-col">
      <IncomeSummary monthlyIncome={monthlyIncome} />
      
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