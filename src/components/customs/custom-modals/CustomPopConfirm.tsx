import { Popconfirm, message } from "antd"
import { ToBeInstructorRequest } from "../../courses/tobe-instructor-request/ToBeInstructorRequestModel"
import { FaEdit, FaTimesCircle } from "react-icons/fa";

export interface Props{
    func:() => void,
    editFun?:(value: boolean) => void,
    visible?: boolean
}

const CustomPopConfirm = ({editFun, func, visible}:Props) => {
    const confirm = (e?: React.MouseEvent<HTMLElement>) => {
        e?.stopPropagation();
        func();
      };
    
      const cancel = (e?: React.MouseEvent<HTMLElement>) => {
        e?.stopPropagation();
        message.info('Cancelled');
      };
    
    return (
        <div className="absolute top-1 right-1 group-hover:flex hidden">
             {editFun && <button type="button"
                        className={`text-custom_orange-700 bg-transparent
                        hover:bg-custom_orange-800 hover:text-gray-900 rounded-lg 
                        text-sm p-1.5 ml-auto  items-center dark:hover:bg-gray-600
                        dark:hover:text-white md:${visible? '' : 'hidden'}`} onClick={(event) =>  {event.stopPropagation(); editFun(true);}} >
                 
                         <FaEdit />
                            <span className="sr-only">Edit modal</span>
                        </button>}
        <Popconfirm
            title="Delete the Data"
            description="Are you sure to delete this data?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            style={{color:'gray', marginRight:10}}
            className=""
        >

            <button type="button"
        className="text-custom_orange-700 bg-transparent  
        hover:bg-custom_orange-900 hover:text-white hover:rounded-full border
        text-lg p-1 rounded-full  dark:hover:bg-gray-600 " 
        onClick={(e) => e.stopPropagation()} 
        >
        <FaTimesCircle />
            <span className="sr-only">Close modal</span>
        </button>
        </Popconfirm>
        </div>
    )
}

export default CustomPopConfirm