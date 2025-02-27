import { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import useCourseService from '../../components/courses/course/CourseService';
import { ChapterModelSideNav, ContentSideNav, Course, CourseEnrolled } from '../../types/Course';
import { useParams } from 'react-router-dom';
import { useContentService } from '../../components/courses/content/ContentService';
import { ContentType } from '../../types/Enums';
import { isVisible } from '../../components/account/auth/authorization';
import { assignOrsetNull } from '../../utils/modal';
import { FaRegTimesCircle } from 'react-icons/fa';
import { BiMenu } from 'react-icons/bi';
import useChapterService from '../../components/courses/chapter/ChapterService';
import useLoading from '../../components/customs/loading/LoadingHook';
import VideoContentType from './VideoContentType';

function ContentView() {
    const [isHidden, setIsHidden] = useState(true)
    const [courseData, setCourseData] = useState<Course>()
    const [chapters, setChapters] = useState<ChapterModelSideNav[]>([]);
    const [contents, setContents] = useState<ContentSideNav[]>([]);
    const [chapterId, setChapterId] = useState('');
    const [content, setContentData] = useState<ContentSideNav>();
    const [contentId, setContentId] = useState('');
    const chapterService = useChapterService();
    const courseService = useCourseService();
    const contentService = useContentService();
    const loading = useLoading();
    let { id } = useParams();


    useEffect(() => {
        window.scrollTo(0, 0)
        if (contentId) {
            contentService
                .getAdminContent(contentId)
                .then(({ data: content }) => {
                    setContentData(content);
                })
                .catch((error) => loading.stopLoading());
        }
    }, [contentId]);

    useEffect(() => {
        if (chapterId && !contents.some(value => value.chapter === chapterId))
            contentService.getSidNavContents(chapterId).then(({ data: response }) => {
                if (response.results.length) {
                    setContents([...contents, ...response.results])
                    setContentId(response.results[0].id)
                }
            })
    }, [chapterId])

    useEffect(() => {
        courseService
            .getCourse(id ? id : '')
            .then(({ data: courses }) => {
                setCourseData(courses)
                chapterService.getSidNavChapters({ course_id: courses.id }).then(({ data: response }) => {
                    if (response.results.length) {
                        setChapters(response.results)
                        setChapterId(response.results[0].id)
                    }
                })
                loading.stopLoading();
            })
            .catch((error) => loading.stopLoading());
    }, [id]);

    return (
        <div className="flex h-full w-full flex-wrap md:px-10  pr-0 relative">
            <div className=" flex flex-col min-h-[50vh] max-md:pt-8 p-2 w-full lg:w-3/4 relative pb-24">

                {content && <VideoContentType
                    content={content}
                    handlePrevious={() => { }}
                    is_admin={true}
                    handleNext={() => { }}
                />}

                <div className={"px-3 self-start w-full md:px-10 " + isVisible(content?.content_type !==ContentType.QUESTION)}>
                    <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row">
                        <h2 className="lg:max-w-sm font-medium text-2xl text-custom_black-300 pt-3 mb-0">
                            {content?.title}
                        </h2>
                        <p className="flex items-center justify-center text-gray-500 md:self-end">
                            {' '}
                            <FiEye className="text-red-500 text-xl mr-1" />{' '}
                            <span className="text-red-500 text-xl mr-1">8,350</span>{' '}
                            Students are watching
                        </p>
                    </div>
                    <div className='w-full border-solid border-2 pt-2 p-2 rounded-md border-gray-300'>
                        <h1 className='font-semibold'>Description</h1>
                        <p>{content?.description}</p>
                    </div>
                </div>
            </div>
              <button
                    className='bg-transparent self-center md:hidden absolute z-50 right-0 top-1  px-3  rounded-lg'
                    children={isHidden ? <div className='flex items-center'>Content List <BiMenu size={28}  className='' /> </div>: <FaRegTimesCircle  size={28} className='font-bold text-red-700' />}
                    onClick={() => {
                      setIsHidden(!isHidden);
                    }}
                  />
              <div className={`w-full md:w-1/4 ${isHidden ? 'hidden' : ''} md:block bg-custom_orange-400 fixed right-0 h-full z-10 min-h-screen`}>
                <div className="bg-custom_orange-300 flex  py-4  lg:py-5 lg:items-start pl-6  flex-col">
                    <h3 className="text-lg font-medium mb-0  text-custom_black-200 md:text-2xl">
                        Course Content
                    </h3>
                    <span className="text-lg font-medium lg:pt-3 block text-custom_orange-900 md:text-xl">
                        {courseData?.chapters || 0} Chapters {courseData?.contents || 0} Contents
                    </span>
                </div>
                <div className="">
                    <div className="accordion" id="videoPlaylist">
                        {chapters.map((chapter) => (
                            <div key={chapter.id} className="accordion-item">
                                <button
                                    className={`border-0  text-left w-full border-b-2 flex justify-between ${chapter?.id === chapterId && 'text-custom_orange-900'} `}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    onClick={() => [
                                        assignOrsetNull(setChapterId, chapterId, chapter?.id),
                                    ]}
                                >
                                    <div className="py-4 lg:py-1">
                                        <p
                                            className={`pl-5 text-[15px] ${chapter?.id === chapterId
                                                ? 'text-custom_orange-900'
                                                : 'text-custom_black-200'
                                                }`}
                                        >
                                            {chapter?.chapter_name}: {chapter?.chapter_title}
                                        </p>
                                        <span className="pl-5 text-custom_black-700">
                                            {chapter.contents || "..."} contents
                                        </span>
                                    </div>
                                    <div className="pr-8 lg:pr-3">
                                        {chapter?.id === chapterId ? (
                                            <RiArrowDropUpLine className="text-2xl" />
                                        ) : (
                                            <RiArrowDropDownLine className="text-2xl" />
                                        )}
                                    </div>
                                </button>
                                {contents.filter(value => value.chapter === chapterId).map((content) => (
                                    <div
                                        key={content.id}
                                        className={`${chapter?.id === chapterId
                                            ? ''
                                            : 'hidden'
                                            }`}
                                    >
                                        <nav

                                        >
                                            <button
                                                className={` border-b-2 py-3 lg:py-1 pr-7 relative cursor-pointer
                                                           `}
                                                onClick={() => {
                                                    if (contentId !== content.id) {
                                                        setContentId(content?.id);
                                                        setIsHidden(true);
                                                    }
                                                }}
                                            >
                                                <span className="p-2 absolute top-[10px] left-[20px] ">
                                                </span>
                                                <span
                                                    className={`p-2 absolute top-[13px] left-[48px] w-[13px] h-[13px] rounded-[50%]  border-[3px] ${contentId === content.id
                                                        ? 'bg-custom_orange-900'
                                                        : ''
                                                        } border-custom_orange-900`}
                                                ></span>
                                                <p className=" pl-20   p-2">
                                                    {content?.content_number}. {content?.title}
                                                </p>
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
    );
}

export default ContentView;
