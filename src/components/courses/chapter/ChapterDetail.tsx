import { BiCheckCircle } from "react-icons/bi";
import { BsClockHistory } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { Chapter } from "../../../types/Course";
import CustomCard from "../../customs/custom-card/CustomCard";
import CustomPopConfirm from "../../customs/custom-modals/CustomPopConfirm";

interface ChapterDetailProps {
  chapter: Chapter;
  addTab: (title: string, id: string) => void;
  updateChapter: (chpater: Chapter) => void;
  deleteChapter: (id: string) => void;
}

const ChapterDetail = (props: ChapterDetailProps) => {
  const { chapter, addTab, updateChapter, deleteChapter } = props;
  return (
    <div
      className="relative w-full md:min-w-80 md:w-fit"
    >
      {" "}
      <CustomCard >
      <div onClick={() => chapter.id && addTab(chapter.chapter_title, chapter.id)} >
        <span className="mb-2 font-medium text-gray-500" 
         >
          {chapter.chapter_name}
        </span>
            <div className="absolute z-50 flex items-center justify-center right-1 top-1">
            <CustomPopConfirm func={() =>deleteChapter(chapter.id)} editFun={(value) => updateChapter(chapter)} visible/>

            {/* <span
                className="flex items-center justify-center p-2 bg-transparent rounded-lg cursor-pointer text-custom_orange-700 hover:bg-custom_orange-800 hover:text-gray-900"
                onClick={(event) => {event.stopPropagation(); }}
            >
                <FaEdit />
            </span> */}
{/* 
            <button
                type="button"
                className="text-custom_orange-700 bg-transparent
    hover:bg-custom_orange-800 hover:text-gray-900 rounded-lg 
    text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600
    dark:hover:text-white"
    onClick={(event) => {event.stopPropagation(); setOpenModel(chapter.id)}}
    >
                <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    ></path>
                </svg>
                <span className="sr-only">Close modal</span>
            </button> */}
            </div>

        <div className="flex gap-2 justify-between">
          <p>{chapter.chapter_title}</p>
          <div className="flex">
            <p className="flex items-center gap-1 mr-4">
              <i className="text-custom_orange-800">
                <BsClockHistory />
              </i>
              <span className="text-gray-500">{chapter.durations?.slice(0,-3)} hr</span>
            </p>
            <p className="flex items-center gap-1">
              <i className="text-custom_orange-800">
                <BiCheckCircle />
              </i>
              <span className="text-gray-500">{chapter.contents} Lessons</span>
            </p>
          </div>
        </div>
        </div>
      </CustomCard>{" "}
    </div>
  );
};

export default ChapterDetail;
