import { useEffect, useState } from 'react'
import ReviewAdd from './ReviewAdd'
import { FaTimesCircle } from 'react-icons/fa'
import useReviewerService from './ReviewerService'
import useLoading from '../../customs/loading/LoadingHook'
import { Reviewer } from '../../../types/Course'
import { Modal } from '../modal/Modal'
import { FullStar } from '../../customs/custom-components/Star'
import { ProfileImage } from '../../customs/custom-components/ProfileImage'
import { ReviewList } from './ReviewersList'
import { toDate } from '../../../utils/timeUtils'
import useAuthentication from '../../account/auth/authentication'

type propsType = {
  id?: string;
}

export const Reviewers = (props: propsType) => {
  const [openModel, setOpenModel] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const reviewerService = useReviewerService();
  const [selfReview, setSelfReview] = useState<Reviewer>();
  const loading = useLoading()
  const authentication = useAuthentication()
  useEffect(() => searchReviewers(), [])

  const searchReviewers = () => {
    loading.startLoading()
    reviewerService.getReviewers({ method: "self", target: props.id }).then(
      ({ data: response }) => {
        if (response.results.length) {
          setSelfReview(response.results[0])
        }
        loading.stopLoading()
      }).catch(error => loading.stopLoading())

  }

  useEffect(() => {
  }, [selfReview])

  const deleteReview = async () => {
    if (selfReview?.id) {
      loading.startLoading()
      reviewerService.deleteReviewer(selfReview.id).then(data => {
        setSelfReview(undefined)
        setOpenModel(false)
        loading.stopLoading();
      }).catch(error => loading.stopLoading());
    }
  };

  return (
    <div className="tab-pane fade active show px-2" id="reviews">
      <div className="py-2">
        <div className="mt-2 flex flex-col gap-2">
          <div
            className={`fixed top-0 left-0 right-0 z-50 bg-slate-300 bg-opacity-80 flex items-center justify-center
           w-full p-4 overflow-x-hiddenoverflow-y-auto md:inset-0 h-modal md:h-full  transition ease-in-out duration-1000 ${openModel === false ? 'hidden' : 'block'}`}
          >
            <Modal setOpenModel={setOpenModel} deleteMethod={deleteReview} />
          </div>
          {selfReview ?
            <>
            <h3 className="text-2xl font-medium text-custom_black-300">Your Review</h3>
            <div className='relative group'>
              <button type="button"
                className="text-custom_orange-700 bg-transparent absolute top-1 right-1
                        hover:bg-custom_orange-800 hover:text-gray-900 rounded-lg 
                        text-sm p-1.5 ml-auto  items-center dark:hover:bg-gray-600
                        dark:hover:text-white group-hover:flex hidden" onClick={() => { setOpenModel(true) }} >
                <FaTimesCircle />
                <span className="sr-only">Close modal</span>
              </button>
              <div className="flex items-start gap-4">
                <ProfileImage image={selfReview.profile_picture} name={selfReview.reviewer_name} />
                <div className="pl-2 mb-2 bg-gray-100 w-full">
                  <h4 className="text-[22px] font-medium mb-0"></h4>
                  <span className="text-2xl font-semi-bold text-custom_orange-800 mt-2 block">{selfReview.reviewer_name}</span>
                  <span className="flex flex-col">
                    <div className='flex'>
                      {Array(selfReview.rating).fill(0).map(value => <FullStar color='text-yellow-400' />)}
                      {Array(5 - selfReview.rating).fill(0).map(value => <FullStar color="text-gray-300" />)}
                    </div>
                    <div className='pl-2'>{selfReview.review_date}</div>
                  </span>
                  <p className='mt-7  mb-5 text-lg font-normal text-custom_black-200'>
                    {selfReview.comment}
                  </p>
                  </div>
                  </div>
              {selfReview.response ?
                <div className="p-3 rounded-xl ml-28 bg-gray-100 p">
                  <div className="flex justify-between">
                    <h1 className="text-xl text-custom_orange-800"> {selfReview.responsed_by_name}</h1>
                    <div>{toDate(selfReview.response_date)}</div>
                  </div>
                  <div className="">{selfReview.response}</div>
                </div> : openAdd ? <ReviewAdd setReviewAdd={setOpenAdd} id={props.id} setReview={setSelfReview} review={selfReview} isEdit={true} /> :
                  <button className='text-custom_orange-800 p-2 rounded-lg hover:text-white hover:bg-custom_orange-800' onClick={() => setOpenAdd(true)}>Edit Review</button>}
            </div>
            </>
            :
            authentication.isLoggedIn() && <div className=''>
              <ReviewAdd setReviewAdd={setOpenAdd} id={props.id} setReview={setSelfReview} isEdit={false} />
            </div>}
          <ReviewList id={props.id} selfReview={selfReview} />
        </div>
      </div>
    </div>
  )
}
