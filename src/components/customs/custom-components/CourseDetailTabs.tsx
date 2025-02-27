import { useState } from "react";
import useTranslation from "../../../utils/translation";
import { Instructor } from "../../courses/Instructer/Instructor";
import { Reviewers } from "../../commons/Reviewers/Reviewers";
import CustomButton from "../custom-button/CustomButton";
import { CourseEnrolled } from "../../../types/Course";

interface Props {
    course?: CourseEnrolled;
    id?: string
}

export const CourseDetailTabs = (props: Props) => {
  const [tab, setTab] = useState('description');
  const { translate } = useTranslation();

  const tabs: { [id: string]: JSX.Element } = {
    description: <CourseDescription description={props.course?.description} />,
    instructor: <Instructor instructors={props.course?.instructor} />,
    reviews: <Reviewers id={props.id} />,
  };

  const changeTab = (selTab: string) => {
    setTab(selTab);
  };

    return <div className="pt-7">
        <div className="bg-custom_light_green rounded-lg pt-1">
            <ul className="flex justify-start">
                <li className="pb-0 p-2">
                    <CustomButton
                        text={translate('description')}
                        fun={() => changeTab('description')}
                        form={tab !== 'description' ? 'edge-transparent' : ''}
                    />
                </li>
                <li className="p-2 pb-0">
                    <CustomButton
                        text="Instructor"
                        fun={() => changeTab('instructor')}
                        form={tab !== 'instructor' ? 'edge-transparent' : ''}
                    />
                </li>
                <li className="p-2 pb-0">
                    <CustomButton
                        text="Reviews"
                        fun={() => changeTab('reviews')}
                        form={tab !== 'reviews' ? 'edge-transparent' : ''}
                    />
                </li>
            </ul>
        </div>
        {tabs[tab]}
    </div>
}

function CourseDescription({ description }: { description: any }) {
    const { translate } = useTranslation();
    return (
      <div className="mb-4">
        <h3 className="text-2xl font-medium text-custom_black mb-0 mt-6">
          {translate('description')}:
        </h3>
        <p className="text-gray-500 mt-4">{description}</p>
  
        {/* <h3 className="text-2xl font-medium text-custom_black mb-0 mt-6">
          Curriculum:
        </h3>
        <p className="text-gray-500 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          veniam maxime ut dolor, quisquam aliquam. Eius, sed! Ipsa adipisci
          cumque, quisquam reiciendis tempora, quibusdam molestiae rem nam
          deleniti, labore minus?
        </p>
        <h3 className="text-2xl font-medium text-custom_black mb-0 mt-6">
          Certification:
        </h3>
        <p className="text-gray-500 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          veniam maxime ut dolor, quisquam aliquam. Eius, sed! Ipsa adipisci
          cumque, quisquam reiciendis tempora, quibusdam molestiae rem nam
          deleniti, labore minus?
        </p> */}
      </div>
    );
  }