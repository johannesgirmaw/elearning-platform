import React from 'react';
import CustomInputError from '../custom-input-error/CustomInputError';
import { FieldValues } from 'react-hook-form';
import { InputProps } from '../../../types/InputTypeProp';
import { FaStarOfLife } from 'react-icons/fa';

function CustomCheckbox<T extends FieldValues>({ onValueChange, type = 'checkbox', label, data, val, id, placeholder, register, options, error}: InputProps<T>) {
  const {onChange} = register(label, options)
  const handleOnChange = (e:any) => {
    onValueChange && onValueChange(e)
    onChange(e)
  }
  return (
    <>
      <h1 className="text-xs text-slate-500 flex gap-1">{options?.required&&<FaStarOfLife style={{width:"7px",}} />}
       {/* {placeholder} */}
       </h1>
    <div className="flex flex-row space-x-5">
      <input
        type={type} {...register(label, options)} placeholder={placeholder} 
        className="hover:bg-custom_orange-800 border-custom_orange-700 "
        onChange={handleOnChange}

      />
      <label htmlFor="Can view">{placeholder}</label>
    </div>
    {error && <CustomInputError msg={error?.message} />}
    </>
  );
}

export default CustomCheckbox;
