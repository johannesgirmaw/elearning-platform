import { HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldValues, UseFormRegister, RegisterOptions, FieldError, Path, UseFormReturn } from "react-hook-form";
import { SelectItem } from "./MenuItems";
import { FileTypes } from "./Enums";

export interface InputProps<T extends FieldValues> extends Partial<UseFormReturn<T, any>>{
  type?: HTMLInputTypeAttribute
  label: Path<T>;
  register: UseFormRegister<T>;
  placeholder: string;
  imagePlaceHolder?: ReactNode,
  options?: RegisterOptions<T, Path<T>>
  error?: FieldError,
  rows?: number,
  suffix?:any,
  prefix?:any,
  val?:any,
  id?: any,
  data?: SelectItem<string | number>[]
  isSearchable?: boolean
  className?: string
  isDisable?: boolean
  key?:any;
  isClearable?: boolean
  fileType?:  keyof typeof FileTypes
  onInputChange?: (newValue: string) => void
  onValueChange?: (value: any) => void
  onChange?: (value:any) => void,
  multiple?: boolean,
  file_id?: Path<T>;
} ;