import Card from "antd/es/card/Card";
import { Content, UserQuizeResultsType } from "../../../types/Course"
import { toDurationTime } from "../../../utils/timeUtils";
import { Progress } from "../../../pages/course/Questions";
import Countdown from "antd/es/statistic/Countdown";
import { changeDuration } from "../../../utils/modal";
import { Button } from "antd";
import { useEffect, useState } from "react";


interface Props {
    content: Content
    setProgress: (value: number) => void
    handlePrevious: () => void
    userResult?: UserQuizeResultsType;

}

const QuestionIntro = (props: Props) => {
    const [isWaiting, setIsWaiting ] = useState<boolean | undefined>()
    const [deadline, setDeadline] = useState(Date.now())
    useEffect(() => {
        setIsWaitingfun()
    },[props.userResult])
    
    const setIsWaitingfun = () => {
        if(props.userResult){
            let time = changeDuration(props.content.re_examination_waiting)
            let  deadline = props.content.re_examination_waiting && props.userResult?.create_date ? (new Date(props.userResult.create_date).getTime() + 1000 * 60 * 60 * time.hours + 1000 * 60 * time.minutes) : Date.now()
            setIsWaiting(deadline>Date.now())
            setDeadline(deadline)
        }
    }

    const onFinish = () => {
        setIsWaitingfun()
    }


    return <div className="flex justify-center h-full mt-24 items-center">


        <Card className="max-w-lg relative border-custom_orange-800 pb-16">
            {isWaiting ? <div className='w-full gap-6  flex flex-col items-center justify-between  pb-2'>
                <Countdown title={<span className='font-semibold items-center text-xl w-20' >Remaining Time to retake the Exam</span>} value={deadline} onFinish={onFinish} />
                <Button type="primary" className="absolute bottom-2  left-4 border-2 border-gray-200  border-solid text-black" key="previous" onClick={props.handlePrevious}>
                    Previous Content
                </Button>,
            </div> : (<>
                <div>
                    <span className="font-semibold">Instruction:</span>
                    {props.content.description}
                </div>
                <div>You have time of <strong>{toDurationTime(props.content.duration)}</strong> to finish the test</div>
                <div> <strong>{props.content.no_question}</strong> Question are available</div>

                <div className="pt-4 font-semibold"><span className="text-custom_orange-800">Notice:</span> If you fail this exam you will re take after {toDurationTime(props.content.re_examination_waiting)} and you have to answer {props.content.passing_percent}% to pass.</div>

                <div className="absolute bottom-2 right-4 flex gap-4 ">
                    <button className='bg-gray-200 text-red-800 px-3 py-2 mt-3 rounded-lg' children='Cancle' onClick={() => props.handlePrevious()} />
                    <button className='bg-gray-200 right-4  text-custom_orange-800 px-3 py-2 mt-3 rounded-lg' children='Start' onClick={() => props.setProgress(Progress.EXAM)} />
                </div></>)}
        </Card>
    </div>

}

export default QuestionIntro;