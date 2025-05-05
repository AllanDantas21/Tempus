type InputFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: string;
};

export const InputField = ({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = "0.01"
}: InputFieldProps) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={value !== undefined ? value : ''}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
    </div>
  );
};