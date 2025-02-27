import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType, TableProps } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { Location } from "../tutor/TutorInfoModel";
import {
  getEnum,
  locationTypeOptions,
  location_type,
} from "../../../types/Enums";
import { FaRegEdit } from "react-icons/fa";

type DataIndex = keyof Location;

interface LocationListProp {
  setValue: (value: Location) => void;
  data: Location[];
  searchLocation: (location_type?: location_type) => void
}

const LocationList = (props: LocationListProp) => {
  const { data } = props;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const onChange: TableProps<Location>['onChange'] = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('params', pagination, filters, sorter, extra);
    props.searchLocation(filters.location_type[0])
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<Location> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined rev={undefined} />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        style={{ color: filtered ? "#1677ff" : undefined }}
        rev={undefined}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        ?.includes((value as string).toLowerCase())!,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns: TableColumnsType<Location> = [
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Location Type",
      dataIndex: "location_type",
      key: "location_type",
      width: "300px",
      render: (value) => <>{getEnum(locationTypeOptions as any[], value)}</>,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      filters: [
        {
          text: "Region",
          value: location_type.region,
        },
        {
          text: "Zone",
          value: location_type.zone,
        },
        {
          text: "Woreda",
          value: location_type.woreda,
        },
      ],
    },
    {
      dataIndex: "edit",
      width: "50px",
      render: (_, value) => (
        <Button onClick={() => props.setValue(value)}>
          <FaRegEdit />
        </Button>
      ),
    },
  ];

  return (
    <div className="px-3">
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default LocationList;
