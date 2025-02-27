import { useState } from "react";
import { Link } from "react-router-dom";

function LinkGenerator(props: { name: string, url:string }) {
  // const [activeLink,setActiveLink]=useState("courses")
  return (
    
    <Link
          to={props.url}
          className="active:pl-10 hover:font-medium hover:bg-white hover:pl-10 active:font-medium active:bg-white xl:text-sm block h-12  rounded-lg pr-12 pl-5
      border-solid border border-custom_orange-700 bg-custom_orange-200 text-left relative text-base font-normal whitespace-nowrap transition-all duration-300 ease-in
      active:before:opacity-100 active:before:visible before:absolute before:w-2 before:h-2 before:rounded-full before:bg-custom_orange-900 before:top-1/2
      before:-translate-y-1/2 before:left-5 before:opacity-0 before:invisible before:transition-all before:duration-300 before:ease-in hover:before:opacity-100
      hover:before:visible leading-[48px] xl:leading-[48px] mb-5 text-custom_black-500 w-full"
      //  onClick={()=>setActiveLink("overview")}
        >
          {props.name}
        </Link>

      
  );
  }

  export default LinkGenerator