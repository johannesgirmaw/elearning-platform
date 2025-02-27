import React from 'react'
import { User } from '../../../types/UserItem'

export const Instructor = (props:{instructors:[]|undefined}) => {
  return (
    <div className="tab-pane fade active show" id="instructors">

    {/* <!-- Tab Instructors Start --> */}
    <div className="mb-6">
        <h3 className="text-2xl font-medium text-custom_black-200 mb-0 ml-5">Course Instructor(s)</h3>

        <div className="flex flex-wrap ">
            {props.instructors?.map((instructor)=>(
                <div className="w-1/2 md:w-1/4">
                {/* <!-- Single Team Start --> */}
               <div className="mt-9 text-center">
                    <div className=" flex justify-center align-center ">
                        <img src={instructor["profile_picture"]}
                              className="rounded-[50%] p-3 border-2 border-custom_orange-700 transition ease-in-out delay-150 hover:border-custom_orange-900 w-40 h-40"
                         alt="Author"/>
                    </div>
                    <div className="pt-4">
                        <div className="flex justify-center items-center">                                                    
                        </div>
                        <h4 className="text-lg font-medium mb-0">{instructor["first_name"]} {instructor["middle_name"]}</h4>
                        <span className="text-sm  mt-3 block transition ease-in-out delay-150 ">{instructor["bio"]}</span>
                    </div>
                </div>
                {/* <!-- Single Team End --> */}
            </div>
            ))}
            

        </div>

    </div>
    {/* <!-- Tab Instructors End --> */}

</div>
  )
}
