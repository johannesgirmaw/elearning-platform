import { useEffect, useState } from "react";
import useCourseProgressService, { UserCourseProgressSearchModel } from "./CourseProgres";
import { usePagination } from "../../customs/pagination/usePagination";
import { Progress, Table, TableColumnsType } from "antd";
import { CourseProgress, UserQuizeResultsType } from "../../../types/Course";
import useQuestionService from "../question/QuestionService";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft, FaBackward } from "react-icons/fa";


const UserCourseResultDetail = () => {
    const questionService = useQuestionService()
    const navigator = useNavigate();
    const [courseResultDetail, setCourseResultDetail] = useState<UserQuizeResultsType[]>([])
    const params  = useParams()
    useEffect(() => {
        searchCourseResultDetail()
    },[])

    const searchCourseResultDetail = () => {
        questionService.getQuizeResults({course: params.course_id, user: params.user_id}).then(({data: response}) => {
            setCourseResultDetail(response.results)
        })
    }

    const columns: TableColumnsType<UserQuizeResultsType> = [
        {
          title: "Content",
          dataIndex: "content_title",
          key: "content",
          // sorter: (a, b) => a - b,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "Chapter",
          dataIndex: "chapter_title",
          key: "content",
          // sorter: (a, b) => a - b,
          // sortDirections: ["descend", "ascend"],
        },
        {
            title: "Result",
            dataIndex: "result",
            key: "percent",
            // sorter: (a, b) => a - b,
            // sortDirections: ["descend", "ascend"],
            render: (_, {result, total}) => <span>{result}/{total}({(result * 100 / total).toFixed(2)})</span>
          },
    ]
      

    return <>
   
   <div className="px-3 w-full pt-5 lg:w-3/5">
        <h1  className="text-2xl py-2 px-1 flex items-center gap-2 font-bold text-center"> 
          <FaArrowCircleLeft size={(28)}  onClick={() => {console.log("hello"); navigator(-1);}} /> 
          <span>{params.user_name}'s Results.</span> 
        </h1> 
      <Table columns={columns} dataSource={courseResultDetail}  /> 
    </div>
    </>
}

export default UserCourseResultDetail;