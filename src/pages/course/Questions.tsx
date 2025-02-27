import { Content, UserQuizeResultsType } from '../../types/Course';
import { useEffect, useState } from 'react';
import QuestionIntro from '../../components/courses/question/QuestionInto';
import QuestionList from '../../components/courses/question/QuestionList';
import QuestionResult from '../../components/courses/question/QuestionResult';
import useQuestionService from '../../components/courses/question/QuestionService';
import useLoading from '../../components/customs/loading/LoadingHook';
import Loading from '../../components/customs/loading/Loading';

export enum Progress {
  INTRO,
  EXAM,
  FINISH
}
function Questions({
  content,
  handlePrevious,
  handleNext,
  is_admin,
}: {
  content: Content;
  handlePrevious: () => void;
  handleNext: () => void
  is_admin?: boolean
}) {
  const [progress, setProgress] = useState(0);
  const [userResult, setUserResult] = useState<UserQuizeResultsType>();
  const loading = useLoading();
  const questionService = useQuestionService()
  useEffect(() => {
    searchQuizeResult();
  }, [content])

  const searchQuizeResult = () => {
    if (is_admin) {
      setProgress(Progress.EXAM)
    } else {
      loading.startLoading()
      questionService.getQuizeResults({ content_id: content.id }).then(({ data: value }) => {
        setProgress(Progress.INTRO)
        setUserResult(undefined)
        if (value.results.length) {
          setUserResult(value.results[0])
          if (value.results[0].is_passed)
            setProgress(Progress.FINISH)
        }
        loading.stopLoading()
      })
    }
  }

  return <>
    <Loading   {...loading} />
    {progress === Progress.INTRO && <QuestionIntro userResult={userResult} content={content} setProgress={setProgress} handlePrevious={handlePrevious} />}
    {progress === Progress.FINISH && userResult && <QuestionResult content={content} userResult={userResult} handleNext={handleNext} handlePrevious={handlePrevious} setProgress={setProgress} />}
    {progress === Progress.EXAM && <QuestionList is_admin={is_admin} content={content} setProgress={setProgress} setUserResult={setUserResult} />}
  </>
}

export default Questions;
