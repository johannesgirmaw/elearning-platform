import { useEffect, useState } from "react";
import { RegisterOptions, SubmitHandler, UseFormRegisterReturn, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose, IoMdSave } from "react-icons/io";
import {
  Answer,
  Question,
  QuestionOption,
  QuestionOption as QuestionOptionType,
} from "../../../types/Course";
import useQuestionService from "./QuestionService";
import Editor from "../../customs/custom-input/Editor";
import "react-quill/dist/quill.snow.css";
import QuestionOptions from "./QuestionOption";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import useQuestionAnswerService from "./QuestionAnswerService";
import useQuestionOptionService from "./QuestionOptionService";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import { AnswerTypeEnum, AnswerTypeOptions } from "../../../types/Enums";

interface QuestionFormProps {
  index: number
  content: Question;
  updateQuestions: (id: string) => void;
  deleteQuestion: (id: string) => void;
}

const QuestionForm = ({index, content, updateQuestions, deleteQuestion }: QuestionFormProps) => {
  const questionForm = useForm<Question>({ values: content });
  const questionService = useQuestionService();
  const questionAnswerService = useQuestionAnswerService();
  const questionOptionService = useQuestionOptionService();
  const [answers, setAnswers] = useState<Answer[]>(content.answer_question || []);
  const [values, setValues] = useState<QuestionOptionType[]>(
    content.options_questions
  );

  const onSubmit: SubmitHandler<Question> = (data) => {
    data.content = content.content;
    if (data.id) {
      questionService.updateQuestion(data).then(({data:value}) => {
        if (value) {
          questionForm.reset(value);
          setValues(value.options_questions);
        }
      });
    } else {
      questionService.addQuestion(data).then(({data:value}) => {
        if (value) {
          questionForm.reset(value)
          setValues(value.options_questions);
          updateQuestions(value.id);
        }
      });
    }
  };
  
  const updateForm = (index: number) => {
    const newValues = values.filter((value, idx) => idx !== index)
    setValues(newValues);
    questionForm.setValue('options_questions', newValues)
  }

  const handleOptionDelete = (index: number, id: string) => {
    id ? questionOptionService.deleteOption(id).then((value) => {
      updateForm(index);
    }): updateForm(index);
  };

  const updateAnswer = (answer: Answer) => {
    questionAnswerService.updateAnswer(answer).then(({data: value}) => {
      if(value){
        setAnswers(answers.map(ans => ans.id === value.id ? value : ans))
      }
    })
  }

  const deleteAnswer = (id?: string) => {
    id && questionAnswerService.deleteAnswer(id).then(value => {
      setAnswers(answers => answers.filter(value => value.id !==id))
    })
    
  }
  
  const addAnswer = (answer: Answer) => {
    questionAnswerService.addAnswer(answer).then(({data: val}) =>{
      setAnswers([...answers, val])
    })
  }
  
  const handleAnswerChange = (e: CheckboxChangeEvent, val: string) => {
    let checked = e.target.checked 
    if(questionForm.getValues("answer_type") === AnswerTypeEnum.SINGLE && answers.length && checked ) {
        let ans = answers[0]
        updateAnswer({...ans, answer: val})
    } else{
      checked ? addAnswer({answer:val, question: questionForm.getValues("id")} as Answer) : deleteAnswer(answers.find(value => value.answer === val)?.id)
    }
  }

  const onValueChange = (val: string) => {
    questionForm.setValue("question", val);
  };

  const renderValues = () => {
    const va = values.map((value, idx) => (
      <QuestionOptions
        key={idx}
        question_idx={index}
        index={idx}
        value={value}
        answers={answers}
        optionForm={questionForm}
        handleAnswerChange={handleAnswerChange}
        handleDelete={handleOptionDelete}
      />
    ));
    return va;
  };


  const onAnswerTypeChange = (value: number) => {
    if(answers.length > 1 && value === AnswerTypeEnum.SINGLE){
      for (let ans of answers.filter(val => val !==answers[0])){
        deleteAnswer(ans.id)
      }
    }
  }

  const addValues = () => {
    const newValues = [
      ...questionForm.getValues("options_questions"),
      {question: "", value: "" } as QuestionOption ,
    ];
    setValues(newValues);
    questionForm.setValue("options_questions", newValues);
  };

  return (
    <form onSubmit={questionForm.handleSubmit(onSubmit)} key={index}>
      <div className="flex ml-auto w-fit gap-4 justify-end">
      <button type="submit" key={"submit" + content.id} className="text-custom_orange-900">
        <i className="text-lg">
          <IoMdSave></IoMdSave>
        </i>
      </button>
      {questionForm.getValues("id") && <button type="button" key={`submit_${index}`}  onClick={() => deleteQuestion(questionForm.getValues("id"))} className=" text-red-700">
        <i className="text-lg">
          <IoMdClose></IoMdClose>
        </i>
      </button>}
      </div>

      <Editor
        key={`question_${index}`}
        id={`question_${index}`}
        {...questionForm}
        label="question"
        className="h-40"
        placeholder="Question"
        onValueChange={onValueChange}
      />
      <CustomDropdown  label="answer_type" placeholder="Answer Type" register={questionForm.register} data={AnswerTypeOptions} error={questionForm.formState.errors.answer_type} control={questionForm.control} onValueChange={onAnswerTypeChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
        {renderValues()}
        <i
          onClick={addValues}
          className="flex items-center justify-center text-3xl font-bold cursor-pointer text-custom_orange-900"
        >
          <AiOutlinePlus></AiOutlinePlus>
        </i>
      </div>
    </form>
  );
};

export default QuestionForm;
