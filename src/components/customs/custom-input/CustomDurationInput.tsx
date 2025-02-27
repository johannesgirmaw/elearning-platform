import { FieldError, FieldValues, UseFormGetValues, Path, UseFormSetValue, RegisterOptions, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";
import { changeDuration } from "../../../utils/modal";
import CustomInputError from "../custom-input-error/CustomInputError";
import { FaStarOfLife } from "react-icons/fa";

interface Props { days: number, minutes: number, hours: number }


export interface InputProps<T extends FieldValues> {
    label: Path<T>;
    placeholder: string;
    getValues: UseFormGetValues<T>;
    setValue: UseFormSetValue<T>;
    error?: FieldError,
    options?: RegisterOptions<T, Path<T>>
    register: UseFormRegister<T>;
    type?: "day" | "time"
    key?: any;
    onValueChange?: (value: any) => void
};

const CustomDurationInput = <T extends FieldValues>({ options, type, register, onValueChange, getValues, label, placeholder, error, key = null, setValue }: InputProps<T>) => {
    const [values, setValues] = useState<Props>(changeDuration(getValues(label)))
    let typ = type || "day"

    useEffect(() => setValues(changeDuration(getValues(label))), [getValues(label)])

    const validateDuration = (label: "days" | "minutes" | "hours", value: number) => {
        return !(value < 0 || (label === "hours" && value >= 24) || (label === "minutes" && value >= 60))
    }

    const onChange = (lab: "days" | "minutes" | "hours", value: any) => {
        let val: number = +(value || 0)
        if (validateDuration(lab, val)) {
            let vall: Props = { ...values, [lab]: val }
            setValues(vall)
            setValue?.(label, `${vall.days} ${vall.hours}:${vall.minutes}:00` as any);
            onValueChange?.(vall);
        }
    }
    return <>
      <h1 className="text-xs text-slate-500 flex gap-1">{options?.required&&<FaStarOfLife style={{width:"7px",}} />}{placeholder}</h1>
        <div className="flex px-1 gap-2 duration border-solid border-2 text-gray-600 border-gray-200 py-2 mt-5 rounded-lg w-full focus-within:border-4 focus-within:border-custom_orange-700 relative" {...register(label, options)}>
        <label htmlFor="" className="absolute z-[0.5] -top-5 left-2 text-gray-500 p-1 bg-white">{placeholder}</label>
        {typ === "day" &&<> <label>Day:</label><input className="min-w-10 focus:outline-none w-full px-1" type="number" name="days" defaultValue={values.days} value={values.days} onChange={(value) => onChange("days", value.target.value)} /></>}
        <label>Hr:</label><input className="min-w-10 w-full border-0 px-1 focus:outline-none" type="number" name="hours" value={values.hours} onChange={(value) => onChange("hours", value.target.value)} />
        <label>Min:</label><input className="min-w-10 w-full px-1 focus:outline-none" type="number" name="minutes" onChange={(value) => onChange("minutes", value.target.value)} value={values.minutes} />
    </div>

        <CustomInputError msg={error?.message} />
    </>
}

export default CustomDurationInput;