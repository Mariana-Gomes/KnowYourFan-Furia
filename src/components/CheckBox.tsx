interface CheckboxGroupProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

export function CheckboxList({
  title,
  options,
  selectedOptions,
  onChange,
}: CheckboxGroupProps) {
  const handleCheckboxChange = (option: string) => {
    if (selectedOptions?.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-white">
      <p className="font-medium mb-2">{title}</p>

      {options.map((option) => (
        <label key={option} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedOptions?.includes(option)}
            onChange={() => handleCheckboxChange(option)}
            className="accent-blue-500 w-4 h-4"
          />
          <span>{option}</span>
        </label>
      ))}

      <p className="mt-4 text-sm text-gray-400">
        Selecionados: {selectedOptions?.join(", ") || "Nenhum"}
      </p>
    </div>
  );
}
