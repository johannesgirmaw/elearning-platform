import ReactQuill from "react-quill";
import EditorToolbar, { getModule, formats, Tools } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import CustomInputError from "../custom-input-error/CustomInputError";
import { InputProps } from "../../../types/InputTypeProp";
import {
  FieldValues,
  PathValue,
} from "react-hook-form";

export interface EditorProps<T extends FieldValues> extends InputProps<T> {
  tools?: Tools[];
}

export function Editor<T extends FieldValues>(props: EditorProps<T>) {
  const handleChange = (value: string) => {
    props.onValueChange && props.onValueChange(value);
    props.setValue && props.setValue(props.label, value as PathValue<T, any>);
  };

  return (
    <div className="text-editor">
      <EditorToolbar
        id={props.id}
        key={"toolbar" +props.id}
        tools={
          props.tools || [
            "font",
            "size",
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "ordered_list",
            "bullet_list",
            "left_indent",
            "right_indent",
            "super",
            "sub",
            "blockquote",
            "align",
            "color",
            "background",
            "link",
            "image",
            "video",
            "formula",
            "code_block",
          ]
        }
      />
      <ReactQuill
        theme="snow"
        placeholder={props.placeholder || "Write something awesome..."}
        modules={getModule(props.id)}
        formats={formats}
        value={props.getValues && props.getValues(props.label)}
        className={props.className}
        {...props.register(props.label, props.options)}
        onChange={handleChange}
        onBlur={() => {}}
      />
      <CustomInputError msg={props.error?.message} />
    </div>
  );
}

export default Editor;
