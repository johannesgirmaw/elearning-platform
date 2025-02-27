
import { useState } from 'react'
import { FiClock, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Footer from '../../components/layout/footer/Footer'
import Header from '../../components/layout/header/Header'
function CourseCart() {
  const [activeLink,setActiveLink]=useState("all_courses")
    return (
      <>
       <Header title="" underlined="My Course" activeTab="courses_cart"/>
      <div className='mx-12'> 
      <div className="flex justify-between items-center flex-wrap px-4 pt-4 pb-4 rounded-xl bg-custom_orange-100 my-8">
                    <div className="">
                        <ul className="flex items-center flex-wrap">
                            <li className='px-2 py-3'><button className={`hover:bg-custom_orange-900
                             hover:text-white text-lg px-3 h-14
                              rounded-lg
                              block font-medium ${activeLink==="all_courses"?"bg-custom_orange-900 text-white":"bg-white text-gray-600 "}`} 
                               onClick={()=>setActiveLink("all_courses")}>All Courses</button></li>
                            <li className='px-2 py-3'><button className={`hover:bg-custom_orange-900
                             hover:text-white text-lg px-3 h-14
                               rounded-lg
                                block font-medium ${activeLink==="collections"?"bg-custom_orange-900 text-white":"bg-white text-gray-600 "}`}
                                onClick={()=>setActiveLink("collections")}>Collections</button></li>
                            <li className='px-2 py-3'><button className={`hover:bg-custom_orange-900
                             hover:text-white text-lg px-3 h-14
                               rounded-lg
                                block font-medium ${activeLink==="wishlist"?"bg-custom_orange-900 text-white":"bg-white text-gray-600 "}`}
                                onClick={()=>setActiveLink("wishlist")}>WishList</button></li>
                            <li className='px-2 py-3'><button className={`hover:bg-custom_orange-900
                             hover:text-white text-lg px-3 h-14
                               rounded-lg
                                block font-medium ${activeLink==="archived"?"bg-custom_orange-900 text-white":"bg-white text-gray-600 "}`} 
                               onClick={()=>setActiveLink("archived")}>Archived</button></li>
                           
                        </ul>
                    </div>
                    <div className="flex align-center justify-center">
                        <input className=' text-lg px-3 h-14 text-gray-600 rounded-l-lg bg-white  font-medium focus:border-2 focus:border-custom_orange-900 focus:outline-none'/>
                        <div className='bg-custom_orange-900 px-2 ml-[-5] h-14 rounded-r-lg flex align-center justify-center'>
  
                         <FiSearch size={30} className='self-center' />
                        </div >
                    </div>
                  </div>

                  <div className='flex flex-col my-10'>
                    <Link to="/course_details" className='flex items-center flex-wrap rounded-lg my-3 border-2 border-custom_black-900 px-5 py-2'>

                        <div className='h-[150px] w-[150px] mr-5 p-5 bg-custom_black-900 rounded-lg'>
                           <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="image" />
                        </div>
                      <div className=' flex flex-col'>
                           <span className="text-2xl font-medium">React - The Complete Guide (incl Hooks, React Router, Redux) </span>
                           <span className='mt-2 text-start text-custom_black-700'><b>by</b> Yohannes abera</span>  
                           <span className='mt-2'>
                            <div className="flex items-center mt-[5px] ">
                                <span className='mr-2 text-custom_black-700'>4.5</span>
                                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                  <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>                
                             </div>
                            </span>
                           <span className='flex items-center mt-2 text-start  text-custom_black-700'>
                            <FiClock/> <p className='ml-2 self-center'>3 hours</p> </span>
                      </div>
                    
                    </Link>
                    <Link to="/course_details" className='flex items-center flex-wrap rounded-lg my-3 border-2 border-custom_black-900 px-5 py-2'>

                        <div className='h-[150px] w-[150px] mr-5 p-5 bg-custom_black-900 rounded-lg'>
                           <img src="https://w7.pngwing.com/pngs/159/366/png-transparent-django-python-computer-icons-logo-python-text-label-rectangle.png" alt="image" />
                        </div>
                      <div className=' flex flex-col'>
                           <span className="text-2xl font-medium">Django Advanced Course </span>
                           <span className='mt-2 text-start text-custom_black-700'><b>by</b> Dires Aman</span>  
                           <span className='mt-2'>
                            <div className="flex items-center mt-[5px] ">
                                <span className='mr-2 text-custom_black-700'>4.5</span>
                                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                  <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>                
                             </div>
                            </span>
                           <span className='flex items-center mt-2 text-start  text-custom_black-700'>
                            <FiClock/> <p className='ml-2 self-center'>3 hours</p> </span>
                      </div>
                    
                    </Link>
                  </div>
      </div>
   
     
     <Footer/>
      </>
    )

}

export default CourseCart