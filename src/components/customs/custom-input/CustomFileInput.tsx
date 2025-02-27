



import React, { useRef, useState } from "react";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { InputProps } from "../../../types/InputTypeProp";
import CustomInputError from "../custom-input-error/CustomInputError";
import { ContentType, FileTypes } from "../../../types/Enums";
import { FaStarOfLife } from "react-icons/fa";




function CustomFileInput<T extends FieldValues>({fileType = 103,label, placeholder, register, options, error}: InputProps<T>){

  const [value, setValue] = useState<FileList>()
  const [validationError, setValidationError] = useState("")
  

  const validate = (file:FileList, fileSize:number)=>{
        if(file[0].size < fileSize) {
          return true
        }else{
          setValidationError(`File size should be less than ${ fileSize/(1024*1024) }MB`)
        }
   }

  const contentSizeValidation = (file:FileList) => {
    if (file) {
      let fileSize = null
      if(ContentType.VIDEO==fileType){
        fileSize = 20*1024*1024
        return validate(file, fileSize)
      }
      else if (ContentType.IMAGE===fileType){
        fileSize = 2*1024*1024
        return validate(file, fileSize)
      }
      else if (ContentType.DOCUMENT ===fileType){
        fileSize = 5*1024*1024
        return validate(file, fileSize)
      }
    }
  }

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files
  if (file) {
    if(contentSizeValidation(file))setValue(file)
  };

  }


  return (
    <>
      <h1 className="flex gap-1 text-xs text-slate-500">{options?.required&&<FaStarOfLife style={{width:"7px",}} />}{placeholder}</h1>
      <div className="flex items-center justify-center w-full mt-3">
        <label
          className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {
            value ? (fileType === ContentType.IMAGE 
                  ? <img className="h-full max-w-full" src={URL.createObjectURL(value[0])} alt="preview image" /> 
                  : <div>{value[0]?.name.slice(0, 32)}</div>)
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
                      </div>
          }
          <input
            {...register(label, {...options, onChange: (e) => handleFile(e)})}
            type="file"
            className="hidden"
            accept={FileTypes[fileType]}
          />
        </label>
      </div>
      
     {!value && <CustomInputError msg={validationError?validationError:error?.message} />}
    </>
  );
}

export default CustomFileInput;







