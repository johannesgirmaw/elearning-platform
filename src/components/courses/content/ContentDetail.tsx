import { BiCheckCircle } from "react-icons/bi";
import { BsClockHistory } from "react-icons/bs";
import CustomCard from "../../customs/custom-card/CustomCard";
import { Content } from "../../../types/Course";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import QuestionAdd from "../question/QuestionAdd";
import { ContentType } from "../../../types/Enums";
import { isVisible } from "../../account/auth/authorization";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import ReactPlayer from "react-player";
import { Player } from "video-react";

interface ContentDetailProps {
  content: Content;
}

const ContentDetail = (props: ContentDetailProps) => {
  const { content } = props;
  const [hideDetail, setHideDetail] = useState<boolean>(true);
  function onDocumentLoadSuccess(numPages: any) {
    // setNumPages(numPages);
  }

  return (
    <CustomCard>
      <div className="flex items-center space-x-1">
        <div
          className="cursor-pointer px-2 md:pl-0" onClick={(e) => {e.stopPropagation(); setHideDetail(!hideDetail)}}
        >
          {hideDetail ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
        <h1 className=" font-medium text-gray-500">{content?.title}</h1>
      </div>
      <div className="flex justify-between">
        <p>{content?.description}</p>
        <div className="flex">
          <p className="flex items-center gap-1 mr-4">
            <i className="text-custom_orange-800">
              <BsClockHistory />
            </i>
            <span className="text-gray-500">{content.duration?.slice(0,-3)||0}hr</span>
          </p>
        </div>
      </div>
      {hideDetail ? (
        <></>
      ) : (
        <>
          <img src={content.url}  alt="" className={` max-h-56 ${isVisible(content.content_type === ContentType.IMAGE)}`} />

        <div className={`mx-28 pt-10 ${isVisible(content.content_type === ContentType.DOCUMENT)}`}>
          <Document file={content.url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} />
          </Document>
          {/* <p>Page {1}</p> */}
        </div>

        <div className={` ${isVisible(content.content_type === ContentType.YOUTUBE_VIDEO)} sm:p-10 pb-0`}>
          <ReactPlayer
            url={content.url}
            width={100 +'%'}
            controls={true} 
          />
        </div>

        {content.content_type === ContentType.VIDEO && <div className={`sm:p-10 pb-0`}>
          <Player 
            playsInline
            poster="https://media.istockphoto.com/id/1340716614/photo/abstract-icon-representing-the-ecological-call-to-recycle-and-reuse-in-the-form-of-a-pond.jpg?s=1024x1024&w=is&k=20&c=qCgLki6nJ_PUS_4SEQ8Jwrot5BM4XPRUqMP8KkWjFH8="
            src={
              content.url ? content.url : 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
            }
            autoPlay
           
          />
        </div>}
 
         {content.content_type === ContentType.QUESTION && <div
            className={'py-4 mx-auto'}
          >
            <QuestionAdd content={content.id} />
          </div>}
        </>
      )}
    </CustomCard>
  );
};

export default ContentDetail;
