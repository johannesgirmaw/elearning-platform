import { useEffect, useState } from "react";
import useTranslation from "../../utils/translation";
import { useOutletContext, useParams } from "react-router-dom";
import { Tabs, TabsProps } from "antd";
import CourseAddDetail from "../../components/courses/course/CourseAddDetail";
import InstructerReview from "../../components/commons/Reviewers/InstructorReview";
import UserCourseProgressList from "../../components/courses/course/UserCourseProgressList";
import useCourseService from "../../components/courses/course/CourseService";

function CourseDetailInstructor() {
  const { translate } = useTranslation();
  const params = useParams()
  const context: any = useOutletContext();
  const courseService = useCourseService();
  let id = params.id

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Contents",
      children: <CourseAddDetail  id={id} />,
    },
    {
      key: "2",
      label: "Reviews",
      children: <InstructerReview id={id} />,
    },
    {
      key: "3",
      label: "Users Result and Progress",
      children: <UserCourseProgressList course={id} />,
    },
      // {
      //   key: "4",
      //   label: "Files",
      //   children: "Files",
      // },
      // {
      //   key: "5",
      //   label: "Reports",
      //   children: "Reports",
      // },
  ];

  const onTabChange = (activeKey: string) => {
      courseService.setActiveTab(activeKey)
  }

  useEffect(() => {
    context.setTitle("Course Detail")
  }, []);

  return (
    <>
     <Tabs className="md:px-5 pt-2 w-full px-1" onChange={onTabChange} destroyInactiveTabPane defaultActiveKey={courseService.activeTab} items={items}  />
    </>
  );
}

export default CourseDetailInstructor;
