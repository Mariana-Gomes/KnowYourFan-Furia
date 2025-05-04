import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { MiniLoading } from "./MiniLoading";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  register?: UseFormRegister<FieldValues>;
  error?: string;
  margin?: boolean;
  isLoading?: boolean;
};

export function FormInput({
  name,
  register,
  error,
  margin,
  isLoading,
  ...rest
}: FormInputProps) {
  const { value, onChange } = rest;
  const isControlled =
    typeof value !== "undefined" && typeof onChange === "function";

  let inputProps = {};
  if (isControlled) {
    inputProps = { value, onChange };
  } else if (register) {
    inputProps = register(name);
  }

  return (
    <div className={`flex flex-col ${margin && "mb-8"}`}>
      <div className="relative w-full">
        <input
          name={name}
          className="w-full pb-2 pr-8 border-b  border-white/20 hover:border-blue-500 placeholder-white/60 outline-none caret-white text-white text-base"
          {...rest}
          {...inputProps}
        />
        {isLoading && (
          <div className="absolute right-5 top-2 -translate-y-1/2">
            <MiniLoading />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
