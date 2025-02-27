import { useEffect, useState } from "react";
import CustomCard from "../../customs/custom-card/CustomCard";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Carousel from "../../customs/carousel/CustomCarousel";
import useCarousel from "../../customs/carousel/carouselHook";
import QuestionForm from "./QuestionForm";
import { Question } from "../../../types/Course";
import useQuestionService from "./QuestionService";
import { AnswerTypeEnum } from "../../../types/Enums";

interface QuestionAddProps{
  content: string;
}


function QuestionAdd({content}: QuestionAddProps) {
  const carousel = useCarousel(1, false)
  const emptyContent = {question: '', content: content, answer_type: AnswerTypeEnum.SINGLE , options_questions: [{question: '', value: '',}]} as Question;
  const [newContents, setNewContents] = useState<Question[]>([])
  const questionService = useQuestionService();
  const updateQuestions = (id: string) => {
    setNewContents([...newContents, {...emptyContent, id:""}])
  }

  const deleteQuestion = (id: string) => {
    questionService.deleteQuestion(id).then(value => {
      setNewContents(newContents.filter(value => value.id !==id))
    })
  }

  useEffect(() => {
    questionService.getInstructorQuestions({content_id: content}).then(({data:value}) => {
      setNewContents([...value.results, emptyContent])
    })
 
  },[content])

  useEffect(() => {
    carousel.updateChildren(newContents, (content, idx) => <QuestionForm index={idx} key={idx} content={content} deleteQuestion= {deleteQuestion} updateQuestions={updateQuestions} />)
  }, [carousel.width, newContents])

  return (
    <>
    <div className="mt-5">
      <CustomCard>
        <div className="flex gap-x-2">

        {<button className={`${carousel.canPrev ? '' : 'invisible cursor-default'}`} onClick={carousel.movePrev}><i><AiOutlineArrowLeft></AiOutlineArrowLeft></i></button>}
        {<button className={`${carousel.canNext ? '' : 'invisible cursor-default'}`} onClick={carousel.moveNext}><i><AiOutlineArrowRight></AiOutlineArrowRight></i></button>}
        </div>
        <Carousel {...carousel} />
      </CustomCard>
      </div>
    </>
  );
}

export default QuestionAdd;
