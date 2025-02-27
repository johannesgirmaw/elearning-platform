import { useEffect, useState } from "react";
import useCourseProgressService, { UserCourseProgressSearchModel } from "./CourseProgres";
import { usePagination } from "../../customs/pagination/usePagination";
import { Progress, Table, TableColumnsType } from "antd";
import { CourseProgress } from "../../../types/Course";
import { Link } from "react-router-dom";

interface Props {
    course?: string;
}

const UserCourseProgressList = (props: Props) => {
    const courseProgressService = useCourseProgressService();
    const [courseProgressDatas, setCourseProgressDatas] = useState<CourseProgress[]>([])
    const paginator = usePagination<UserCourseProgressSearchModel>({course: props.course, method: "user_course_progress"});
    useEffect(() => {
        searchCourseProgres()
    },[])

    const searchCourseProgres = () => {
        courseProgressService.getUserCourseProgress(paginator.filterData).then(({data:value}) => {
            setCourseProgressDatas(value.results);
        })
    }

    const columns: TableColumnsType<any> = [
        {
          title: "User",
          dataIndex: "user_name",
          key: "user",
          sorter: (a, b) => a.address.length - b.address.length,
          sortDirections: ["descend", "ascend"],
          render: (_, {user_name, user}) => <Link  to={`/instructor_dashboard/courses/${props.course}/${user_name}/${user}`}>{user_name}</Link>
        },
        {
          title: "Exam Result",
          dataIndex: "result",
          key: "result",
          // sorter: (a, b) => a - b,
        //   sortDirections: ["descend", "ascend"],
          render: (_, {result}) => result?.toFixed?.(2)
        },
        {
          title: "Progress(%)",
          dataIndex: "progress",
          key: "progress",
          sorter: (a, b) => a.address.length - b.address.length,
          sortDirections: ["descend", "ascend"],
          render: (_, {progress}) => <Progress  percent={progress} status={progress === 100 ? "success" : "active"} />
        },
    ]
      

    return <>
   
   <div className="px-3 w-full lg:w-3/5">

        <h1  className="text-2xl font-bold text-center">Users Result and Progress on the course.</h1> 
      <Table columns={columns} dataSource={courseProgressDatas}  /> 
    {/* //   onChange={onChange} /> */}
    </div>
    </>
}

export default UserCourseProgressList;