import { useForm } from "react-hook-form";
import SubjectAdd from "../../components/tutors/subject/SubjectAdd";
import SubjectList from "../../components/tutors/subject/SubjectList";
import { Subject } from "../../components/tutors/subject/SubjectService";
import useSubjectService from "../../components/tutors/subject/SubjectService";
import { useEffect, useState } from "react";
import { Modal } from "antd";

const SubjectPage = () => {
  const subjectForm = useForm<Subject>({});
  const [createSubject, setCreateSubject] = useState(false)
  const subjectService = useSubjectService();
  const [data, setData] = useState<Subject[]>([]);


  const cancle = () => {
    setCreateSubject(false)
    subjectForm.reset()
  }

  const getSubject = () => {
    subjectService
      .getSubjects()
      .then((value) => [setData(value.data.results)]);
  };

  useEffect(() => {
    getSubject();
  }, [getSubject()]);

  return (
    <>
      <div className="flex container mx-auto">
        <div className="w-full sm:w-1/2 2xl:w-3/4">
          <div className="flex py-1 gap-2 justify-evenly items-center">
            <h1 className="text-2xl font-bold text-center">Subject List</h1>
            <button className="text-white px-3 py-1 text-lg rounded-lg border border-gray-300  bg-custom_orange-700  hover:bg-black  transition duration-300 ease-out hover:ease-out md:hidden "  onClick ={(() => setCreateSubject(!createSubject))} >Add New</button>
          </div>
          <SubjectList  />
        </div>
        <div className='w-full sm:w-1/2 hidden md:block 2xl:w-1/4'>
          <div className="col-span-3">
            <SubjectAdd />
          </div>
        </div>
      </div>
      <Modal open={createSubject && (window.innerWidth < 768)} onCancel={cancle} footer={[]}>
        <SubjectAdd />
      </Modal>
    </>
  );
};
export default SubjectPage;
