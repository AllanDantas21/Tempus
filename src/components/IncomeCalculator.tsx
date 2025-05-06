import { useState, useEffect } from 'react';
import { IncomeSummary } from './IncomeSummary';
import { WorkDataForm } from './WorkDataForm';

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export const IncomeCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [hoursPerDay, setHoursPerDay] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [workingDays, setWorkingDays] = useState<number>(22);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [holidays, setHolidays] = useState<string[]>([]);

  useEffect(() => {
    const fetchWorkingDays = async () => {
      setIsLoading(true);
      try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        
        const lastDay = new Date(year, month, 0);
        const totalDays = lastDay.getDate();
        
        let weekdaysCount = 0;
        for (let day = 1; day <= totalDays; day++) {
          const date = new Date(year, month - 1, day);
          const dayOfWeek = date.getDay();
          
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            weekdaysCount++;
          }
        }
        
        const holidaysResponse = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/BR`);
        
        if (!holidaysResponse.ok) {
          throw new Error(`Failed to fetch holidays: ${holidaysResponse.status}`);
        }
        
        const allHolidays: Holiday[] = await holidaysResponse.json();
        
        const weekdayHolidays = allHolidays.filter(holiday => {
          const holidayDateStr = holiday.date;
          const [yearStr, monthStr, dayStr] = holidayDateStr.split('-');
          
          const holidayDate = new Date(
            parseInt(yearStr, 10),
            parseInt(monthStr, 10) - 1,
            parseInt(dayStr, 10)
          );
          
          const holidayMonth = holidayDate.getMonth() + 1;
          const dayOfWeek = holidayDate.getDay();
          
          const isCurrentMonth = holidayMonth === month;
          const isWeekday = dayOfWeek !== 0 && dayOfWeek !== 6;
          
          return isCurrentMonth && isWeekday;
        });
        
        const calculatedWorkingDays = weekdaysCount - weekdayHolidays.length;
        
        const formattedHolidays = weekdayHolidays.map(holiday => {
          const [_, __, dayStr] = holiday.date.split('-');
          const day = parseInt(dayStr, 10);
          return `${day}/${month} - ${holiday.localName}`;
        });
        
        setHolidays(formattedHolidays);
        setWorkingDays(calculatedWorkingDays);
      } catch (err) {
        console.error('Error fetching holidays:', err);
        setWorkingDays(21);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkingDays();
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