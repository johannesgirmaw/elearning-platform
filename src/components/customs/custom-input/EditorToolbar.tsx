import { Quill } from "react-quill";

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const getModule = (id: string) => {
  return {
    toolbar: {
      container: `#${id}`,
    },
  };
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

const tools = {
  font: (
    <select className="flex-shrink-0 ql-font" defaultValue="arial">
      <option value="arial">Arial</option>
      <option value="comic-sans">Comic Sans</option>
      <option value="courier-new">Courier New</option>
      <option value="georgia">Georgia</option>
      <option value="helvetica">Helvetica</option>
      <option value="lucida">Lucida</option>
    </select>
  ),
  size: (
    <select className="flex-shrink-0 ql-size" defaultValue="medium">
      <option value="extra-small">Size 1</option>
      <option value="small">Size 2</option>
      <option value="medium">Size 3</option>
      <option value="large">Size 4</option>
    </select>
  ),
  header: (
    <select className="flex-shrink-0 ql-header" defaultValue="3">
      <option value="1">Heading</option>
      <option value="2">Subheading</option>
      <option value="3">Normal</option>
    </select>
  ),
  bold: <button className="ql-bold" />,
  italic: <button className="ql-italic" />,
  underline: <button className="ql-underline" />,
  strike: <button className="ql-strike" />,
  ordered_list: <button className="ql-list" value="ordered" />,
  bullet_list: <button className="ql-list" value="bullet" />,
  left_indent: <button className="ql-indent" value="-1" />,
  right_indent: <button className="ql-indent" value="+1" />,
  super: <button className="ql-script" value="super" />,
  sub: <button className="ql-script" value="sub" />,
  blockquote: <button className="ql-blockquote" />,
  direction: <button className="ql-direction" />,
  align: <select className="ql-align" />,
  color: <select className="ql-color" />,
  background: <select className="ql-background" />,
  link: <button className="ql-link" />,
  image: <button className="ql-image" />,
  video: <button className="ql-video" />,
  formula: <button className="ql-formula" />,
  code_block: <button className="ql-code-block" />,
  clean: <button className="ql-clean" />,
};

export type Tools = keyof typeof tools;

export interface QuillToolBarProps {
  tools: Tools[];
  id: string;
}
// Quill Toolbar component
export const QuillToolbar = (props: QuillToolBarProps) => {
  return (
    <div
      id={props.id}
      className={`flex overflow-x-auto  has-[.ql-expanded]:overflow-x-visible`}
    >
      {props.tools.map((tool) => tools[tool])}
    </div>
  );
};

export default QuillToolbar;
