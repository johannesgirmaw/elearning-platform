import UserPermissionAdd from './UserPermissionAdd';
import { FaEllipsisV, FaRedo, FaRegSquare, FaTrashAlt } from 'react-icons/fa';
import { UserPermission } from '../../../types/UserPermission';
import useUserPermissionService from './UserPermissionService';
import { useState, useRef, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { ColDef, NewValueParams } from 'ag-grid-community';
import { usePagination } from '../../customs/pagination/usePagination';
import { useOutletContext } from 'react-router-dom';
import { componentType } from '../../../types/Enums';
import { SearchComponentProps } from '../../commons/search-bar/search';
import { Button, Modal, Pagination, message } from 'antd';
import SearchBar from '../../commons/search-bar/SearchBar';
import useAuthorization, { isVisible } from '../auth/authorization';
import useLoading from '../../customs/loading/LoadingHook';
import Loading from '../../customs/loading/Loading';

function UserPermissionList() {
  const userPermissionService = useUserPermissionService();
  const paginator = usePagination()
  const [selectedData, setSelectedData] = useState<UserPermission>()
  const [open, setOpen] = useState(false)
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([])
  const [addNew, setAddNew] = useState(false);
  const context: any = useOutletContext();
  const authorization = useAuthorization()
  const gridRef = useRef<any>();
  const [rowData, setRowData] = useState<UserPermission[]>([]);

  const components: SearchComponentProps[] = [
		{
			placeholder: "Search",
			key: "search",
			type: componentType.TEXT,
		},
	]

  useEffect(() => {
    authorization.canRead('userpermission')
    context.setTitle("User Permissions")
  },[])
  
  const handleValueChange = (event: NewValueParams<UserPermission>) => {
    userPermissionService.updateUserPermission(event.data).then(({ data: value }) => {
    })
  }

  const onClose = () => {
    setOpen(false);
    setAddNew(false)
    setSelectedData(undefined);
  }

  const [columnDefs, setColumnDefs] = useState<ColDef<UserPermission>[]>([
    { field: 'user', headerName: "User" },
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

  const loading = useLoading();
  useEffect(() => searchUserPermission(), [paginator.filterData]);

  const searchUserPermission = () => {
    loading.startLoading();
    userPermissionService
      .getUserPermissions(paginator.filterData)
      .then(({ data: value }) => {
        
        let data = value.results
        setRowData(data as unknown as UserPermission[])
        setUserPermissions(data as unknown as UserPermission[])
        paginator.setTotal(value.count)
        loading.stopLoading();
      })
      .catch((error) => loading.stopLoading());
  };

  const deleteUserpermission = () => {
    if(selectedData?.id){
      userPermissionService.deleteUserPermission(selectedData?.id).then(value => {
        setSelectedData(undefined)
        setOpen(false)
        searchUserPermission()
        message.success("You have deleted successfully")
      })
    }
  }

  return (
    <>
      <div className="w-full md:w-full justify-between flex flex-col-reverse md:flex-row px-4 py-4">
        <div className="w-full md:w-1/2 lg:w-3/4">
          <div className="flex flex-wrap items-center">
            <h1 className=" text-custom_orange-800 text-2xl font-bold">
              Access Control List
            </h1>
            <button className="text-white px-3 py-1 text-lg rounded-lg border border-gray-300  bg-custom_orange-700  hover:bg-black  transition duration-300 ease-out hover:ease-out md:hidden "  onClick ={(() => setAddNew(!addNew))} >Add New</button>
            <SearchBar   components={components} handleChange={paginator.handleChange} filteredData={paginator.filterData} />
          </div>
          <div className="flex flex-row gap-4 py-3 items-center text-gray-500">
            <i>
              <FaRegSquare />
            </i>
            <button onClick={searchUserPermission} >
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
              <div className="ag-theme-alpine relative flex flex-col gap-3 space-y-3">
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
                  pagination={false}
                  // {...paginator}
                />
                <Pagination
                  className="mt-3"
                  {...paginator}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`w-full md:w-1/2 lg:w-1/4 ${isVisible(authorization.canCreate('userpermission'))} hidden md:block `}>
            <UserPermissionAdd searchUserPermission={searchUserPermission} />
        </div>
      </div>
      <Modal open={open} okText={<span className='text-black'>Delete</span>} onCancel={onClose} title={<div className='bg-red-500 w-full text-white p-2'>Warning!</div>}  onOk={deleteUserpermission}>
          Are you sure you want to Delete '{selectedData?.content_type}'
      </Modal>

      <Modal open={addNew && (window.innerWidth < 768)} onCancel={onClose} footer={[]} >
          <UserPermissionAdd searchUserPermission={searchUserPermission} cancel={onClose} />
        </Modal>
    </>
  );
}
export default UserPermissionList;
