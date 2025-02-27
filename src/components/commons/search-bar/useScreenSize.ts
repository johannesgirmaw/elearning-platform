
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import { setSize }  from "../../../slicers/user"



const useScreenSize = () => {
    const disptch = useDispatch()
	const user = useSelector((state: RootState) => state.user);
    const [isMobile, setIsMobile] = useState<boolean>(user.isMobile)

    const checkIfMobile = () => {
		disptch(setSize(window.innerWidth <= 768));
        setIsMobile(window.innerWidth <= 768) 
		window.addEventListener('resize', checkIfMobile);
		return () => window.removeEventListener('resize', checkIfMobile);
    };
    useEffect(()=> {
      checkIfMobile();
      if(user.isMobile === undefined){     
        setIsMobile(window.innerWidth <= 768) 
      }else{
        setIsMobile(user.isMobile)
      }  

    },[])

    return {checkIfMobile, isMobile}
}

export default useScreenSize
