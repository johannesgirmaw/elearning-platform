import { ReviewList } from "./ReviewersList"
import CustomText from "../../customs/custom-text/CustomText"
import CustomCard from "../../customs/custom-card/CustomCard"



const InstructerReview = ({id}: {id?: string}) => {
    return <div className="flex flex-col gap-4 pl-5 sm:w-4/5">
        <div className=' gap-4 items-center'>
            <CustomCard className="mt-6">
                <h1 className="mb-5 text-2xl font-bold">
                    Review <CustomText text={"List"} />{" "}
                </h1>
                <p>
                    Those are  review list dives into the course, exploring its content, structure, and the instructor's approach. We'll delve into both its strengths and weaknesses, offering you a comprehensive picture to help decide if it aligns with your learning goals and expectations.
                </p>
            </CustomCard>
        </div>
        <ReviewList id={id} />
    </div>

}

export default InstructerReview;