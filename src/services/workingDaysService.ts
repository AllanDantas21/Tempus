import { Holiday, FormattedHoliday, WorkingDaysResult } from '../types/workingDays';

export const fetchWorkingDays = async (
  date: Date = new Date()
): Promise<WorkingDaysResult> => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  
  const weekdaysCount = countWeekdaysInMonth(year, month);
  
  const allHolidays = await fetchHolidays(year);
  
  const weekdayHolidays = filterWeekdayHolidays(allHolidays, month);
  
  const spHolidays = getSpSpecificHolidays(year, month);
  
  const allRelevantHolidays = [
    ...weekdayHolidays,
    ...spHolidays.filter(spHoliday => 
      !weekdayHolidays.some(apiHoliday => apiHoliday.date === spHoliday.date)
    )
  ];
  
  const calculatedWorkingDays = weekdaysCount - allRelevantHolidays.length;
  
  const formattedHolidays = allRelevantHolidays.map(holiday => {
    const [_, __, dayStr] = holiday.date.split('-');
    const day = parseInt(dayStr, 10);
    return `${day}/${month} - ${holiday.localName}`;
  });
  
  return {
    workingDays: calculatedWorkingDays,
    holidays: formattedHolidays
  };
};

const countWeekdaysInMonth = (year: number, month: number): number => {
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
  
  return weekdaysCount;
};

const fetchHolidays = async (year: number): Promise<Holiday[]> => {
  const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/BR`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch holidays: ${response.status}`);
  }
  
  const holidays: Holiday[] = await response.json();
  
  return holidays.filter(holiday => 
    holiday.global === true ||
    (holiday.counties && holiday.counties.includes('BR-SP'))
  );
};

const filterWeekdayHolidays = (
  holidays: Holiday[],
  month: number
): FormattedHoliday[] => {
  return holidays.filter(holiday => {
    const [yearStr, monthStr, dayStr] = holiday.date.split('-');
    
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
  }).map(holiday => ({
    date: holiday.date,
    localName: holiday.localName
  }));
};

const getSpSpecificHolidays = (year: number, month: number): FormattedHoliday[] => {
  const spSpecificHolidays = [
    { date: `${year}-01-25`, name: 'Aniversário de São Paulo' },
    { date: `${year}-07-09`, name: 'Revolução Constitucionalista' }
  ];
  
  return spSpecificHolidays
    .filter(holiday => {
      const [_, monthStr, __] = holiday.date.split('-');
      const holidayMonth = parseInt(monthStr, 10);
      
      return holidayMonth === month;
    })
    .filter(holiday => {
      const [yearStr, monthStr, dayStr] = holiday.date.split('-');
      
      const holidayDate = new Date(
        parseInt(yearStr, 10),
        parseInt(monthStr, 10) - 1,
        parseInt(dayStr, 10)
      );
      
      const dayOfWeek = holidayDate.getDay();
      
      return dayOfWeek !== 0 && dayOfWeek !== 6;
    })
    .map(holiday => ({
      date: holiday.date,
      localName: holiday.name
    }));
};