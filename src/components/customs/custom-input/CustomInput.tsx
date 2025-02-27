import { FieldError, FieldValues } from "react-hook-form";
import { InputProps } from "../../../types/InputTypeProp";
import CustomInputError from "../custom-input-error/CustomInputError";
import { FaStarOfLife } from "react-icons/fa";

function CustomInput<T extends FieldValues>({
  type = "text",
  onValueChange,
  val,
  label,
  placeholder,
  register,
  options,
  error,
  formState,
  className = "",
  key = null,
  setValue,
  getValues,
}: InputProps<T>) {
  const handleChangeCapture = (value: any) => {
    setValue && setValue(label, value);
  };
  error = error ? error : (formState?.errors[label] as FieldError);
  const { onChange } = register(label, options);

  const handleOnChange = (e: any) => {
    onValueChange && onValueChange(e);
    onChange(e);
  };
  return (
    <div className={`${className ? className : ""} `} key={key}>
      <label className="flex gap-1 text-xs text-slate-500" htmlFor={label}>
        {options?.required && <FaStarOfLife style={{ width: "7px" }} />}
        <span>{placeholder}</span>
      </label>
      <input
        id={label}
        type={type}
        {...register(label, options)}
        placeholder={placeholder}
        value={val}
        capture={true}
        onChangeCapture={(e) => handleChangeCapture(e.currentTarget.value)}
        onChange={handleOnChange}
        className={
          "h-10 w-full pl-2 pr-6 text-base  transition-all duration-300 ease-in border-solid focus:outline-custom_orange-900 focus:border-custom_orange-800 border rounded-xl bg-white"
        }
        title={placeholder}
      />
      {error && <CustomInputError msg={error?.message} />}
    </div>
  );
}
export default CustomInput;
