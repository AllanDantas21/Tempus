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
    <div className="w-full max-w-4xl mt-12">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        <span className="gradient-text">Projeção de renda</span>
        <span> para os próximos meses</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monthsData.map((month, index) => (
          <div 
            key={index} 
            className="glass-effect p-6 card-hover"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{month.name}</h3>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold text-success">
              {month.isLoading ? (
                <span className="text-base flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculando...
                </span>
              ) : (
                `R$ ${month.income.toFixed(2)}`
              )}
            </div>
            <div className="bg-white/10 h-px my-3"></div>
            <p className="text-xs opacity-70 mt-1 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Baseado em {month.workingDays} dias úteis
            </p>
            {month.holidays.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium opacity-80 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  Feriados:
                </p>
                <ul className="mt-1 text-xs opacity-70 max-h-16 overflow-y-auto pl-4 space-y-1">
                  {month.holidays.map((holiday, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/70 mr-1.5"></span>
                      {holiday}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <div className="glass-effect py-3 px-6 text-sm opacity-70 inline-flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Os valores consideram apenas dias úteis, excluindo feriados
        </div>
      </div>
    </div>
  );
};