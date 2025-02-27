import React from "react";
import { FieldValues } from "react-hook-form";
import { InputProps } from "../../../types/InputTypeProp";
import CustomInputError from "../custom-input-error/CustomInputError";

function CustomGroupInput<T extends FieldValues>({
  type = "text",
  label,
  prefix,
  suffix,
  placeholder,
  register,
  options,
  error,
  onValueChange,
}: InputProps<T>) {
  return (
    <div className="flex flex-col">
      <div className="flex w-full h-12 mt-5">
        {prefix && (
          <span className="inline-flex items-center px-3 text-sm text-right border border-r-0 text-custom_black-200 bg-custom_orange-200 border-custom_orange-700 rounded-l-md">
            {prefix}
          </span>
        )}
        <input
          type={type}
          {...register(label, options)}
          onChange={onValueChange}
          className={
            "focus:outline-custom_orange-900 rounded-none  border flex-grow text-custom_black-200 block flex-4 min-w-0 text-base border-custom_orange-700 p-2.5 " +
            (prefix ? "rounded-r-lg" : suffix ? "rounded-l-lg" : "rounded-lg")
          }
          placeholder={placeholder}
        />
        {suffix && (
          <span className="inline-flex items-center px-3 text-sm text-right border border-l-0 text-custom_black-200 bg-custom_orange-200 border-custom_orange-700 rounded-r-md">
            {suffix}
          </span>
        )}
      </div>
      <CustomInputError msg={error?.message} />
    </div>
  );
}

export default CustomGroupInput;
