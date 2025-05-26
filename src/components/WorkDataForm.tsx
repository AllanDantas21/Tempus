import { WorkDataFormProps } from '../types/components';
import { InputField } from './InputField';

export const WorkDataForm = ({
  hourlyRate,
  setHourlyRate,
  hoursPerDay,
  setHoursPerDay
}: WorkDataFormProps) => {
  return (
    <div className="flex-1 p-8">
      <h2 className="text-xl font-semibold mb-8 text-center">Dados de trabalho</h2>
      
      <div className="bg-gradient-to-br from-white/30 to-white/5 rounded-xl p-6 border border-white/20">
        <InputField
          id="hourlyRate"
          label="Valor por hora (R$):"
          value={hourlyRate}
          onChange={setHourlyRate}
          min={0}
          step="0.01"
          icon="currency"
        />
        
        <InputField
          id="hoursPerDay"
          label="Horas trabalhadas por dia:"
          value={hoursPerDay}
          onChange={setHoursPerDay}
          min={0}
          max={24}
          step="0.5"
          icon="clock"
        />
      </div>
    </div>
  );
};