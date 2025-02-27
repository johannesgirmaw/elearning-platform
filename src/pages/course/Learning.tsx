import { Tabs, TabsProps } from "antd";
import Footer from "../../components/layout/footer/Footer";
import AllCourses from "../../components/courses/learning/AllCourses";
import ProfileDetail from "../../components/account/profile/ProfileDetail";
import { useEffect, useRef } from "react";
import ETutorContractList from "../../components/tutors/etutorContract/ETutorContractList";
import { Outlet } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Header from "../../components/layout/header/Header";


const Learning = () => {
  const myRef = useRef(null);
  const onChange = (key: string) => {
    console.log(key);
  };
  const {id} =useParams();

  useEffect(() => {
    const element = document.getElementsByClassName(window.location.hash ? window.location.hash.slice(1) : "")?.[0];
    element?.scroll({top:0, behavior: 'smooth' })
  },[window.location.hash]);

  const items: TabsProps["items"] = [
    {
      key: "profile",
      label: "My Profile",
      children: <ProfileDetail />,
    },
    {
      key: "my_course",
      label: "My Course",
      children: <AllCourses />,
    },
    {
      key: "my_tutor",
      label: "My Tutor",
      children: <ETutorContractList/>,
    },
  ];


  return (
    <>
      <Header title="Learning" activeTab="learning" />
      <div className="pt-4 my_course my_tutor min-h-[700px]" id="portal">
        <h1 className="py-6 text-3xl font-bold text-center text-white bg-custom_orange-700">My Protal</h1>
     {
      !id  && <Tabs className="flex flex-wrap items-center w-full learning" defaultActiveKey={window.location.hash.slice(1)} 
      items={items} onChange={onChange}  />
     }
        <Outlet  />
      </div>
     
      <Footer />
    </>
  );
};

export default Learning;
