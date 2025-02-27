import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTranslation from "../../../utils/translation";
import useToast from "../../customs/toast/ToastHook";
import { UserType } from "../../../types/Enums";
import type { TabsProps } from 'antd';
import EducationBackgroundList from "../educational-background/EducationalBackgroundList";
import ExperienceList from "../experience/ExperienceList";
import ToBeInstructorRequestList from "../../courses/tobe-instructor-request/ToBeInstructorRequestList";
import { Button, Steps, Tabs, theme, Tooltip } from 'antd';
import TutorAdd from "../../tutors/tutor/TutorAdd";
import InstructorBasicInfo from "../../courses/tobe-instructor-request/InstructorBasicInfo";
import { useSelector } from "react-redux";
import { RootState } from "../../../slicers/store";
import StudentToBeInstructorBasicInfo from "../../courses/tobe-instructor-request/StudentTobeInstructorBasicInfo";
import CustomButton from "../../customs/custom-button/CustomButton";
import { FaAddressCard, FaBookOpen, FaChalkboard, FaChalkboardTeacher, FaRegRegistered, FaRegSquare, FaRegTired, FaRegUser, FaRegistered, FaSchool } from "react-icons/fa";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { LocalStorage } from "../../../utils/localstorage";
import { UserContext } from "./InstructorUser";
import useAuthentication from "./authentication";
import useLoading from "../../customs/loading/LoadingHook";
import SmallLoading from "../../customs/loading/SmallLoading";

export interface Props{
    user_type:keyof typeof UserType,
    setUserId:React.Dispatch<React.SetStateAction<string>>
}

function InstructorUserRegister(props:Props) {
    const [key, setKey] = useState("1")
    const loading = useLoading()
    const {translate} = useTranslation()
    const toast = useToast()
    const [current, setCurrent] = useState(0);
    const [previous, setPrevious] = useState(0);
    const user = useSelector((state: RootState) => state.user)
    const { userId } = useContext(UserContext)
    const authentication = useAuthentication()
    const [loadingComponent, setLoadingComponent] = useState<JSX.Element>();
    const [loadingGoogleComponent, setLoadingGoogleComponent] = useState<JSX.Element>();
    
    const handleRegisterOnclick = () => {
        setLoadingComponent(<SmallLoading {...loading} />)
    }


    const onChange = (key: string) => {
        setKey(key)
        setCurrent(0)
      };
   
      useEffect(() =>{
        getTabKey()
      },[])

      const navigate = useNavigate();

      const getTabKey = () =>{
        const localstorage = new LocalStorage();
        const current_url = window.location.pathname;
        props.setUserId(localStorage.getItem("userId")!);
        if(current_url === "/instructor_register"){
          const tab_key = localstorage.getValueAndRemove("instructorrequest_tab_key");
          tab_key && (setCurrent(parseInt(tab_key!)));
          tab_key && setPrevious(parseInt(tab_key!)-1);;
        }else{
          const tab_key = localstorage.getValueAndRemove("tutorrequest_tab_key");
          tab_key && setCurrent(parseInt(tab_key!));
          tab_key && setPrevious(parseInt(tab_key!)-1);;
        }
      }
  
      const setKeyValue = () => {
        const localstorage = new LocalStorage();
        const current_url = window.location.pathname;
        
        if(current_url === "/instructor_register"){
          localstorage.setKeyValue('instructorrequest', current_url);
          localstorage.setKeyValue('instructorrequest_tab_key', (current).toString());
        }else{
          localstorage.setKeyValue('tutorrequest', current_url);
          localstorage.setKeyValue('tutorrequest_tab_key', (current).toString());
        }
      }
   const steps = [
        {
          key: '1',
          title: 'BASIC INFO*',
          children: (<InstructorBasicInfo setCurrent={setCurrent} setKeyValue={setKeyValue} setUserId={props.setUserId} />),
          icon:<Tooltip placement='bottom' title="Basic Info" ><FaRegUser /></Tooltip>},
          {
            key: '2',
            title: 'TUTOR REQUEST*',
            children: <TutorAdd searchDatas={handleRegisterOnclick}/>,
            visible: props.user_type === "TUTOR" && authentication.isLoggedIn(),
            icon:<Tooltip placement='bottom' title="TUTOR REQUEST" ><FaChalkboardTeacher/></Tooltip>
        },
        {
          key: '3',
          title: 'SUBMITT REQUEST*',
          children: <ToBeInstructorRequestList navigateTo={"/login"}/>,
          visible : props.user_type === "INSTRUCTOR" && authentication.isLoggedIn(),
          icon:<Tooltip placement='bottom' title="SUBMITT REQUEST" ><FaChalkboard /></Tooltip>,
        },
        {
          key: '4',
          title:  'EDUCATION BACKGROUND',
          children: <EducationBackgroundList setEducationalBackgroundData={handleRegisterOnclick}/>,
          visible:authentication.isLoggedIn(),
          icon:<Tooltip placement='bottom' title="EDUCATION BACKGROUND" ><FaSchool /></Tooltip>
        },
        {
          key: '5',
          title: 'WORK EXPERIENCE',
          children: <ExperienceList setExperienceData={handleRegisterOnclick}/>,
          visible:authentication.isLoggedIn(),
          icon:<Tooltip placement='bottom' title="WORK EXPERIENCE" ><FaAddressCard /></Tooltip>
        },
        
        
      ];


    const next = () => {
      setKeyValue()
      setCurrent(current + 1);
    };

    const prev = () => {
        setPrevious(current)
        setCurrent(current - 1);
      }; 

    const done = () => {
      setCurrent(3); 
      if(user){
        navigate(-1)
      }else{
        navigate("/login")
        toast.info("Please Check your email to verify it and login!"); 
      }
    }

    const item = steps.filter(value => value.visible === undefined || value.visible).map((item) => (
        { title:  <span className="max-md:hidden"> {item.title} </span>, content:item.children, icon: item.icon}));
    
    const tab = 
    (
      <>
        <Steps current={current} items={item} direction={"horizontal"} className={`transition mx-5 md:ml-0 flex flex-wrap delay-150 ${current !== 0 ? 'opacity-100' : ''}`}/>
          <div className="p-2 ">Note: <span className="font-thin">Names with ( * ) are mandatory</span></div>
          <div className={`md:hidden text-custom_orange-900 flex justify-center`}> <p>{steps[current]?.title}</p></div>
          <div className="container flex flex-col">
              <div className="flex flex-row justify-between">
                  <div className="flex justify-between" style={{ marginTop: 20 }}>
                      {authentication.isLoggedIn()&& current > 0 && (
                        <CustomButton text="Previous" fun={() => prev()}  className="custom-button"/>
                      )}
                  </div>
                  {authentication.isLoggedIn()&&<div className="flex justify-center" style={{ marginTop: 20 }}>
                      {
                        (current >= item.length - 1 ) && !user.id?
                        <CustomButton text={"Done"} fun={() =>done()}   className="custom-button"/>
                        :(current < item.length-1 && current>=0 || previous===1) && 
                        <CustomButton text="Next" fun={() => next() }  className="custom-button" />
                      }
                  </div>}
              </div>
              <div>
                  {item[current]?.content}
              </div>
          </div> 
      </>  
    )

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: <span className="text-xl">{"Instructor Request"}</span>,
          children: tab,
        },
        {
            key: '2',
            label: <span className="text-xl">{'Tutor Request'}</span>,
            children: tab,
          },
      ];

    return <div className="max-w-5xl">
            {/* <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} destroyInactiveTabPane /> */}
            {tab}
           </div>;

}
export default InstructorUserRegister;

