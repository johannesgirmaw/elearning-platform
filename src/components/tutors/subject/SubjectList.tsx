import { useEffect, useState } from 'react';
import Loading from '../../customs/loading/Loading';
import useLoading from '../../customs/loading/LoadingHook';
import { FaEllipsisV, FaRedo, FaRegSquare, FaTrashAlt } from 'react-icons/fa';
import CustomCard from '../../customs/custom-card/CustomCard';
import { assignOrsetNull } from '../../../utils/modal';
import { useOutletContext } from 'react-router-dom';
import { Checkbox } from 'antd';
import useToast from '../../customs/toast/ToastHook';
import { Modal } from '../../commons/modal/Modal';
import useSubjectService, { Subject } from './SubjectService';
import SubjectAdd from './SubjectAdd';

function SubjectList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedData, setSelectedData] = useState<Subject>();
  const [addNew, setAddNew] = useState(false);
  const subjectservice = useSubjectService();

  const loading = useLoading();
  const context: any = useOutletContext();
  const [openModel, setOpenModel] = useState('');
  const toast = useToast()

  const deleteSubject = async () => {
    if(selectedData){
    let id = selectedData.id;
    setSelectedData(undefined)
    subjectservice.deleteSubject(id).then(value => {
      searchSubjects()
      setOpenModel('')
    });}
  };

  const cancel = () => {
    setAddNew(false);
    setSelectedData(undefined);
  }

  useEffect(() => {
    context.setTitle("Subjects")
  }, [])

  useEffect(() => {
    searchSubjects()
  }, []);

  const searchSubjects = () => {
    loading.startLoading();
    subjectservice
      .getSubjects()
      .then(({ data: result }) => {

        setSubjects(result.results);
        loading.stopLoading();
      })
      .catch((error) => loading.stopLoading());
  }
  
  return (
    <>
      <div className="flex p-2 md:mx-10">
        <div className='flex-wrap w-full pt-2 md:p-4' >
          <div className='flex justify-between gap-2'>
            <h1 className="text-2xl font-bold text-left text-custom_orange-800">Subjects</h1>

            <button className="text-white text-md rounded-[30px] border border-gray-300  bg-custom_orange-700  hover:bg-black  transition duration-300 ease-out hover:ease-out md:hidden  px-[10px] py-0" onClick={(() => setAddNew(!addNew))} >Add New</button>
          </div>
          <div className="flex flex-row gap-4 py-3 text-gray-500">

            <Checkbox />
            <i onClick={() => searchSubjects()} className='cursor-pointer'>
              <FaRedo />
            </i>
            <i>
              <FaEllipsisV />
            </i>
            {selectedData && <FaTrashAlt className='p-0' onClick={() => setOpenModel(selectedData.id)} />}
          </div>
          <div
            className={`fixed top-0 left-0 right-0 z-50
         bg-slate-300 bg-opacity-80 flex items-center justify-center
           w-full p-4 
           overflow-x-hidden 
           overflow-y-auto md:inset-0 h-modal md:h-full  transition ease-in-out duration-1000 ${openModel === '' ? 'hidden' : 'block'
              }`}
          >
            <Modal setOpenModel={setOpenModel} deleteMethod={deleteSubject} />
          </div>
          <div className="relative flex flex-col gap-4 mb-10 md:mr-10">
            <Loading {...loading} />
            {subjects.map((subject) => (
              <div onClick={() => { assignOrsetNull(setSelectedData, selectedData, subject); setAddNew(!addNew) }} key={subject.id}>
                {' '}
                <CustomCard className={`${selectedData?.id === subject.id && ' border-custom_orange-900 '}`}>
                  <h1 className="mb-2 font-medium text-gray-500">
                    {subject.subject_name}
                  </h1>
                  <div className="flex flex-col pl-3 justify-between border-custom_orange-900 border-solid border-l-[4px]">
                    <p className='font-semibold'>{subject.serial_number}</p>
                    <p className='text-sm text-gray-500 '>{subject.description}</p>
                  </div>
                </CustomCard>{' '}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default SubjectList;
