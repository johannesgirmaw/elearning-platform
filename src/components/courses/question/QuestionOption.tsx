import { UseFormReturn } from "react-hook-form";
import { Answer, Question, QuestionOption } from "../../../types/Course";
import Editor from "../../customs/custom-input/Editor";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

function QuestionOptions(props: {
  index: number;
  question_idx: number;
  value: QuestionOption;
  answers: Answer[];
  optionForm: UseFormReturn<Question, any>;
  handleAnswerChange: (e: CheckboxChangeEvent, value: string) => void;
  handleDelete:(idx: number, id: string) => void
}) {
  const [isAnswer, setIsAnswer]=useState(false)
  
  useEffect(() => {
    setIsAnswer(props.answers?.some(val => val.answer === props.value.id));
  },[props.answers, props.value])

  return (
    <div className="flex flex-col pt-3" key={props.index}>
      <div className="flex justify-between">
      {props.value.id && <Checkbox checked={isAnswer} onChange={(e) => props.handleAnswerChange(e, props.value.id)}> </Checkbox>}
      <IoMdClose className="cursor-pointer ml-auto" onClick={() => props.handleDelete(props.index, props.value.id)} />
      </div>
     <Editor
        tools={[
          "bold",
          "italic",
          "underline",
          "strike",
          "bullet_list",
          "ordered_list",
          "image",
          "formula",
          "code_block",
        ]}
        id={`question_${props.question_idx}_option_${props.index}`}
        key={props.index}
        placeholder="Value"
        label={`options_questions.${props.index}.value`}
        {...props.optionForm}
      />
    </div>
  );
}

export default QuestionOptions;
