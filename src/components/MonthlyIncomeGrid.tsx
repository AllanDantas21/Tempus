import React, { useEffect, useState } from 'react';
import { fetchWorkingDays } from '../services/workingDaysService';

interface MonthlyIncomeGridProps {
  hourlyRate: number;
  hoursPerDay: number;
}

interface MonthData {
  name: string;
  workingDays: number;
  income: number;
  holidays: string[];
  isLoading: boolean;
}

export const MonthlyIncomeGrid = ({ hourlyRate, hoursPerDay }: MonthlyIncomeGridProps) => {
  const [monthsData, setMonthsData] = useState<MonthData[]>([]);
  
  useEffect(() => {
    const getMonthsData = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      
      const initialMonthsData: MonthData[] = [];
      
      for (let i = currentMonth; i < 12; i++) {
        initialMonthsData.push({
          name: monthNames[i],
          workingDays: 22,
          income: 0,
          holidays: [],
          isLoading: true
        });
      }
      
      setMonthsData(initialMonthsData);
      
      const updatedMonthsData = [...initialMonthsData];
      
      for (let i = 0; i < updatedMonthsData.length; i++) {
        const monthIndex = currentMonth + i;
        try {
          const result = await fetchWorkingDays(currentYear, monthIndex + 1);
          updatedMonthsData[i] = {
            ...updatedMonthsData[i],
            workingDays: result.workingDays,
            holidays: result.holidays,
            income: hourlyRate * hoursPerDay * result.workingDays,
            isLoading: false
          };
        } catch (error) {
          console.error(`Error fetching working days for ${monthNames[monthIndex]}:`, error);
          updatedMonthsData[i] = {
            ...updatedMonthsData[i],
            isLoading: false
          };
        }
      }
      setMonthsData([...updatedMonthsData]);
    };

    if (hourlyRate > 0 && hoursPerDay > 0) {
      getMonthsData();
    } else {
      setMonthsData(prev => prev.map(month => ({
        ...month,
        income: 0,
        isLoading: false
      })));
    }
  }, [hourlyRate, hoursPerDay]);

  useEffect(() => {
    setMonthsData(prev => 
      prev.map(month => ({
        ...month,
        income: hourlyRate * hoursPerDay * month.workingDays
      }))
    );
  }, [hourlyRate, hoursPerDay]);

  if (monthsData.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Projeção de renda para os próximos meses:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monthsData.map((month, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-medium text-gray-700">{month.name}</h3>
            <div className="mt-2 text-2xl font-bold text-green-700">
              {month.isLoading ? (
                <span className="text-base">Calculando...</span>
              ) : (
                `R$ ${month.income.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              *Baseado em {month.workingDays} dias úteis
            </p>
            {month.holidays.length > 0 && (
              <div className="mt-2">
                <p className="text-xs font-medium text-gray-600">Feriados:</p>
                <ul className="mt-1 text-xs text-gray-500 list-disc list-inside max-h-16 overflow-y-auto">
                  {month.holidays.map((holiday, idx) => (
                    <li key={idx}>{holiday}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};