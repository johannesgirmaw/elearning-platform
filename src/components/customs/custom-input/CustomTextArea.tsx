import React, { useEffect, useRef } from "react";
import { FieldValues } from "react-hook-form";
import { InputProps } from "../../../types/InputTypeProp";
import CustomInputError from "../custom-input-error/CustomInputError";
import { FaStarOfLife } from "react-icons/fa";

function CustomTextArea<T extends FieldValues>({rows = 5, label, placeholder, register, options,className="", error}: InputProps<T>) {

    const textArea = register(label, {...options, onChange: (event) => {
      resizeTextArea(event)
    }});

  const resizeTextArea = (e: any) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

    return (
          <div className="mt-5 w-full flex flex-col items-center">
            <label className="text-xs text-slate-500 flex gap-1 self-start" htmlFor={label}>{options?.required&&<FaStarOfLife style={{width:"7px",}} />}{placeholder}</label>
            <textarea id={label} {...textArea}  rows={rows} placeholder={placeholder} className={ `w-full ${className?className:"overflow-y-hidden"} text-base py-2 px-6 text-custom_black-200
            transition-all self-start duration-300 ease-in resize-none border-solid focus:outline-custom_orange-900 border-custom_orange-100 border rounded-xl bg-white`}></textarea>
            <CustomInputError msg={error?.message} />
          </div>
        );
}

export default CustomTextArea;