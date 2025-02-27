import useTranslation from "../../../utils/translation";

function Overview(){  
    const {translate} = useTranslation()
    function LinkGenerator(props: { name: string }) {
        return (
          <a
            href="/"
            className="active:pl-10 hover:font-medium hover:bg-white hover:pl-10 active:font-medium active:bg-white xl:w-56 xl:text-sm block h-12  rounded-lg pr-12 pl-5
          border-solid border border-custom_orange-700 bg-custom_orange-200 text-left relative text-base font-normal whitespace-nowrap transition-all duration-300 ease-in
          active:before:opacity-100 active:before:visible before:absolute before:w-2 before:h-2 before:rounded-full before:bg-custom_orange-900 before:top-1/2
          before:-translate-y-1/2 before:left-5 before:opacity-0 before:invisible before:transition-all before:duration-300 before:ease-in hover:before:opacity-100
          hover:before:visible leading-[48px] xl:leading-[48px] mt-5 text-custom_black-500 w-full"
          >
            {props.name}
          </a>
        );
      }
    return<>
    <div className="py-0 md:pl-24 relative ">
          <div className="py-10 px-7 bg-custom_orange-100  lg:absolute lg:top-0 lg:left-24 lg:h-full flex flex-col ">
            <LinkGenerator name="Overview" />
            <LinkGenerator name="Student's" />
            <LinkGenerator name="Review's" />
            <LinkGenerator name="Course Engagment" />
            <LinkGenerator name="Traffic & Conversion" />
          </div>
          <div className="pt-10 pb-20  lg:pl-72 container mx-auto">
            <div className="flex items-center justify-between flex-wrap">
              <div className="pt-5">
                <select name="courses" id="courses" className="hidden">
                  <option data-display="All Courses">{translate('all_courses')}</option>
                  <option value="1">Option</option>
                  <option value="2">Option</option>
                  <option value="3">Option</option>
                  <option value="4">Potato</option>
                </select>
                <div
                  className="float-none inline-block pl-12 pr-7 h-14 leading-[56px] rounded-lg cursor-pointer border border-solid border-custom_orange-200
                    font-medium text-xl text-custom_black-200 relative whitespace-nowrap"
                >
                  <span>{translate('all_courses')}</span>
                </div>
              </div>

              <div className="flex mx-5 lg:mx-2 flex-wrap ">
                <div className="bg-custom_orange-700 mt-5 lg:mx-2 mx-5 w-full md:w-44 py-4 lg:px-5 rounded-lg px-7">
                  <h5 className="text-base font-normal text-custom_black-200 mb-0">
                    Total Revenue
                  </h5>
                  <div className="text-blue-600 font-medium mt-1 text-3xl lg:text-xl">
                    $568.00
                  </div>
                  <p className="font-medium text-custom_black-200 mt-1 text-xs">
                    <span className="text-custom_orange-900">$235.00</span>
                    This months
                  </p>
                </div>
                <div className="bg-custom_orange-700 mt-5 lg:mx-2 mx-5 w-full md:w-44 py-4 lg:px-5 rounded-lg px-7">
                  <h5 className="text-base font-normal text-custom_black-200 mb-0">
                  Total Enrollment’s
                  </h5>
                  <div className="text-custom_orange-900 font-medium mt-1 text-3xl lg:text-xl">
                  2,570
                  </div>
                  <p className="font-medium text-custom_black-200 mt-1 text-xs">
                    <span className="text-custom_orange-900">  345 </span>
                      This months
                  </p>
                </div>
                <div className="bg-red-300 mt-5 lg:mx-2 mx-5 w-full md:w-44 py-4 lg:px-5 rounded-lg px-7">
                  <h5 className="text-base font-normal text-custom_black-200 mb-0">
                  Instgructor Rating
                  </h5>
                  <div className="flex items-center">
                    <p className="ml-2 text-2xl text-yellow-600 font-medium  dark:text-gray-400">4.5</p>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>                
                   </div>
                  <p className="font-medium text-custom_black-200 mt-1 text-xs">
                  <span className="text-custom_orange-900">  58 </span>
                     This months
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 border border-solid border-custom_orange-200 pt-4 pb-6 px-7">
              <div className="flex justify-between items-center">
                <h4 className="font-medium pt-4 mb-0">
                  Get top insights about your performance
                </h4>
              </div>
              <div className="h-96"></div>
            </div>

          </div>
        </div>

    </>
}
export default Overview;