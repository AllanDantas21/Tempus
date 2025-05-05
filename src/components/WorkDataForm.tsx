import { InputField } from './InputField';

type WorkDataFormProps = {
  hourlyRate: number;
  setHourlyRate: (value: number) => void;
  hoursPerDay: number;
  setHoursPerDay: (value: number) => void;
};

export const WorkDataForm = ({
  hourlyRate,
  setHourlyRate,
  hoursPerDay,
  setHoursPerDay
}: WorkDataFormProps) => {
  return (
    <div className="flex-1 p-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Dados de trabalho</h2>
      
      <InputField
        id="hourlyRate"
        label="Valor por hora (R$):"
        value={hourlyRate}
        onChange={setHourlyRate}
        min={0}
        step="0.01"
      />
      
      <InputField
        id="hoursPerDay"
        label="Horas trabalhadas por dia:"
        value={hoursPerDay}
        onChange={setHoursPerDay}
        min={0}
        max={24}
        step="0.5"
      />
    </div>
  );
};