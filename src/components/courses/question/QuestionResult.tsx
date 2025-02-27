import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Card, Result } from "antd";
import { Content, UserQuizeResultsType } from "../../../types/Course";
import { Progress } from "../../../pages/course/Questions";

interface Props {
    content: Content;
    handleNext: () => void;
    handlePrevious: () => void
    setProgress: (value: number) => void
    userResult: UserQuizeResultsType;
}


const QuestionResult = ({ content, handleNext, handlePrevious, setProgress, userResult }: Props) => {

    const subTitle = (<div>
        <h1>Result: <span>{userResult.result}/{userResult.total}({userResult.result * 100 / userResult.total}%)</span></h1>
        <h1>Passing Result in percent: <span>{content.passing_percent || 0}%</span> </h1>
    </div>)

    return <>
        <div>
            {userResult.is_passed ? <Result status="success"
                title="You have successfully passed the exam!"
                subTitle={subTitle}
                extra={[
                    <Button type="primary" className="border-2 border-gray-200  border-solid text-black" key="previous" onClick={handlePrevious}>
                        Previous Content
                    </Button>,
                    <Button type="primary" className="border-2 border-gray-200  border-solid text-black" onClick={handleNext} key="next">
                        Next Content
                    </Button>,
                ]} /> :
                <Result
                    status="error"
                    title="Exam Failed"
                    subTitle={subTitle}
                    extra={[

                        <Button type="primary" className="border-2 border-gray-200  border-solid text-black" key="previous" onClick={handlePrevious}>
                            Previous Content
                        </Button>,
                        <Button type="primary" className="border-2 border-gray-200  border-solid text-black" key="retake" onClick={() => setProgress(Progress.INTRO)}>
                            Re-take Exam
                        </Button>
                    ]}
                >

                    {/* <div className="desc flex flex-col gap-4">
                        <p>
                            <strong
                                style={{
                                    fontSize: 16,
                                }}
                            >
                                The content you submitted has the following error:
                            </strong>
                        </p>
                        <p>
                            <CloseCircleOutlined className="site-result-demo-error-icon" rev={undefined} /> Your account has been
                            frozen. <a>Thaw immediately &gt;</a>
                        </p>
                        <p>
                            <CloseCircleOutlined className="site-result-demo-error-icon" rev={undefined} /> Your account is not yet
                            eligible to apply. <a>Apply Unlock &gt;</a>
                        </p>
                    </div> */}
                </Result>
            }
        </div>
    </>
}

export default QuestionResult;
