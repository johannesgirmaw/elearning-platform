import { useEffect, useState } from 'react'
import useReviewerService from './ReviewerService';
import useLoading from '../../customs/loading/LoadingHook';
import { Reviewer } from '../../../types/Course';
import { BackEndError } from '../../../types/UserItem';
import { ButtonReviewStar, ButtonStar } from '../../customs/custom-components/Star';
type propsType = {
    id?: string;
    setReviewAdd: (toggle: boolean) => void,
    review?: Reviewer
    setReview: (review: Reviewer) => void
    isEdit?: boolean
}
const ReviewAdd = (props: propsType) => {
    const [rating, setRating] = useState(0);
    const [ratingOnHover, setRatingOnHover] = useState(0);
    const [comment, setComment] = useState("");

    const reviewerService = useReviewerService();
    const [errors, setErrors] = useState<BackEndError<Reviewer>>();
    const loading = useLoading()

    useEffect(() => {
        if (props.review) {
            setRating(props.review.rating);
            setComment(props.review.comment)
        }

    }, [props.review])
    const onSubmit = (e: any) => {
        e.preventDefault();

        if (props.isEdit && props.review) {
            onUpdate(e)
        }
        else {
            reviewerService.addReviewer({ target: props.id, comment: comment, rating: rating }).then(data => {
                if (data.data){
                    props.setReviewAdd(false)
                    props.setReview(data.data)
                }
                loading.stopLoading();
            }).catch((error) => { setErrors(error.response.data.error.details); loading.stopLoading() });
        }
    };

    const onUpdate = (e: any) => {
        e.preventDefault();
        reviewerService.editReview(props.review?.id!, { comment: comment, rating: rating }).then(data => {
            if (data.data){
                props.setReviewAdd(false)
                props.setReview(data.data)
            }
            loading.stopLoading();
        }).catch((error) => { setErrors(error.response.data.error.details); loading.stopLoading() });
    };



    return (<>
        {/* <!-- Reviews Form Modal Start --> */}
        <div
            className="relative w-full max-w-2xl md:h-auto"
            id="reviewsModal"
            aria-hidden="true"
        >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="relative flex flex-col w-full outline-0 border-1 border-custom_orange-700">
                    <div className="relative flex-1 pt-0">
                        <form onSubmit={onSubmit}>
                            <div className="flex flex-wrap max-w-full m-4 gap-x-4">

                                <div className="w-full ">
                                    {/* <!-- Single Form Start --> */}
                                    <div className="mt-4 ">
                                        <label className='block mb-0 font-sans text-sm font-no text-custom_black-300 '>Rate this Course</label>
                                        <ul className="flex gap-6 mt-2">
                                            <ButtonReviewStar rating={rating} setRating={setRating} rateOnHover={ratingOnHover} setRateOnHover={setRatingOnHover} />
                                        </ul>
                                    </div>
                                    {/* <!-- Single Form End --> */}
                                </div>
                                <div className="w-full">
                                    {/* <!-- Single Form Start --> */}
                                    {rating > 0 && <div className="mt-5">
                                        <textarea placeholder="Write your review here(Optional)" onChange={(event) => setComment(event.target.value)} className='w-full h-40 px-6 pt-4 text-lg transition duration-1000 ease-in-out border-2 rounded-lg resize-none text-custom_black-200 border-custom_orange-700 outline-2 outline-custom_orange-800' value={comment}>

                                        </textarea>
                                    </div>}
                                    {/* <!-- Single Form End --> */}
                                </div>
                                {rating > 0 && <div className="w-full">
                                    {/* <!-- Single Form Start --> */}

                                    <div className="mt-5">
                                        <button className="relative z-10 p-3 hover:text-white text-custom_orange-900 hover:bg-custom_orange-900 rounded-xl hover:scale-110"> Review</button>
                                    </div>

                                </div>}
                            </div>
                        </form>
                    </div>
                    {/* <!-- Reviews Form End --> */}
                </div>
            </div>
        </div>

        {/* <!-- Reviews Form Modal End --> */}

    </>)
}

export default ReviewAdd;
