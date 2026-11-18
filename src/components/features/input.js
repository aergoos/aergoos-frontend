import React from "react";

export default function Input({
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  id,
  required,
  label,
  error,
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <div
      className={`flex flex-col justify-start gap-1 mb-8 ${containerClassName}`}
    >
      {label && (
        <label
          htmlFor={id || name}
          className="font-JetBrainReg text-xs uppercase tracking-wider text-black/60 mb-1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`placeholder:text-black/50 placeholder:font-JetBrainReg text-black font-JetBrainReg bg-transparent outline-none border-b-2 border-black pb-3 
        focus:border-orange w-full duration-300 ease-in-out ${className}`}
        {...props}
      />
      {error && (
        <span className="font-JetBrainLig text-xs text-orange mt-1">
          {error}
        </span>
      )}
    </div>
  );
}
