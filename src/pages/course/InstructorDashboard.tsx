import DashboardHeader from '../../components/commons/dashboard-header/DashboardHeader';
import DashboardSidebar from '../../components/commons/dashboard-sidebar/DashboardSidebar';
import CoursesList from '../../components/courses/Instructer/CourseList';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useDashboardMenuService from '../../components/commons/dashboard-sidebar/dashboardMenuItems';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../slicers/store';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.random() * 1000),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

function InstructorDashboard() {
  const [pathname, setPathName] = useState('');
  const [title, setTitle] = useState("")
  const dashboardMenuService = useDashboardMenuService();
  const navigate = useNavigate()
  const userDetail = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if(!(userDetail.is_staff || userDetail.is_superuser)){
      navigate(-1)
    }
  }, [window.location.pathname,]);
  
  return (
     <div className='sm:hidden-body'>
     <div className='flex flex-col h-screen'>
    <DashboardHeader title={title} />
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar />
        {dashboardMenuService.visibleMenuList && 
        <div className='w-full bg-gray-400 ' style={{zIndex:5}}  onClick={() => dashboardMenuService.setVisibleMenuList(false)}></div>} 
          <div className={`${dashboardMenuService.visibleMenuList ? 'hidden' : 'block'} flex-1 md:block overflow-y-auto w-full ml-0`}>
            <Outlet context={ {setTitle, dashboardMenuService} } />
            {(pathname === '/instructor_dashboard/' || pathname === '/instructor_dashboard')  && <CoursesList />}
          </div>
      </div>
    </div>
     
    </div>
  );
}
export default InstructorDashboard;
