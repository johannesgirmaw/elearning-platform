import { useEffect, useState } from 'react';
import Loading from '../../customs/loading/Loading';
import useLoading from '../../customs/loading/LoadingHook';
import { Bank } from '../../../types/BankItem';
import { FaEllipsisV, FaRedo, FaRegSquare, FaTrashAlt } from 'react-icons/fa';
import CustomCard from '../../customs/custom-card/CustomCard';
import BankAdd from './BankAdd';
import { assignOrsetNull } from '../../../utils/modal';
import { useOutletContext } from 'react-router-dom';
import { Checkbox } from 'antd';
import useBankService from './BankService';
import useToast from '../../customs/toast/ToastHook';
import { Modal } from '../../commons/modal/Modal';
import useBankApi from './BankApi';

function BanksList() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedData, setSelectedData] = useState<Bank>();
  const [addNew, setAddNew] = useState(false);
  const bankservice = useBankService();

  const loading = useLoading();
  const context: any = useOutletContext();
  const [openModel, setOpenModel] = useState('');
  const toast = useToast()
  const bankApi = useBankApi();

  const deleteBank = async () => {
    let id = openModel === '' ? openModel : '';
    setSelectedData(undefined)
    bankApi.deleteBank_({
      id: openModel ? openModel : '',
      setOpenModel,
      setBanksList: setBanks,
    }).then(value => {
      searchBanks()
    });
  };

  const cancel = () => {
    setAddNew(false);
    setSelectedData(undefined);
  }

  useEffect(() => {
    context.setTitle("Banks")
  }, [])

  useEffect(() => {
    searchBanks()
  }, []);

  const searchBanks = () => {
    loading.startLoading();
    bankservice
      .getBanks({ position: null, isHome: false })
      .then(({ data: result }) => {

        setBanks(result.results);
        loading.stopLoading();
      })
      .catch((error) => loading.stopLoading());
  }
  return (
    <>
      <div className="flex md:mx-10 p-2">
        <div className='w-full flex-wrap pt-2 md:p-4' >
          <div className='flex gap-2 justify-between'>
            <h1 className="text-custom_orange-800 text-2xl font-bold text-left">Banks</h1>

            <button className="text-white text-md rounded-[30px] border border-gray-300  bg-custom_orange-700  hover:bg-black  transition duration-300 ease-out hover:ease-out md:hidden  px-[10px] py-0" onClick={(() => setAddNew(!addNew))} >Add New</button>
          </div>
          <div className="flex flex-row gap-4 py-3 text-gray-500">

            <Checkbox />
            <i onClick={() => searchBanks()} className='cursor-pointer'>
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
            <Modal setOpenModel={setOpenModel} deleteMethod={deleteBank} />
          </div>
          <div className="md:mr-10 mb-10 flex relative flex-col gap-4">
            <Loading {...loading} />
            {banks.map((bank) => (
              <div onClick={() => { assignOrsetNull(setSelectedData, selectedData, bank); setAddNew(!addNew) }} key={bank.id}>
                {' '}
                <CustomCard className={`${selectedData?.id === bank.id && ' border-custom_orange-900 '}`}>
                  <h1 className="text-gray-500 mb-2 font-medium">
                    {bank.bank_name}
                  </h1>
                  <div className="flex flex-col pl-3 justify-between border-custom_orange-900 border-solid border-l-[4px]">
                    <p className='font-semibold'>{bank.account_number}</p>
                    <p className='text-sm text-gray-500 '>{bank.description}</p>
                  </div>
                </CustomCard>{' '}
              </div>
            ))}
          </div>
        </div>
        <div className='w-2/5 hidden md:block p-4'>
          <div className="col-span-3">
            <BankAdd bankDetail={selectedData} cancel={cancel} searchBanks={searchBanks} />
          </div>
        </div>
      </div>

    </>
  );
}
export default BanksList;
