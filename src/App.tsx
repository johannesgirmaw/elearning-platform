import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './App.css';
import Login from './pages/account/Login';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Register from './pages/account/Register';
import ResetPassword from './pages/account/ResetPassword';
import About from './pages/commons/About';
import FAQ from './pages/commons/FAQ';
import CourseDetail from './pages/course/CourseDetail';
import Homepage from './pages/home/Homepage';
import ErrorNotFoundPage from './pages/commons/404Page';
import InstructorDashboard from './pages/course/InstructorDashboard';
import CoursesList from './components/courses/Instructer/CourseList';
import Overview from './components/courses/Instructer/Overview';
import Video from './pages/course/Video';
import CourseDetailInstructor from './pages/course/CourseDetailInstructor';
import Toasts from './components/customs/toast/ToastList';
import CategoryContainer from './pages/course/Category';
import UserPermissionList from './components/account/user/UserPermissionList';
import Profile from "./pages/course/ProfileInstructor";
import UsersList from './components/account/user/UserList';
import GroupPermissionList from './components/account/group/GroupPermissionList';
import GroupList from './components/account/group/GroupList';
import { useEffect } from 'react';
import useAuthentication from './components/account/auth/authentication';
import InstructorRegister from './pages/course/InstructorRegister';
import InstructerReview from './components/commons/Reviewers/InstructorReview';
import ToBeInstructorRequestList from './components/courses/tobe-instructor-request/ToBeInstructorRequestList';
import TutorDetail from './pages/tutor/TutorDetail';
import Tutor from './pages/tutor/TutorLists';
import TutorInfoDetail from './components/tutors/tutor/TutorInfoDetail';
import TutorInfoInstructorList from './components/tutors/tutor/TutorInfoInstructorList';
import Learning from './pages/course/Learning';
import ETutorContractList from './components/tutors/etutorContract/ETutorContractList';
import CourseListAdmin from './components/courses/Instructer/CourseListAdmin';
import ContentView from './pages/course/ContentsView';
import Location from './pages/tutor/Location';
import BanksList from './components/tutors/bank/BankList';
import AttendanceList from './components/tutors/attendance/AttendanceList';
import { UserType } from './types/Enums';
import "react-big-calendar/lib/css/react-big-calendar.css";
import UserCourseResultDetail from './components/courses/course/UserCourseResultDetail';
import TutorContractTab from './components/tutors/etutorContract/EtutorContractTab';
import Payments from './pages/tutor/Payments';
import { FileList } from './components/commons/file/FileList';
import SubjectPage from './pages/tutor/Subject';
import AdvertsList from './components/tutors/advert/AdvertList';
import useLoading from './components/customs/loading/LoadingHook';
import Loading from './components/customs/loading/Loading';
import EnrolledCourses from './pages/course/EnrolledCourses';

const router = createBrowserRouter(
  
  [
  {
    path: '/',
    element:<Homepage />   
  },
  {
    path: '/reset_request',
    element: <ResetPassword isRequest={true} />,
  },
  {
    path: '/emailconfirm/reset/password/:uuid/:token/:code',
    element: <ResetPassword isRequest={false} />,
  },
  {
    path: '/password/reset/:uuid/:token',
    element: <ResetPassword isRequest={false} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/student_register',
    element: <Register />,
  },
    {
    path: '/instructor_register',
    element: <InstructorRegister user_type={UserType.INSTRUCTOR}/>,
  },
  {
    path: '/tutor_register',
    element: <InstructorRegister user_type={UserType.TUTOR}/>,
  },
  {
    path: '/verify_email/:code',
    // element: <EmailVerificationCode />,
    element:<Login />
  },
  {
    path: '/about',
    element: <About />,
  },

  {
    path: '/portal',
    element: <Learning />,
    children:[
      {
        path: ':id',
        element: (
           <TutorContractTab />
        ),
      },
    ]
  },
  
  {
    path: '/faq',
    element: <FAQ />,
  },
  {
    path: '/course_detail/:id',
    element: (
      <CourseDetail />
      ),
  },
  {
    path: '/tutors',
    element: (
       <Tutor />
    ),
  },
  {
    path: '/tutors/:id',
    element: (
       <TutorDetail />
    ),
  },
  {
    path: 'tutor_contract',
    element: (
       <ETutorContractList />
    ),
  },

 
  {
    path: '/instructor_dashboard',
    element: (
              <InstructorDashboard />  
    ),
    children: [

      {
        path:'', element:(
           
          <Navigate replace to='profile' />
         
        )
      },
      {
        path: 'courses',
        element: (
           <CoursesList />
        ),
      },
      {
        path: 'payments',
        element: (
           <Payments />
        ),
      },
      {
        path: 'file',
        element: (
           <FileList />
        ),
      },
      {
        path: 'courses/:id',
        element: (
          <CourseDetailInstructor />
          ),
      },
      {
        path: 'courses/:course_id/:user_name/:user_id',
        element: (<UserCourseResultDetail  />),
      },
      {
        path: 'courses/:id/reviews',
        element: (
          <InstructerReview />
          ),
      },
      {
        path: 'tobe_instructor_request',
        element: (
            <ToBeInstructorRequestList />
        ),
      },     
      {
        path: 'tobe_tutor_request',
        element: (
            <TutorInfoInstructorList />
        ),
      },    
      {
        path: 'course_publish',
        element: (
            <CourseListAdmin />
        ),
      }, 
         
      {
        path: 'course_publish/:id',
        element: (
            <ContentView />
        ),
      }, 
      {
        path: 'tobe_tutor_request_detail/:id',
        element: (
            <TutorInfoDetail />
        ),
      },      
      {
        path: 'profile',
        element: (
          <Profile userId=''/>
        ),
      },
      {
        path: 'overview',
        element: (
           <Overview />       
        ),
      },

      {
        path: 'user_permission_list',
        element: (
           <UserPermissionList  />
        ),
      },
      {
        path: 'user_list',
        element: (
           <UsersList />
        ),
      },
      {
        path: 'advert_list',
        element: (
           <AdvertsList />
        ),
      },
      {
        path: 'bank_list',
        element: (
           <BanksList />
        ),
      },
      {
        path: 'tutor_contract',
        element: (
           <ETutorContractList />
        ),
      },
      {
        path: 'tutor_contract/:id',
        element: (
           <TutorContractTab />
        ),
      },
      {
        path: 'group_permission_list',
        element: (
           <GroupPermissionList />
        ),
      },
      {
        path: 'group_list',
        element: (
           <GroupList />
        ),
      },
      {
        path: 'category',
        element: (
           <CategoryContainer /> 
        ),
      },
       {
        path: 'enrolled_course',
        element: (
           <EnrolledCourses />
        ),
      },
      {
        path: 'location',
        element: (
           <Location />
        ),
      },
      {
        path: 'subject',
        element: (
           <SubjectPage />
        ),
      },
      {
        path: 'attendance',
        element: (
           <AttendanceList />
        ),
      },
    ],
  },
  {
    path: 'courses', 
    element: <Homepage />

  },
  {
    path: '/course_detail/:id/contents',
    element: (
     <Video />
     ),
  },
  {
    path: '*',
    element: <ErrorNotFoundPage />,
  },
]
);

function App() {
  const authentication = useAuthentication()
  const loading = useLoading(true);
  useEffect(() => {
    loading.startLoading();
    authentication.requireLogin()?.then(loading.stopLoading).catch(loading.stopLoading) || loading.stopLoading() ; 
  }, []);

  return (
     
     <>
      <Toasts />
        <Loading   {...loading}  >
          <RouterProvider router={router} />
        </Loading>
    </>
     )
}

export default App;
