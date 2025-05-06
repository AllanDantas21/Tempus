export interface IncomeSummaryProps {
  monthlyIncome: number;
  workingDays: number;
  isLoading: boolean;
  holidays: string[];
}

export interface WorkDataFormProps {
  hourlyRate: number;
  setHourlyRate: (value: number) => void;
  hoursPerDay: number;
  setHoursPerDay: (value: number) => void;
}