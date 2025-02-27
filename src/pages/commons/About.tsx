import DownloadSection from "../../components/courses/download/DownloadSection";
import Footer from "../../components/layout/footer/Footer";
import about from '../../assets/images/about.webp';
import CustomText from "../../components/customs/custom-text/CustomText";
import CustomButton from "../../components/customs/custom-button/CustomButton";
import CustomCard from "../../components/customs/custom-card/CustomCard";
import { FiUser } from 'react-icons/fi';
import shape12 from "../../assets/images/shape-12.webp";
import author11 from "../../assets/images/author-11.webp";
import { AiFillStar } from "react-icons/ai";
import CustomCarousel from "../../components/customs/carousel/CustomCarousel";
import course1 from "../../assets/images/courses-01.webp";
import {FaStar, FaQuoteLeft} from "react-icons/fa"
import data from '../../components/customs/carousel/data.json';
import useTranslation from "../../utils/translation";
import useCarousel from "../../components/customs/carousel/carouselHook";
import { useEffect } from "react";
import Header from "../../components/layout/header/Header";

function About() {
  const {translate} = useTranslation()
  const carousel = useCarousel(1)

  useEffect(() => {
    carousel.updateChildren(data.resources, component)
  }, [carousel.width])

  const component = (data: {title: string, link: string, imageUrl: string}) =>
    (<CustomCard key={data.title}>
      <div className="">
        <div className="relative ">
          <img
            src={course1}
            alt=""
            className="block w-[90px] h-[90px] border-[1px] border-solid border-[rgba(48,146,85,0.2)] p-[8px] my-0 mx-auto max-w-full rounded-[50%]"
          />
          <i className=" w-[30px] h-[30px] leading-[30px] text-center bg-custom_orange-900 text-white text-[13px] rounded-[50%]  absolute bottom-[-13px] left-0 right-0 mx-auto my-0 flex justify-center place-items-center">
            {" "}
            <FaQuoteLeft />
          </i>
        </div>
        <span className="mt-[35px] text-[13px] font-700 text-[#ffba00] line-through mr-[5px] flex justify-center">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar className="text-[#d0d0d0]" />
        </span>
      </div>
      <div className="text-center pt-[15px]">
        <p className="font-normal text-[15px] text-[#52565b] mb-0">
          Lorem Ipsum has been the industry's standard dummy text since
          the 1500s, when an unknown printer took a galley of type and
          scrambled it to make type specimen book has survived not five
          centuries but also the leap into electronic.
        </p>
        <h4 className="font-medium text-[22px] mb-0 mt-[16px]">
          Sara Alexandra{" "}
        </h4>
        <span className="text-custom_orange-900 text-[14px] mt-[5px] block">
          Product Designer, USA
        </span>
      </div>
    </CustomCard>)

    return (
      <>
        <Header title={translate('about')} activeTab="about" />
        <div className="container mx-auto pt-20 columns-1 lg:columns-2">
          <div>
            <img src={about} alt={translate('about')} className="w-full rounded-xl" />
          </div>
          <div className="mt-12 max-w-lg lg:ml-auto">
            <h5 className="font-medium text-custom_orange-900 mb-5 text-xl">
              Welcom to eNisir
            </h5>
            <h2 className="text-4xl font-medium lg:text-3xl">
              You can join with eNisir and upgrade your skill for your{" "}
              <CustomText text="bright future." />
            </h2>
            <p className="mt-6 text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Blanditiis, doloremque tempore nihil assumenda quisquam debitis
              quis tenetur voluptates autem, perspiciatis recusandae fugiat sunt
              perferendis reiciendis sed et ipsum minus. Temporibus.
            </p>
            <CustomButton text="Start A Course" />
          </div>
        </div>
        <div className="pt-20 mt-7 container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
          <CustomCard>
            <div className="flex items-center">
              <div>
                <i className="group-hover:text-white group-hover:bg-custom_orange-900 w-20 h-20 leading-10 flex items-center justify-center rounded-full bg-custom_orange-100 text-custom_orange-900 text-4xl  transition-all duration-300 ease-in">
                  <FiUser size={20} />
                </i>
              </div>
              <div className="flex-1 pl-5">
                <h3 className="font-medium text-lg">Top Instructors</h3>
              </div>
            </div>
            <p className="mt-6 text-custom_black-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              quis vitae libero eaque consequatur recusandae perspiciatis nihil
              enim impedit possimus!
            </p>
            <p className="mt-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
              neque repellat deleniti? Dicta fugiat nulla quisquam laborum
              omnis, amet nobis neque ad inventore maiores, corrupti mollitia
              quia harum aut voluptatum.
            </p>
          </CustomCard>
          <CustomCard>
            <div className="flex items-center">
              <div>
                <i className="group-hover:text-white group-hover:bg-custom_orange-900 w-20 h-20 leading-10 flex items-center justify-center rounded-full bg-custom_orange-100 text-custom_orange-900 text-4xl  transition-all duration-300 ease-in">
                  <FiUser size={20} />
                </i>
              </div>
              <div className="flex-1 pl-5">
                <h3 className="font-medium text-lg">Top Instructors</h3>
              </div>
            </div>
            <p className="mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              quis vitae libero eaque consequatur recusandae perspiciatis nihil
              enim impedit possimus!
            </p>
            <p className="mt-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
              neque repellat deleniti? Dicta fugiat nulla quisquam laborum
              omnis, amet nobis neque ad inventore maiores, corrupti mollitia
              quia harum aut voluptatum.
            </p>
          </CustomCard>
          <CustomCard>
            <div className="flex items-center">
              <div>
                <i className="group-hover:text-white group-hover:bg-custom_orange-900 w-20 h-20 leading-10 flex items-center justify-center rounded-full bg-custom_orange-100 text-custom_orange-900 text-4xl  transition-all duration-300 ease-in">
                  <FiUser size={20} />
                </i>
              </div>
              <div className="flex-1 pl-5">
                <h3 className="font-medium text-lg">Top Instructors</h3>
              </div>
            </div>
            <p className="mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              quis vitae libero eaque consequatur recusandae perspiciatis nihil
              enim impedit possimus!
            </p>
            <p className="mt-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
              neque repellat deleniti? Dicta fugiat nulla quisquam laborum
              omnis, amet nobis neque ad inventore maiores, corrupti mollitia
              quia harum aut voluptatum.
            </p>
          </CustomCard>
        </div>
        <div className="mt-20 pt-20 container mx-auto bg-custom_orange-100 rounded-xl pb-12 md:px-14 px-24 relative">
          <img
            src={shape12}
            alt="shape8"
            className="hidden sm:inline-block absolute bottom-7 left-7 animate-custom-spin"
          />
          <img
            src={shape12}
            alt="shape8"
            className="hidden sm:inline-block absolute top-7 right-7 animate-custom-spin"
          />
          <div className="flex flex-wrap">
            <div className="max-w-md mt-6 pb-5 md:w-1/2">
              <h5 className="font-medium text-custom_orange-900 mb-5 text-lg md:text-xl">
                Become A Instructor
              </h5>
              <h2 className="font-medium mb-0 text-4xl md:text-2xl">
                You can join with eNisir as <CustomText text="a instructor?" />
              </h2>
            </div>
            <div className="max-w-md md:w-1/2 mr-auto md:ml-auto mt-7">
              <CustomButton text="Drop Information" />
            </div>
          </div>
        </div>
        <div className="py-20 container mx-auto">
          <h5 className="font-medium text-center text-custom_orange-900 mb-5 text-lg md:text-xl">
            Team Member's
          </h5>
          <h2 className="font-medium text-center mb-0 text-4xl md:text-2xl">
            eNisir Skilled <CustomText text="Instructor" />
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {/* block */}
            <div className="text-center mt-12 group">
              <img
                src={author11}
                alt="Author 11"
                className="group-hover:border-opacity-100 rounded-full p-2 border border-custom_orange-900 border-opacity-20 transition-all duration-300 ease-in"
              />
              <div className="pt-4">
                <div className="inline-flex items-center">
                  <span className="text-sm font-medium text-custom_black-200">
                    4.9
                  </span>
                  <i className="text-orange-300">
                    <AiFillStar />
                  </i>
                  <span className="text-sm font-normal text-gray-400">
                    (rating)
                  </span>
                </div>
                <h4 className="font-medium text-xl mb-0">Margarita James</h4>
                <span className="mt-3 text-custom_orange-900 block text-sm">
                  MSC, Instructor
                </span>
              </div>
            </div>
            {/* endblock */}
            {/* block */}
            <div className="text-center mt-12 group">
              <img
                src={author11}
                alt="Author 11"
                className="group-hover:border-opacity-100 rounded-full p-2 border border-custom_orange-900 border-opacity-20 transition-all duration-300 ease-in"
              />
              <div className="pt-4">
                <div className="inline-flex items-center">
                  <span className="text-sm font-medium text-custom_black-200">
                    4.9
                  </span>
                  <i className="text-orange-300">
                    <AiFillStar />
                  </i>
                  <span className="text-sm font-normal text-gray-400">
                    (rating)
                  </span>
                </div>
                <h4 className="font-medium text-xl mb-0">Margarita James</h4>
                <span className="mt-3 text-custom_orange-900 block text-sm">
                  MSC, Instructor
                </span>
              </div>
            </div>
            {/* endblock */}
            {/* block */}
            <div className="text-center mt-12 group">
              <img
                src={author11}
                alt="Author 11"
                className="group-hover:border-opacity-100 rounded-full p-2 border border-custom_orange-900 border-opacity-20 transition-all duration-300 ease-in"
              />
              <div className="pt-4">
                <div className="inline-flex items-center">
                  <span className="text-sm font-medium text-custom_black-200">
                    4.9
                  </span>
                  <i className="text-orange-300">
                    <AiFillStar />
                  </i>
                  <span className="text-sm font-normal text-gray-400">
                    (rating)
                  </span>
                </div>
                <h4 className="font-medium text-xl mb-0">Margarita James</h4>
                <span className="mt-3 text-custom_orange-900 block text-sm">
                  MSC, Instructor
                </span>
              </div>
            </div>
            {/* endblock */}
            {/* block */}
            <div className="text-center mt-12 group">
              <img
                src={author11}
                alt="Author 11"
                className="group-hover:border-opacity-100 rounded-full p-2 border border-custom_orange-900 border-opacity-20 transition-all duration-300 ease-in"
              />
              <div className="pt-4">
                <div className="inline-flex items-center">
                  <span className="text-sm font-medium text-custom_black-200">
                    4.9
                  </span>
                  <i className="text-orange-300">
                    <AiFillStar />
                  </i>
                  <span className="text-sm font-normal text-gray-400">
                    (rating)
                  </span>
                </div>
                <h4 className="font-medium text-xl mb-0">Margarita James</h4>
                <span className="mt-3 text-custom_orange-900 block text-sm">
                  MSC, Instructor
                </span>
              </div>
            </div>
            {/* endblock */}
            {/* block */}
            <div className="text-center mt-12 group">
              <img
                src={author11}
                alt="Author 11"
                className="group-hover:border-opacity-100 rounded-full p-2 border border-custom_orange-900 border-opacity-20 transition-all duration-300 ease-in"
              />
              <div className="pt-4">
                <div className="inline-flex items-center">
                  <span className="text-sm font-medium text-custom_black-200">
                    4.9
                  </span>
                  <i className="text-orange-300">
                    <AiFillStar />
                  </i>
                  <span className="text-sm font-normal text-gray-400">
                    (rating)
                  </span>
                </div>
                <h4 className="font-medium text-xl mb-0">Margarita James</h4>
                <span className="mt-3 text-custom_orange-900 block text-sm">
                  MSC, Instructor
                </span>
              </div>
            </div>
            {/* endblock */}
            {/* block */}
            <div className="text-center mt-12 group">
              <img
                src={author11}
                alt="Author 11"
                className="group-hover:border-opacity-100 rounded-full p-2 border border-custom_orange-900 border-opacity-20 transition-all duration-300 ease-in"
              />
              <div className="pt-4">
                <div className="inline-flex items-center">
                  <span className="text-sm font-medium text-custom_black-200">
                    4.9
                  </span>
                  <i className="text-orange-300">
                    <AiFillStar />
                  </i>
                  <span className="text-sm font-normal text-gray-400">
                    (rating)
                  </span>
                </div>
                <h4 className="font-medium text-xl mb-0">Margarita James</h4>
                <span className="mt-3 text-custom_orange-900 block text-sm">
                  MSC, Instructor
                </span>
              </div>
            </div>
            {/* endblock */}
            {/* block */}
            <div className="text-center mt-12 group">
              <img
                src={author11}
                alt="Author 11"
                className="group-hover:border-opacity-100 rounded-full p-2 border border-custom_orange-900 border-opacity-20 transition-all duration-300 ease-in"
              />
              <div className="pt-4">
                <div className="inline-flex items-center">
                  <span className="text-sm font-medium text-custom_black-200">
                    4.9
                  </span>
                  <i className="text-orange-300">
                    <AiFillStar />
                  </i>
                  <span className="text-sm font-normal text-gray-400">
                    (rating)
                  </span>
                </div>
                <h4 className="font-medium text-xl mb-0">Margarita James</h4>
                <span className="mt-3 text-custom_orange-900 block text-sm">
                  MSC, Instructor
                </span>
              </div>
            </div>
            {/* endblock */}
            {/* block */}
            <div className="text-center mt-12 group">
              <img
                src={author11}
                alt="Author 11"
                className="group-hover:border-opacity-100 rounded-full p-2 border border-custom_orange-900 border-opacity-20 transition-all duration-300 ease-in"
              />
              <div className="pt-4">
                <div className="inline-flex items-center">
                  <span className="text-sm font-medium text-custom_black-200">
                    4.9
                  </span>
                  <i className="text-orange-300">
                    <AiFillStar />
                  </i>
                  <span className="text-sm font-normal text-gray-400">
                    (rating)
                  </span>
                </div>
                <h4 className="font-medium text-xl mb-0">Margarita James</h4>
                <span className="mt-3 text-custom_orange-900 block text-sm">
                  MSC, Instructor
                </span>
              </div>
            </div>
            {/* endblock */}
            {/* block */}
            <div className="text-center mt-12 group">
              <img
                src={author11}
                alt="Author 11"
                className="group-hover:border-opacity-100 rounded-full p-2 border border-custom_orange-900 border-opacity-20 transition-all duration-300 ease-in"
              />
              <div className="pt-4">
                <div className="inline-flex items-center">
                  <span className="text-sm font-medium text-custom_black-200">
                    4.9
                  </span>
                  <i className="text-orange-300">
                    <AiFillStar />
                  </i>
                  <span className="text-sm font-normal text-gray-400">
                    (rating)
                  </span>
                </div>
                <h4 className="font-medium text-xl mb-0">Margarita James</h4>
                <span className="mt-3 text-custom_orange-900 block text-sm">
                  MSC, Instructor
                </span>
              </div>
            </div>
            {/* endblock */}
            {/* block */}
            <div className="text-center mt-12 group">
              <img
                src={author11}
                alt="Author 11"
                className="group-hover:border-opacity-100 rounded-full p-2 border border-custom_orange-900 border-opacity-20 transition-all duration-300 ease-in"
              />
              <div className="pt-4">
                <div className="inline-flex items-center">
                  <span className="text-sm font-medium text-custom_black-200">
                    4.9
                  </span>
                  <i className="text-orange-300">
                    <AiFillStar />
                  </i>
                  <span className="text-sm font-normal text-gray-400">
                    (rating)
                  </span>
                </div>
                <h4 className="font-medium text-xl mb-0">Margarita James</h4>
                <span className="mt-3 text-custom_orange-900 block text-sm">
                  MSC, Instructor
                </span>
              </div>
            </div>
            {/* endblock */}
          </div>
        </div>
        <DownloadSection />
        <div className=" mt-20 container mx-auto">
          <h5 className="font-medium text-center text-custom_orange-900 mb-5 text-lg md:text-xl">
            Student Testimonial
          </h5>
          <h2 className="font-medium text-center mb-0 text-4xl md:text-2xl">
            Feedback From <CustomText text="Student" />
          </h2>
        </div>
        <CustomCarousel {...carousel} />
        <Footer />
      </>
    );
}

export default About;
