import { FaEllipsisV, FaPlus, FaRedo, FaRegSquare } from "react-icons/fa";
import { Modal as Dialog, Pagination } from "antd";  
import ChapterAdd from "./ChapterAdd";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useChapterService, { ChapterTableSearchModel } from "./ChapterService";
import ChapterDetail from "./ChapterDetail";
import { Chapter } from "../../../types/Course";
import { usePagination } from "../../customs/pagination/usePagination";
import useLoading from "../../customs/loading/LoadingHook";
import useToast from "../../customs/toast/ToastHook";
import Loading from "../../customs/loading/Loading";

function ChapterList({
  addTab,
}: {
  addTab: (tab: string, id: string) => void;
}) {
  const id = useParams().id!;
  const chapterService = useChapterService();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const paginator = usePagination<ChapterTableSearchModel>({course_id: id})
  const [addNew, setAddNew] = useState(false)
  const loading = useLoading();
  const [isEdit, setIsEdit] = useState(false);
  const [chapterData, setChapterData] = useState<Chapter | null>(null);
  const toast = useToast();

  useEffect(() => searchChapters(), [paginator.filterData]);

  const searchChapters = () => {
    loading.startLoading()
    chapterService.getChapters(paginator.filterData).then(
      ({data: chapters}) => {
          setChapters(chapters.results)
          paginator.setTotal(chapters.count)
          loading.stopLoading()
      }
  ).catch(error => loading.stopLoading())
  }
  const deleteChapter =  (chapterId: string) => {
    chapterService
      .deleteChapter(chapterId)
      .then((res: any) => {
        searchChapters();
      })
      .then((error: any) => {
        loading.stopLoading();
      });
  };

  const cancel = () => {
    setAddNew(false);
    setChapterData(null)
    setIsEdit(false);
  }

  const updateChapter = (chapter: Chapter) => {
    setIsEdit(true);
    setChapterData(chapter);
    setAddNew(true)
  };

  return (
    <>
      <div className="w-full px-4">
        <div className="flex gap-4 py-3 items-center text-gray-500">
          <i>
            <FaRegSquare />
          </i>
          <i>
            <FaRedo />
          </i>
          <i>
            <FaEllipsisV />
          </i>
          <button className="text-custom_orange-700 md:hidden" onClick={() => setAddNew(true)}><FaPlus /></button>
        </div>
        <div className="flex flex-col-reverse justify-between  w-full gap-4 md:flex-row">
          <div className="flex flex-col gap-2 md:w-2/3 ">
          <div className="flex flex-wrap gap-4 relative">
            <Loading {...loading} />
            {chapters.map((chapter) => (
              <ChapterDetail
                key={chapter.id}
                chapter={chapter}
                addTab={addTab}
                updateChapter={updateChapter}
                deleteChapter={deleteChapter}
              />
            ))}
            </div>
            <Pagination {...paginator} className="full"  />
          </div>
          
          <div className="w-full md:w-1/3 hidden md:block">
            <ChapterAdd
              course={id}
              reload={searchChapters}
              isEdit={isEdit}
              cancel={cancel}
              chapterData={chapterData}
            />
          </div>
        </div>
      </div>

      <Dialog open={addNew && (window.innerWidth < 768)} onCancel={cancel} footer={[]} >
          <ChapterAdd
              course={id}
              reload={searchChapters}
              isEdit={isEdit}
              cancel={cancel}
              chapterData={chapterData}
            />
        </Dialog>
    </>
  );
}

export default ChapterList;
