import { FaEdit, FaEllipsisV, FaPlus, FaRedo, FaRegSquare, FaTimes } from "react-icons/fa";
import ContentAdd from "./ContentAdd";
import { useEffect, useState } from "react";
import useLoading from "../../customs/loading/LoadingHook";
import { Content } from "../../../types/Course";
import { useContentService } from "./ContentService";
import ContentDetail from "./ContentDetail";
import { assignOrsetNull } from "../../../utils/modal";
import { Modal, Popconfirm } from "antd";
import useToast from "../../customs/toast/ToastHook";
import CustomPopConfirm from "../../customs/custom-modals/CustomPopConfirm";

interface ContentListProps {
  chapter_id: string;
}

function ContentList({chapter_id}: ContentListProps) {

  const [question, setQuestion] = useState<JSX.Element>()
  const [selelctedContent, setSelectedContent] = useState<Content>();
  const toast = useToast();
  const [addNew, setAddNew] = useState(false)
  const contentService = useContentService()
  const [contents, setContents] = useState<Content[]>([])
  const loading = useLoading()

  const cancel = () => {
    setAddNew(false);
    setSelectedContent(undefined);
  }

  useEffect(()=>searchContent(),[question])

  const appendContent = (content: Content):void =>{
    let notExist = true;
    let cons = contents.map(con => { 
      if(con.id === content.id){
        notExist=false
        return content
      }
      return con;
    })
    if(notExist) cons = [...contents, content]
    setContents(cons)
  }

  const deleteContent  = () => {
    selelctedContent && contentService.deleteContent(selelctedContent.id).then(value => {
      toast.success("Deleted Successfully")
      searchContent();
    })
  } 
  
  const searchContent = () => {
    loading.startLoading()
    contentService.getContents(chapter_id).then(
      ({data: contents}) => {
        setContents(contents?.results)
          loading.stopLoading()
      }
  ).catch(error => loading.stopLoading())
  }      
  return (
    <>
      <div className="w-full pl-4">
        <div className="flex gap-4 py-3 text-gray-500">
          <i>
            <FaRegSquare />
          </i>
          <button  onClick={()=>searchContent()} >
            <i>
              <FaRedo />
            </i>
          </button>
          <i>
            <FaEllipsisV />
          </i>
          <button className="text-custom_orange-700 md:hidden" onClick={() => setAddNew(true)}><FaPlus /></button>
        </div>
        <div className="flex flex-col-reverse w-full gap-4 lg:flex-row">
          <div className="flex flex-col w-full gap-4 lg:w-2/3">
            {contents?.map(content=>
            <div className={`relative ${selelctedContent ===content? "border-2 border-solid group border-custom_orange-800 rounded-xl": ""}`} onClick={() => assignOrsetNull(setSelectedContent, selelctedContent, content)} key={content.id}>
              <CustomPopConfirm func={deleteContent} editFun={setAddNew} />
              <ContentDetail key={content.id} content={content} />
            </div>
            )}
              {question}
          </div>
          <div className="w-full lg:w-1/3 hidden md:block">
           <ContentAdd chapter={chapter_id} appendContent={appendContent} selelctedContent={selelctedContent}  />
          </div>
        </div>
      </div>


      <Modal open={addNew && (window.innerWidth < 768)} onCancel={cancel} footer={[]} >
      <ContentAdd chapter={chapter_id} appendContent={appendContent} selelctedContent={selelctedContent} cancel={cancel} />
        </Modal>
    </>
  );
}

export default ContentList;
