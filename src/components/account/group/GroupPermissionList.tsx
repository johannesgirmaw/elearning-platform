import { useEffect, useMemo, useRef, useState } from 'react';

import useLoading from '../../customs/loading/LoadingHook';
import GroupPermissionAdd from './GroupPermissionAdd';
import { FaEllipsisV, FaRedo, FaRegSquare, FaTrashAlt } from 'react-icons/fa';
import useGroupPermissionService from './GroupPermissionService';
import { GroupPermission } from '../../../types/GroupPermission';
import { AgGridReact } from 'ag-grid-react';
// import Pagination from '../../pagination/Pagination';
import { NewValueParams, ColDef, GridReadyEvent } from 'ag-grid-community';
import { usePagination } from '../../customs/pagination/usePagination';
import { useOutletContext } from 'react-router-dom';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { componentType } from '../../../types/Enums';
import { Button, Modal, Pagination, message } from 'antd';
import SearchBar from '../../commons/search-bar/SearchBar';
import { useNavigate, useParams } from "react-router-dom";
import useAuthorization, { isVisible } from '../auth/authorization';
import Loading from '../../customs/loading/Loading';

function GroupPermissionList() {
    const paginator = usePagination()
    const [selectedData, setSelectedData] = useState<GroupPermission>()
    const [open, setOpen] = useState(false)
    const userGroupPermissionService = useGroupPermissionService();
    const loading = useLoading();
    const [addNew, setAddNew] = useState(false);
    useEffect(() => searchGroupPermission(), [paginator.filterData]);
    const context: any = useOutletContext();
    const navigate = useNavigate()
    const authorization = useAuthorization()

    const gridRef = useRef<any>(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState<GroupPermission[]>([]); // Set rowData to Array of Objects, one Object per Row

    const components: SearchComponentProps[] = [
      {
        placeholder: "Search",
        key: "search",
        type: componentType.TEXT,
      },
    ]
  
    useEffect(() => {
      // if(!authorization.canRead('customuser')){
      //   navigate(-1)
      // }
      authorization.canRead('grouppermission')
      context.setTitle("Group Permissions")
    },[])
    
    const handleValueChange = (event: NewValueParams<GroupPermission>) => {
      userGroupPermissionService.updateGroupPermission(event.data).then(({ data: value }) => {
      })
    }

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState<ColDef<GroupPermission>[]>([
      { field: 'group', headerName: "Group" },
      { field: 'content_type', headerName: "Content Type" },
      { field: 'can_view', editable: true, onCellValueChanged: handleValueChange, headerName: "Can View" },
      { field: 'can_create', editable: true, onCellValueChanged: handleValueChange, headerName: "Can Create" },
      { field: 'can_change', editable: true, onCellValueChanged: handleValueChange, headerName: "Can Change" },
      { field: 'can_delete', editable: true, onCellValueChanged: handleValueChange, headerName: "Can Delete" },
      { field: 'other_action', editable: true, onCellValueChanged: handleValueChange, headerName: "Can Other Action" },
    ]);

    const defaultColDef = useMemo(() => ({
      sortable: true,
    }), []);

    const gridReadyUpdate = (params: GridReadyEvent<GroupPermission, any>) => {
      gridRef.current.gridApi = params.api;
      gridRef.current.columnApi = params.columnApi;
      gridRef.current.gridApi.sizeColumnsToFit();
      window.onresize = () => {
        gridRef.current.gridApi.sizeColumnsToFit();
      }
    }
  
    const onClose = () => {
      setOpen(false);
      setAddNew(false)
      setSelectedData(undefined);
    }

  const searchGroupPermission = () => {
    loading.startLoading();
    userGroupPermissionService
      .getGroupPermissions(paginator.filterData)
      .then(({ data: value }) => {
        setRowData(value.results);
        paginator.setTotal(value.count)
        loading.stopLoading();
      })
      .catch((error) => loading.stopLoading());
    };

    const deleteGroupermission = () => {
      if(selectedData?.id){
        userGroupPermissionService.deleteGroupPermission(selectedData?.id).then(value => {
          setSelectedData(undefined)
          setOpen(false)
          searchGroupPermission()
          message.success("You have deleted successfully")
        })
      }
    }

  return (
    <>
      <div className="w-full md:w-[calc(100%-96px)] justify-center flex flex-col-reverse md:flex-row px-4 py-4">
        <div className="w-full max-w-fit md:w-1/2 lg:w-3/4">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className=" text-custom_orange-800 text-2xl font-bold">
              Access Control List
            </h1>
            <button className="text-white px-3 py-1 text-lg rounded-lg border border-gray-300  bg-custom_orange-700  hover:bg-black  transition duration-300 ease-out hover:ease-out md:hidden "  onClick ={(() => setAddNew(!addNew))} >Add New</button>
            <SearchBar components={components} handleChange={paginator.handleChange} filteredData={paginator.filterData}   />
          </div>
          <div className="flex flex-row gap-4 py-3 items-center text-gray-500">
            <i>
              <FaRegSquare />
            </i>
            <button onClick={searchGroupPermission} >
            <i>
              <FaRedo />
            </i>
            </button>
            <i>
              <FaEllipsisV />
            </i>
             {selectedData && <Button className='border-none p-0'
                                onClick={() => setOpen(true)} ><FaTrashAlt className='p-0' /></Button>}
          </div>
          <div className=" mx-auto">
            <div className="flex h-full flex-col sm:mr-10">
              <div className="ag-theme-alpine flex flex-col gap-3 space-y-3 relative">
              <Loading {...loading} />
              <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API
                rowData={rowData} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                onRowSelected={value => setSelectedData(value.data)}
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows
                domLayout='autoHeight'
                className=''
                // onGridReady={gridReadyUpdate}
                pagination={false}
              />
              <Pagination
                className="mt-3"
                {...paginator}
              />
              </div>
            </div>
          </div>
        </div>
        <div className={`w-full md:w-1/2 lg:w-1/4 ${isVisible(authorization.canCreate('grouppermission'))} hidden md:block `}>
            <GroupPermissionAdd searchGroupPermission={searchGroupPermission} />
        </div>
      </div>  

      <Modal open={open} okText={<span className='text-black'>Delete</span>} onCancel={onClose} title={<div className='bg-red-500 w-full text-white p-2'>Warning!</div>}  onOk={deleteGroupermission}>
          Are you sure you want to Delete '{selectedData?.content_type}'
      </Modal>


      <Modal open={addNew && (window.innerWidth < 768)} destroyOnClose onCancel={onClose} footer={[]} >
          <GroupPermissionAdd searchGroupPermission={searchGroupPermission} cancel={onClose} />
        </Modal>
    </>
  );
}
export default GroupPermissionList;
