// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { AiFillLock } from 'react-icons/ai';
import DashboardHeader from '../../components/commons/dashboard-header/DashboardHeader';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import useCourseService from '../../components/courses/course/CourseService';
import { Chapter, ChapterModelSideNav, ContentSideNav, CourseEnrolled } from '../../types/Course';
import { useParams } from 'react-router-dom';
import { useContentService } from '../../components/courses/content/ContentService';
import { ContentType } from '../../types/Enums';
import VideoContentType from './VideoContentType';
import useProgressService from '../../components/courses/course-progress/ProgressService';
import { isVisible } from '../../components/account/auth/authorization';
import { BiMenu } from 'react-icons/bi';
import { FaRegTimesCircle } from 'react-icons/fa';
import useChapterService from '../../components/courses/chapter/ChapterService';
import useLoading from '../../components/customs/loading/LoadingHook';
import Loading from '../../components/customs/loading/Loading';

function Video() {
  const [isHidden, setIsHidden] = useState(true)
  const [courseData, setCourseData] = useState<CourseEnrolled>();
  const [chapters, setChapters] = useState<ChapterModelSideNav[]>([]);
  const [contents, setContents] = useState<ContentSideNav[]>([]);
  const [chapterId, setChapterId] = useState('');
  const [content, setContentData] = useState<ContentSideNav>();
  const [contentId, setContentId] = useState('');
  const [isNext, setIsNext] = useState<boolean>()


  const chapterService = useChapterService();
  const [progressId, setProgressId] = useState('');
  const progressService = useProgressService();
  const courseService = useCourseService();
  const contentService = useContentService();
  const loading = useLoading();
  let { id } = useParams();

  const handleNextContentData = () => {
    progressService
      .updateContentProgress(contentId, progressId)
      .then((onSuccess) => {
        if (onSuccess) {
          let index = contents.findIndex(value => value.id === contentId)
          if (index > -1 && (index + 1) < contents.length){
            setContentId(contents[index + 1].id)
          }else {
            let index = chapters.findIndex(value => value.id = chapterId)
            if (index > -1 && (index + 1) < chapters.length){
              setChapterId(chapters[index + 1].id)
            }
          }
        }
      });
  };
  const handlePreviousContentData = () => {
    let index = contents.findIndex(value => value.id === contentId)
    if(index)  setContentId(contents[index - 1].id) 
    else {
      index = chapters.findIndex(value => value.id === chapterId);
      index && setChapterId(chapters[index - 1].id);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0)
    if (contentId) {
      loading.startLoading();
      contentService
        .getContent(contentId)
        .then(({ data: content }) => {
          loading.stopLoading();
          setContentData(content);
          setProgressId(content.progress_id);
          contents.filter(value => {
            if(value.id === content.id){
              value.progress_id = content.progress_id
            }
          })
          setContents(contents)
          if (chapterId !== content?.chapter) {
            setChapterId(content?.chapter);
          }
        })
        .catch((error) => loading.stopLoading());
    }
  }, [contentId]);

  useEffect(() => {
    if(chapterId && !contents.some(value => value.chapter === chapterId)){
      loading.startLoading();
      contentService.getSidNavContents(chapterId).then(({data: response}) => {
        loading.stopLoading();
      if(response.results.length){
        setContents( isNext ? [...contents, ...response.results]: [...response.results, ...contents])     
        chapters.filter(value => {
          if(value.id === chapterId && !value.progress_id){
            value.progress_id = "progress"
            }
          })
          let content = isNext === undefined ? response.results.find(value => value.id === courseData?.last_content) : response.results[0]
          if (content){
            setContentId(content.id)
            setProgressId(content?.progress_id);
          }
        }
      }).catch(loading.stopLoading)
    }
  },[chapterId])

  useEffect(() => {
    loading.startLoading()
    courseService
      .getEnrolledCourse(id ? id : '')
      .then(({ data: courses }) => {
        chapterService.getSidNavChapters({course_id: courses.id}).then(({data: response}) => {
          if (response.results.length){
            setCourseData(courses);
            setChapters(response.results)
            setChapterId(courses.last_chapter)
          }
          loading.stopLoading();
        }
        ).catch(loading.stopLoading)
      })
      .catch((error) => loading.stopLoading());
  }, [id]);

  return (
    <div>
      <DashboardHeader title='Content' />
            <div className="flex h-full w-full flex-wrap md:px-10  pr-0 relative">
              <div className=" flex flex-col min-h-[50vh] pt-8 w-full lg:w-3/4 relative pb-24">
                <Loading {...loading} />
                 {content && <VideoContentType
                    content={content} 
                    handlePrevious={handlePreviousContentData} 
                    handleNext={handleNextContentData}  
                  />}

                <div className={"px-3 self-start w-full md:px-10 " + isVisible(content?.content_type !==ContentType.QUESTION)}>
                  <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row">
                    <h2 className="lg:max-w-sm font-medium text-2xl text-custom_black-300 mt-3 mb-0">
                      {content?.title}
                    </h2>
                    <p className="flex items-center justify-center text-gray-500 md:self-end">
                      {' '}
                      <FiEye className="text-red-500 text-xl mr-1" />{' '}
                      <span className="text-red-500 text-xl mr-1">8,350</span>{' '}
                      Students are watching
                    </p>
                  </div>
                  <div className='w-full border-solid border-2 mt-2 p-2 rounded-md border-gray-300'>
                    <h1 className='font-semibold'>Description</h1>
                    <p>{content?.description}</p>
                  </div>
                </div>
                <div className={"flex justify-evenly w-full  mb-5 px-10 absolute bottom-1 "+ isVisible(content?.content_type !==ContentType.QUESTION)}>
                  <div className='mr-3 '>
                  <button
                    className='bg-gray-200 self-center text-custom_orange-800 px-3 py-2 mt-3 rounded-lg'
                    children={'Previous'}
                    onClick={() => {
                      setIsNext(false);
                      handlePreviousContentData()
                    }}
                    
                  />
                  </div>
                  <div >
                  <button
                    className='bg-gray-200 self-center text-custom_orange-800 px-3 py-2 mt-3 rounded-lg'
                    children={'Next'}
                    onClick={() => {
                      handleNextContentData();
                      setIsNext(true);
                    }}
                  />
                  </div>
                </div>
               
              </div>
              <button
                    className='bg-transparent self-center md:hidden absolute z-50 right-0 top-1  px-3  rounded-lg'
                    children={isHidden ? <div className='flex items-center'>Content List <BiMenu size={28}  className='text-custom_orange-800' /> </div>: <FaRegTimesCircle size={28} className='text-white font-bold' />}
                    onClick={() => {
                      setIsHidden(!isHidden);
                    }}
                  />
              <div className={`w-full lg:w-1/4 ${isHidden ? 'hidden' : ''} md:block bg-custom_orange-400 fixed right-0 h-full z-10 min-h-screen`}>
                <div className="bg-custom_orange-300 flex justify-between items-center  py-4  lg:py-5 lg:items-start pl-6  lg:flex-col">
                  <h3 className="text-lg font-medium mb-0  text-custom_black-200 md:text-2xl">
                    Course Content
                  </h3>
                  <span className="text-lg font-medium lg:mt-3 block text-custom_orange-900 md:text-xl">
                    {courseData?.contents} Lessons ({courseData?.durations?.slice(0, -3)} hr)
                  </span>
                </div>
                <div className="">
                  <div className="accordion" id="videoPlaylist">
                    {/* <!-- Accordion Items Start  --> */}

                    {chapters.map((chapter) => (
                      <div key={chapter.id} className="accordion-item">
                        <button
                          disabled={
                           chapter.progress_id === null
                          }
                          className={`border-0  text-left w-full border-b-2 flex justify-between  ${
                            chapter.progress_id === null 
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          } ${
                            chapter?.id === chapterId
                              ? 'text-custom_orange-900'
                              : ''
                          } `}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          onClick={() => [
                            setChapterId(chapter?.id),
                          ]}
                        >
                          <div className="py-4 lg:py-1">
                            <p
                              className={`pl-5 text-[15px] ${
                                chapter?.id === chapterId
                                  ? 'text-custom_orange-900'
                                  : 'text-custom_black-200'
                              }`}
                            >
                              {chapter?.chapter_name}: {chapter?.chapter_title}
                            </p>
                            <span className="pl-5 text-custom_black-700">
                              {/* 01 hour 48 minutes */}
                              {chapter.contents} Lesson {chapter?.durations?.slice(0,-3)||0}hr
                            </span>
                          </div>
                          <div className="pr-8 lg:pr-3">
                            {chapter?.id === chapterId ? (
                              <RiArrowDropUpLine className="text-2xl" />
                            ) : (
                              <RiArrowDropDownLine className="text-2xl" />
                            )}
                            {chapter?.progress_id ? (
                              ''
                            ) : (
                              <AiFillLock></AiFillLock>
                            )}
                          </div>
                        </button>
                        {contents.filter(value => value.chapter === chapterId).map((content) => (
                          <div
                            key={content.id}
                            className={`${
                              chapter?.id === chapterId
                                ? ''
                                : 'hidden'
                            }`}
                          >
                            <nav
                              
                            >
                              <button
                                className={` border-b-2 py-3 lg:py-1 pr-7 relative  ${
                                  content?.progress_id
                                    ? 'cursor-pointer'
                                    : 'opacity-50 cursor-not-allowed'
                                } `}
                                disabled={content.progress_id === null}
                                onClick={() => {
                                    if (contentId !== content.id) {
                                      setContentId(content?.id);
                                      setIsHidden(!isHidden);
                                    }
                                }}
                              >
                                <span className="p-2 absolute top-[10px] left-[20px] ">
                                  {content?.progress_id !==null ? (
                                    ''
                                  ) : (
                                    <AiFillLock></AiFillLock>
                                  )}
                                </span>
                                <span
                                  className={`p-2 absolute top-[13px] left-[48px] w-[13px] h-[13px] rounded-[50%]  border-[3px] ${
                                    contentId === content.id
                                      ? 'bg-custom_orange-900'
                                      : ''
                                  } border-custom_orange-900`}
                                ></span>
                                <p className=" pl-20   p-2">
                                  {content?.content_number}. {content?.title}
                                </p>
                                <span className=" pl-16 text-custom_black-700">
                                  {content.duration?.slice(0, -3) || 0} hour
                                </span>
                              </button>
                            </nav>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Video;
