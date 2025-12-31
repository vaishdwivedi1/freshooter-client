
export default function InpuField({
  value,
  label,
  name,
  type = "text",
  placeholder,
  onChange,
  onBlur,
  error,
}) {
  return (
    <div className="space-y-2 w-full">
      <label htmlFor={name} className="block text-sm font-medium text-subText">
        {label}
      </label>
      <div className="flex flex-col">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
            error ? "border-red-500 focus:ring-red-300" : "focus:ring-primary"
          }`}
          autoComplete="off"
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
}
