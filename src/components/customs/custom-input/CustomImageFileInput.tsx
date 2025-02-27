import React, { useRef, useState, useEffect } from "react";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { InputProps } from "../../../types/InputTypeProp";
import CustomInputError from "../custom-input-error/CustomInputError";
import { FileTypes } from "../../../types/Enums";
import { FaStarOfLife } from "react-icons/fa";

function CustomImageFileInput<T extends FieldValues>({fileType = 101,label, placeholder, register, options,val = null, error}: InputProps<T>){

  const [value, setValue] = useState<FileList>()
  const [validateError, setValidationError] = useState("")

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError('')
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (!/^image\//.test(selectedFile.type)) {
        setValidationError('Selected file is not an image.')
        return;
      }
      setValue(event.target.files)
    }
  };

  return (
    <>
        <h1 className="flex space-x-2 text-xs text-slate-500">{options?.required&&<FaStarOfLife style={{width:"7px",}} />}{placeholder}</h1>

    <div className="flex items-center justify-center my-3">
      
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {value  ? (
        <img  src={value[0]&&URL.createObjectURL(value[0])} alt="No Image uploaded" className="h-20 max-w-20" />
       ) : (val !==null ? <img className="h-20 max-w-20" src={val} alt="No Image uploaded" />
       : <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload {placeholder}</span>
          </p>
        </div>)}
       
        {val !==null?<input
          {...register(label, { onChange: (e) => handleFile(e)})}
          id="dropzone-file"
          type="file"
          className="hidden"
          accept={FileTypes[fileType]}
          placeholder={placeholder}
        />:<input
          {...register(label, {...options, onChange: (e) => handleFile(e)})}
          id="dropzone-file"
          type="file"
          className="hidden"
          accept={FileTypes[fileType]}
          placeholder={placeholder}
        />}
      </label>
    </div>
    <CustomInputError msg={validateError?validateError:error?.message} />
    </>
  );
}

export default CustomImageFileInput;
