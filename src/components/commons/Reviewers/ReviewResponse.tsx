import { useState } from "react";
import { Reviewer } from "../../../types/Course";
import useReviewerService from "./ReviewerService";

interface Props {
    review?: Reviewer
    setOpenResponse: (openResponse: string) => void;
}

const ReviewResponse = (props: Props) => {

    const [response, setResponse] = useState(props.review?.response)
    const reviewerService = useReviewerService();
    

    const onSubmit = (value: any) => {
        value.preventDefault();
        if (props.review && response && response.length){
            reviewerService.editReview(props.review.id!, {...props.review, response}).then(({data:result}) => {
                if (result){
                        
                    props.setOpenResponse("")
                }
            })
        }
    }

    return <>
        <form onSubmit={onSubmit}>
            <div className="mt-5">
                <textarea placeholder="Write your response" name="response" onChange={(event) => setResponse(event.target.value)} className='pt-4 h-40 
                                  resize-none w-full px-6 text-custom_black-200 
                                  border-2 border-custom_orange-700 outline-2 outline-custom_orange-800
                                  transition ease-in-out duration-1000 text-lg rounded-lg' value={response}>

                </textarea>
            </div>
            <div className="w-full">
                <div className="mt-5">
                    <button className="relative z-10 hover:text-white text-custom_orange-900 hover:bg-custom_orange-900 p-3 rounded-xl hover:scale-110"> Response</button>
                </div>

            </div>

        </form>
    </>
}


export default ReviewResponse;