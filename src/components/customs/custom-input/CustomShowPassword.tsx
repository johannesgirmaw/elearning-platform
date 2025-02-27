import { useState } from "react";
export interface Props {
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    isVisible:boolean,
    className?:string,
}
const CustomShowPassword = ({isVisible, className, setIsVisible}:Props) => {

    const handleToggleVisibility = () => {
      setIsVisible(!isVisible);
    };
    return(
        <label htmlFor="show-password" className={"felx space-x-1 text-custom_orange-900 " + className}>
            <input
            type="checkbox"
            id="show-password"
            checked={isVisible}
            style={{marginRight: '10px'}}
            onChange={handleToggleVisibility}
            />
            Show password
        </label>
    )
}


export default CustomShowPassword