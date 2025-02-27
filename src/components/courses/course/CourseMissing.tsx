import { Card } from "antd"
import { CourseMissingType } from "../../../types/Course"
import { isVisible } from "../../account/auth/authorization"



interface Props {
    data: CourseMissingType

}


const CourseMissing = ({ data }: Props) => {


    return <div className="flex flex-col gap-2 pt-4 min-">
        <div className="text-center font-bold text-custom_orange-700 text-lg">Fix The Following Missed Content </div>
        <Card className={isVisible(data.chap_no_cont.length > 0)}>
            <h1 className="text-base underline font-bold pl-1 sm:pl-10 pb-2">Chapters With No Content </h1>
            <div className="flex gap-2 flex-wrap">

                {data.chap_no_cont.map(value => <span>
                    {value.chapter_name}
                </span>)}
            </div>
        </Card>
        <Card className={isVisible(data.cont_no_ques.length > 0)}>
            <h1 className="text-base underline font-bold pl-1 sm:pl-10 pb-2">Question Contents With No Question</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3">
                <h2 className="font-semibold underline">Chapter</h2> <h2 className="font-semibold underline">Content Title</h2> <div className="hidden sm:block"></div>
                {data.cont_no_ques.map((value, index) => <>
                    <h2>{index + 1}, {value.chapter_name}</h2> <h2><span>{value.title}</span></h2>
                <div className="hidden sm:block"></div>
                </>)}
            </div>
        </Card>

        <Card className={isVisible(data.ques_no_ans.length > 0)}>
            <h1 className="text-base underline font-bold pl-1 sm:pl-10 pb-2">Question With No Answer</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3">
                <h2 className="font-semibold underline">Chapter</h2> <h2 className="font-semibold underline">Content Title</h2> <div className="hidden sm:block"></div>
                {data.ques_no_ans.map((value, index) => <>
                    <h2>{index + 1}, {value.chapter_name}</h2>
                    <h2>{value.content_title}</h2>
                    <div className="hidden sm:block"></div>
                    <h3 className="col-span-2 sm:col-span-3 flex gap-1"><span className="font-semibold">#Q</span><span dangerouslySetInnerHTML={{ __html: value.question }} /></h3>
                </>)}
            </div>
        </Card>
    </div>
}

export default CourseMissing;