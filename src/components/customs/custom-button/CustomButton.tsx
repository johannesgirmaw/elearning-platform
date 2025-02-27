import { ReactNode, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(["relative", "overflow-hidden", "w-full", "cursor-pointer", "mt-5", "leading-[3.75rem]", "rounded-xl", "text-sm", "sm:text-lg", "py-2", "font-medium", "transition-all", "duration-300", "ease-in", "inline-block", "px-4", "whitespace-nowrap"], {
  variants: {
    form: {
      '': [
        "text-white",
        "bg-custom_orange-900",
        "border-custom_orange-900",
        "disabled:cursor-not-allowed",
        "disabled:opacity-75",
        "hover:opacity-75" 
      ],
      transparent: [
        "bg-custom_light_green",
        "text-custom_orange-900",
        "hover:text-white",
        "hover:bg-custom_orange-900",
      ],
      edge: [
        "bg-white",
        "font-normal",
        "hover:border",
        "hover:text-custom_orange-900",
        "hover:border-custom_orange-900"
      ],
      "edge-transparent": [
        "bg-white",
        "font-normal",
        "hover:border",
        "hover:text-white",
        "hover:bg-custom_orange-900"
      ]
    },
  },
  defaultVariants: {
    form: "",
  },
})

export class InputProps {
  text:string | ReactNode;
  type?: "button" | "reset" | "submit" | undefined;
  disabled?:boolean;
  fun?:()=>void;
  is_loading?:JSX.Element;
  className?:string;
}

function CustomButton(props: InputProps & VariantProps<typeof buttonStyles>) {
  const {
    text,
    form = '',
    type = "button",
    disabled = false,
    fun = () => {},
    is_loading=undefined,
    className,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const onClick = ()=>{
    fun()
    setIsLoading(true)
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={twMerge(buttonStyles({ form }), className)}
    >
      <div className="flex items-center justify-center">
        {isLoading&&<div className="">{is_loading}</div>}
        <div>{text}</div>
      </div>
    </button>
  );
}

export default CustomButton;
