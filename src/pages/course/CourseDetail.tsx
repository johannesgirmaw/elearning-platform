import circle from "../../assets/images/circle-shape.webp";
import author11 from "../../assets/images/author-11.webp";
import { FiPlay } from "react-icons/fi";
import Footer from "../../components/layout/footer/Footer";
import { useState, useEffect } from "react";
import useTranslation from "../../utils/translation";
import useCourseService from "../../components/courses/course/CourseService";
import { useParams } from "react-router-dom";
import { CourseEnrolled } from "../../types/Course";
import { CoursePayment } from "../../components/customs/custom-components/CoursePayment";
import { CourseDetailTabs } from "../../components/customs/custom-components/CourseDetailTabs";
import { LocalStorage } from "../../utils/localstorage";
import { Rating } from "../../components/customs/custom-components/Star";
import useLoading from "../../components/customs/loading/LoadingHook";
import Header from "../../components/layout/header/Header";

function CourseDetail() {
  const { translate } = useTranslation();
  const courseService = useCourseService();
  const loading = useLoading();
  const [course, setCourse] = useState<CourseEnrolled>();
  let { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(window.location.href, "good food");
  }, []);
  useEffect(() => {
    const localstorage = new LocalStorage();
    localstorage.remove("enrolmentpage");
    loading.startLoading();
    courseService
      .getEnrolledCourse(id ? id : "")
      .then(({ data: courses }) => {
        setCourse(courses);
        loading.stopLoading();
      })
      .catch((error) => loading.stopLoading());
  }, [id]);

  const removeEnrollementPath = () => {
    localStorage.removeItem("enrolmentpage");
  };
  return (
    <>
      <Header title="Courses" underlined="Details" activeTab="course_detail" />
      <div className="container overflow-x-hidden pt-20 flex flex-wrap flex-col px-4 mx-auto xl:flex-row items-start">
        <div className="relative overflow-hidden basis-full mb-3 lg:basis-7/12">
          <div className="relative overflow-hidden">
            <img
              src={course?.course_image as string}
              alt={translate("about")}
              className="w-full rounded-xl"
            />
            {course?.category_names?.map((category) => (
              <span className="absolute bottom-5 left-5 bg-orange-400 text-sm px-6 rounded-md h-9 inline-block text-white leading-9 mt-2">
                {category}
              </span>
            ))}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img src={circle} alt="cirle" />
              <a
                href="https://www.youtube.com/watch?v=Wif4ZkwC0AM"
                className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white"
              >
                <FiPlay></FiPlay>
              </a>
            </div>
          </div>
          <h2 className="text-2xl font-medium mt-7 text-custom_black leading-6">
            {course?.name}
          </h2>
          <div className="flex items-center pt-2 justify-between">
            <div className="flex items-center mt-2">
              <img src={author11} alt="Author" className="w-12 rounded-full" />
            </div>
            <div className="flex-1 pl-4 pb-1">
              {course?.instructor.map((data) => (
                <a
                  key={data["id"]}
                  href={data["profile_picture"]}
                  className="text-lg font-medium text-custom_black inline-block leading-5 relative
                 after:content-['||'] after:text-custom_orange-900 after:text-2xl after:font-light after:relative after:m-4 after:-bottom-1"
                >
                  {data["first_name"]}
                </a>
              ))}
              <span className="text-sm font-normal text-custom_orange-900 inline-block leading-6">
                {course?.enrolled_count} Enrolled Students
              </span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm flex font-medium text-custom_black mr-1">
                {course?.rating}
                <Rating widthHeight="w-4 h-4" rating={course?.rating || 0} />
              </span>
            </div>
          </div>
        </div>
        <div className="lg:basis-5/12 w-full">
          <CoursePayment course={course} id={id} />
        </div>
        <div className="basis-full lg:basis-7/12">
          <CourseDetailTabs course={course} id={id} />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CourseDetail;
