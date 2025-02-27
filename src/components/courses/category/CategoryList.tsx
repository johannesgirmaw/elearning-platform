import { useEffect, useState } from 'react';
import useCategoryApi from './CategoryApi';
import useCategoryService from './CategoryService';
import { FaEllipsisV, FaRedo, FaTrashAlt } from 'react-icons/fa';
import { Button, Card, Checkbox, Popconfirm, Tooltip } from 'antd';
import { Category } from '../../../types/Category';
import CustomCard from '../../customs/custom-card/CustomCard';
import { assignOrsetNull } from '../../../utils/modal';
import SearchBar from '../../commons/search-bar/SearchBar';
import { usePagination } from '../../customs/pagination/usePagination';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { componentType } from '../../../types/Enums';
import Loading from '../../customs/loading/Loading';
import useLoading from '../../customs/loading/LoadingHook';
import CustomPopConfirm from '../../customs/custom-modals/CustomPopConfirm';
import { BsPin, BsPinFill } from 'react-icons/bs';

const CatagoryList = (props: any) => {
  let pageSizeList = [5, 10, 20, 25];
  const [categories,setCategoriesList] = useState<Category[]>([]);
  const loading = useLoading();
  const categoryService = useCategoryService();
  const {selectedData, setSelectedData} = props;
  const paginator = usePagination({ps:5});
  const [openModel, setOpenModel] = useState('');
  const categoryApi = useCategoryApi();
  const deleteCategory = (id: string) => {
    categoryApi.deleteCat({
      id,
      setCategoriesList,
    }).then(value => {
      searchCategories()
    });
  };
  const componets: SearchComponentProps[] = [
    {
			placeholder: "Search",
			key: "search",
			type: componentType.TEXT,
		},
  ]

  useEffect(() => {
    searchCategories()
  }, [paginator.filterData, props.search])

  const onConfirm = (id: string) => {
    categoryService.categoryPatch(id, "pin_unpin").then((value) => {
      searchCategories();
    })
  }

  const searchCategories = () => {
    loading.startLoading()
    categoryApi.getCat(paginator.filterData,
      setCategoriesList).then(()=>{
        loading.stopLoading()
      }).catch(()=>{
        loading.stopLoading()
      });
  }

  return (
    <>
      <div className='flex gap-2 flex-wrap  items-center pt-4'>
        <h1 className=" text-custom_orange-800 text-2xl font-bold">
          Category List
        </h1> 
        <button className="text-white px-3 py-1 text-lg rounded-lg border border-gray-300  bg-custom_orange-700  hover:bg-black  transition duration-300 ease-out hover:ease-out md:hidden "  onClick ={(() => props.setAddNew(true))} >Add New</button>
          <SearchBar  filteredData={paginator.filterData} components={componets} handleChange={paginator.handleChange}   />
      </div>
      <div className="flex flex-row gap-4 items-center py-3 text-gray-500">
            <Checkbox  />

            <button onClick={searchCategories}>
            <i>
              <FaRedo />
            </i>
            </button>
            <i>
              <FaEllipsisV />
            </i>
             {selectedData && <Button className='border-none p-0'
                                onClick={() => setOpenModel(selectedData.id)} ><FaTrashAlt className='p-0' /></Button>}
          </div>   
      <Card className="flex flex-row overflow-y-auto  max-h-full  p-2 ">
     
        <div className='flex gap-2 flex-wrap pb-2 relative'>
          <Loading {...loading} />
        {categories?.map((category) => (
            <div key={category.id} onClick={() =>  assignOrsetNull(setSelectedData, selectedData, category)} className='min-w-[200px] group relative'>
            <CustomCard className={`${selectedData?.id === category.id && ' border-custom_orange-900'}`}>
                      
            <CustomPopConfirm func={()=>deleteCategory(category.id)} editFun={props.setAddNew}/>
                        <div className="flex w-full justify-between pl-3">
                            <div className="flex flex-col items-center lg:mt-0 pr-6 ">
                                <h3 className="items-center gap-1 flex text-lg self-start ">
                                                          
                                <Popconfirm
                                    title={`${category.pinned ? 'Unpin' : 'Pin'} Category`}
                                    description={`Are you sure you want to ${category.pinned ? 'unpin' : 'pin'} this category ${category.pinned ? 'from' : 'to'} menu?`}
                                    onConfirm={() => onConfirm(category.id)}
                                    // onCancel={cancel}
                                    okText={`${category.pinned ? 'Unpin' : 'Pin'}`}
                                    cancelText="Cancel"
                                    style={{color:'gray', marginRight:10}}
                                    className=""
                                >
                                  <Tooltip placement='bottom' title={`Click to ${category.pinned ? 'unpin' : 'pin'}`} >{category.pinned ? <BsPinFill /> :<BsPin />}</Tooltip>
                                  </Popconfirm>  {category?.category_name}
                                </h3>
                            </div>
                        </div>
                        </CustomCard>
                    </div>
        ))}
        </div>
      <hr className='w-full'/>
      <nav aria-label="Page navigation example" className='pt-4 flex justify-center'>
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border
       border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
        dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => paginator.handleChange("cursor","2")}
            >
              Previous
            </button>
          </li>
          <li>
            <div
              className="px-3 py-2 mx-10 leading-tight text-gray-500 bg-white border
       border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
        dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <select
                className="border-none outline-none bg-transparent"
                onChange={(event: any) => {
                  // setPageSize(event.target.value);
                  paginator.handleChange("cursor","");
                  paginator.handleChange("ps",event.target.value)
                }}
              >
                {pageSizeList.map((page) => (
                  <option value={page}>{page}</option>
                ))}
              </select>
            </div>
          </li>
          <li>
            <button
              className="px-3 py-2 leading-tight
       text-gray-500 bg-white border border-gray-300 rounded-r-lg
        hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
         dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => paginator.handleChange("cursor","1")}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
       </Card>   
    </>
  );
};

export default CatagoryList;
