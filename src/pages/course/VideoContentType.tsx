import { Player } from 'video-react';
import { ContentType } from '../../types/Enums';
import ReactPlayer from 'react-player/youtube';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useState } from 'react';
import { Content } from '../../types/Course';
import Questions from './Questions';

const VideoContentType = ({
  handleNext,
  handlePrevious,
  content,
  is_admin,
}: {
  content: Content;
  is_admin?: boolean;
  handlePrevious: () => void;
  handleNext: ()=> void;
}) => {

 

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  
  function onDocumentLoadSuccess(numPages: any) {
    setNumPages(numPages);
  }
  switch (content.content_type) {
    case ContentType.VIDEO.valueOf():
      return (
        <div className=" sm:p-10 pb-0">
          <Player
            playsInline
            poster="https://media.istockphoto.com/id/1340716614/photo/abstract-icon-representing-the-ecological-call-to-recycle-and-reuse-in-the-form-of-a-pond.jpg?s=1024x1024&w=is&k=20&c=qCgLki6nJ_PUS_4SEQ8Jwrot5BM4XPRUqMP8KkWjFH8="
            src={
              content.url ? content.url : 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
            }
            autoPlay
           
          />
        </div>
      );
    case ContentType.IMAGE.valueOf():
      return (
        <>
          <img src={content.url} width={400}  className="p-10" alt="No Image file" />
        </>
      );
    case ContentType.YOUTUBE_VIDEO.valueOf():
      return (
        <div className=" sm:p-10 pb-0">
          <ReactPlayer
            url={content.url}
            width={100 +'%'}
            controls={true} 
          />
        </div>
      );
    case ContentType.DOCUMENT.valueOf():
      return (
        <div className="mx-28 pt-10">
          <Document file={content.url} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Page {pageNumber}</p>
        </div>
      );
    case ContentType.QUESTION.valueOf():
      return (
        <>
          <Questions content={content} is_admin={is_admin} handlePrevious={handlePrevious} handleNext={handleNext}  />
        </>
      );
    default:
      return <></>;
  }
};

export default VideoContentType;
