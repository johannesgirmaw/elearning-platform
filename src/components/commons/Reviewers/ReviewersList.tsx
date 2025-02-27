import { useEffect, useState } from "react";
import useReviewerService from "./ReviewerService";
import { ReviewTableSearchModel, Reviewer, TotalReview } from "../../../types/Course";
import { usePagination } from "../../customs/pagination/usePagination";
import { FullStar, HalfStar, Rating } from "../../customs/custom-components/Star";
import { ProfileImage } from "../../customs/custom-components/ProfileImage";
import useAuthorization from "../../account/auth/authorization";
import ReviewResponse from "./ReviewResponse";
import CustomCard from "../../customs/custom-card/CustomCard";
import { toDate, toDateAndTime } from "../../../utils/timeUtils";

interface Props {
    id?: string;
    selfReview?: Reviewer;
}

export const ReviewList = (props: Props) => {
    const reviewerService = useReviewerService();
    const [reviewers, setReviewerData] = useState<Reviewer[]>([])
    const paginator = usePagination<ReviewTableSearchModel>({ target: props.id, ps:2 });
    const [openResponse, setOpenResponse] = useState<string|undefined>();
    const [ratings, setRatings] = useState<TotalReview>()
    const autherization = useAuthorization();

    useEffect(() => { openResponse || searchReviewers() }, [openResponse, paginator.filterData])
    useEffect(() => searchTotalReview(), [props.selfReview])

    const searchTotalReview = () => {
        reviewerService.getReviewers({ method: "ratings", target: props.id }).then(
            ({ data: response }) => {
                if (response.results) {
                    let rate_value = [{ rate: 5, percent: 0 }, { rate: 4, percent: 0 }, { rate: 3, percent: 0 }, { rate: 2, percent: 0 }, { rate: 1, percent: 0 }];
                    let data = response.results as unknown as TotalReview
                    rate_value.forEach(val => {
                        let rates = data.ratings.find(rate => rate.rate === val.rate)
                        if (rates) val.percent = rates.percent
                        return val
                    })
                    data.ratings = rate_value
                    setRatings(data)
                }
            })
    }

    const searchReviewers = () => {
        reviewerService.getReviewers(paginator.filterData).then(
            ({ data: response }) => {
                paginator.setNext(response.next)
                setReviewerData([...reviewers, ...response.results])
            })
    }
    return <div className="mb-3 flex flex-col">
        <h3 className="text-2xl font-medium text-custom_black-300 mb-2">Ratings and  Reviews</h3>
        <div className='border-1 border-solid sm:w-[70%] w-full border-custom_orange-300'>
            {ratings && <div className='flex items-center gap-4'>
                <div className='flex flex-col items-center'>
                    <div className='text-5xl'>{ratings.rating} </div>
                    <div className='flex'>
                        <Rating  rating={ratings.rating} />
                    </div>
                </div>
                <div className='w-full px-2'>
                    {ratings.ratings.map(value => <div className='flex gap-2 w-full items-center' key={value.rate}>
                        <div>{value.rate} </div>
                        <div className="w-full bg-custom_black-900 rounded-full h-1.5   dark:bg-custom_black-900">
                            <div style={{ width: (value.percent).toString() + '%' }} className={`bg-custom_orange-800 h-1.5 rounded-full`} key={value.rate} />
                        </div>
                    </div>)}
                </div>
            </div>}
        </div>

        {reviewers?.map(data => (
            <div className="flex item-start">
                <ProfileImage image={data.profile_picture} name={data.reviewer_name} />
                <div className="pl-7">
                    <div className="bg-gray-100 mb-2">                    
                    <span className="text-2xl font-semi-bold text-custom_orange-800 mt-2 block">{data.reviewer_name}</span>
                    <div className='flex'>
                        {Array(data.rating).fill(0).map(value => <FullStar color="text-yellow-400" />)}
                        {Array(5 - data.rating).fill(0).map(value => <FullStar color="text-gray-300" />)}
                        <div className='pl-2'>{toDate(data.review_date)}</div>
                    </div>
                    <p className='text-lg font-normal text-custom_black-200'>
                        {data.comment}
                    </p>
                    {!data.response && <button className="bg-gray-200 mt-1 text-custom_orange-800 p-1 rounded-lg" onClick={() => setOpenResponse(data.id)}>Responed</button>}
                    </div>

                    { openResponse === data.id ? <ReviewResponse review={data} setOpenResponse={setOpenResponse} /> 
                        :data.response  && <div className="p-3 rounded-xl ml-5 bg-gray-100 p">
                            <div className="flex justify-between">
                                <h1 className="text-xl text-custom_orange-800"> {data.responsed_by_name}</h1>
                                <div>{toDate(data.response_date)}</div>
                                </div>
                            <div className="">{data.response}</div>
                            <button className="bg-gray-200 text-custom_orange-800 p-1 rounded-lg" onClick={() => setOpenResponse(data.id)}>Edit Response</button>
                        </div>
                        
                        }
                </div>
            </div>
        ))}
        {paginator.next && <button className="bg-gray-200 self-center text-custom_orange-800 px-3 py-2 mt-3 rounded-lg" onClick={() => paginator.handleChange("pn", 1 + (paginator.filterData.pn || 0))}>show more</button>}
    </div>

}