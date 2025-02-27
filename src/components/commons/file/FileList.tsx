
import React, { useEffect, useState } from 'react';
import { Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import SearchBar from '../search-bar/SearchBar';
import CustomTable from '../../customs/custom-components/CustomTable';
import { FileModel, FileModelSearch } from './FileModel';
import { usePagination } from '../../customs/pagination/usePagination';
import useToast from '../../customs/toast/ToastHook';
import useAuthorization from '../../account/auth/authorization';
import useTranslation from '../../../utils/translation';
import { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import useFileService from './FileService';
import { SearchComponentProps } from '../search-bar/search';
import { componentType } from '../../../types/Enums';
import { FaDownload } from 'react-icons/fa';
import { formatBytes } from '../../../utils/func_utils';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}


export const FileList  = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [datas, setDatas] = useState<FileModel[]>([]);
    const paginator = usePagination<FileModelSearch>();
    const toast = useToast();
    const [addNew, setAddNew] = useState(false);
    const authorize = useAuthorization();
    const { translate } = useTranslation();
    const fileService = useFileService();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<FileModel> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
        ],
    };

    useEffect(() => {
        paymentSearch()
    }, [])



    const paymentSearch = () => {
        fileService.getFiles().then(({ data: value }) => {
            setDatas(value.results)
        })
    }

    const components: SearchComponentProps[] = [
        {
            placeholder: "Search",
            key: "search",
            type: componentType.TEXT
        },
        {
            placeholder: "Status",
            key: "status",
            type: componentType.DROPDOWN,
            // options: paymentStatusOption,
        }
    ]


    const columns: ColumnsType<FileModel> = [
        {
            title: "File Name",
            dataIndex: "file_name",
            key: "file_name",
            render: (_, data) => (
                <>
                    <div className="flex flex-col max-md:hidden">
                        <div>{data.file_name}</div>
                    </div>
                    <div className="md:hidden">
                        <div className="font-semibold">
                            {/* <a className="text-sm mb-0 font-semibold" onClick={() => showDetail(data)}>Student Name: {data.student_name}
                            </a> */}
                        </div>
                        
                    </div>
                </>
            ),
        },
        {
            title: "Traget",
            dataIndex: "target",
            key: "target",
            render: (_, { target }) => (
                <>
                    <div className="flex flex-col ">
                        <div>{target}</div>
                    </div>
                </>
            ),
        },

        {
            title: "file_url",
            dataIndex: "file_url",
            key: "file_url",
            render: (_, { file_url }) => (
                <>
                    <div className="flex flex-col ">
                        <div>{file_url}</div>
                    </div>
                </>
            ),
        },
        {
            title: "download",
            dataIndex: "download",
            key: "download",
            render:(_, data)=>(
                <>
                    <a  href={`${data.url}`} target='_blank'> 
                        <FaDownload className="text-gray-400 text-3xl w-10"/>
                         ({formatBytes(data?.file_size!, 0.2)})
                    </a>
                </>
            )
        },


    ]
    return (
        <div>
             <div className="pt-6">
            <h1 className="text-center text-2xl font-semibold">File List</h1>
            <SearchBar components={components} handleChange={paginator.handleChange} filteredData={paginator.filterData} />
            <div className="px-2">
                <CustomTable
                    rowSelection={rowSelection}
                    columns={columns.filter(item => item.className !=="hidden")}
                    dataSource={datas}
                    pagination={false}
                    rowKey="id"
                    header="file_name" />
            </div>
        </div>
        </div>
    )
}
