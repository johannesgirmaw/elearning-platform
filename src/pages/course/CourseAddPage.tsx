import CourseAdd from "../../components/courses/course/CourseAdd";
import useTranslation from "../../utils/translation";
import { useLocation, useParams } from "react-router-dom";
import { Course } from "../../types/Course";
interface Props {
  courseData?: Course;
  searchCourses?: () => void;
} 
function CourseAddPage(prop: Props) {
  const {translate} = useTranslation()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
 
  return (
    <>
      <CourseAdd  />
    </>
  );
}

export default CourseAddPage;
