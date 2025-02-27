import useTranslation from "../../../utils/translation";
import ContentList from "../content/ContentList";
import ChapterList from "../chapter/ChapterList";
import useCustomTab from "../../customs/custom-tabs/useCustomTab";
import CustomCard from "../../customs/custom-card/CustomCard";
import CustomText from "../../customs/custom-text/CustomText";
import CustomTabs from "../../customs/custom-tabs/CustomTabs";
import { useEffect, useState } from "react";
import { Course } from "../../../types/Course";
import useCourseService from "./CourseService";

function CourseAddDetail({id}: {id?: string}) {
  const { translate } = useTranslation();
  const [courseData, setCourseData] = useState<Course>()
  const courseService = useCourseService();
  const handleAddTab = (tabName: string, id: string) => {

    const tab = {
      name: tabName,
      element: <ContentList chapter_id={id} />,
      isClosable: true,
      id: id,
    }
    customTab.handleAddTab(tab, true);
  };

  useEffect(() => {
    id && courseService.getCourse(id).then(({data : data}) => {
      setCourseData(data)
    })
  },[])


  const tab = {
    name: "Chapter Lists",
    element: <ChapterList addTab={handleAddTab} />,
    isClosable: false,
    id: "",
  }

  const customTab = useCustomTab({ tabs: [tab] });


  return (
    <>
      <div className="container flex flex-col ">
        <CustomCard className="mt-6">
          <h1 className="mb-5 text-2xl font-bold">
            Course {translate("name")}: <CustomText text={courseData?.name} />
          </h1>
          <p>
            {courseData?.description}
          </p>
        </CustomCard>
        <div className="flex flex-wrap flex-1 my-5 ">
          {/* <CourseSideBar active="Contents" hide={hide} setHide={setHide} /> */}
          <div className="flex-1 w-full">
            <CustomTabs {...customTab} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseAddDetail;
