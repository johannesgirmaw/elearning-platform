import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import CustomTable from "../../../customs/custom-components/CustomTable";
import { Button, Dropdown, Menu, Modal, Popconfirm, Table } from "antd";
import usePaymentService, {
  PaymentTableSearchModel,
  PaymentType,
} from "./usePaymentService";
import { useEffect, useState } from "react";
import { usePagination } from "../../../customs/pagination/usePagination";
import { getLabelByValue } from "../../../../utils/array";
import {
  componentType,
  PaymentStatus,
  paymentStatusOption,
} from "../../../../types/Enums";
import { MoreOutlined } from "@ant-design/icons";
import useTranslation from "../../../../utils/translation";
import useAuthorization from "../../../account/auth/authorization";
import { SearchComponentProps } from "../../../commons/search-bar/search";
import SearchBar from "../../../commons/search-bar/SearchBar";
import useToast from "../../../customs/toast/ToastHook";
import PaymentAdd from "./PaymentAdd";
import { useParams } from "react-router-dom";
import CustomButton from "../../../customs/custom-button/CustomButton";
import { FaPlus } from "react-icons/fa";
import PaymentGenerate from "./PaymentGenerate";

const PaymentList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [paymentRequestDatas, setPaymentRequestDatas] = useState<PaymentType[]>(
    []
  );
  const paginator = usePagination<PaymentTableSearchModel>();
  const toast = useToast();
  const params = useParams();
  const [addNew, setAddNew] = useState(false);
  const [generatePayment, setGeneratePayment] = useState(false);
  const [selectedData, setSelectedData] = useState<PaymentType>();
  const authorize = useAuthorization();
  const paymentService = usePaymentService();
  const { translate } = useTranslation();
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onClose = () => {
    setAddNew(false);
    setSelectedData(undefined);
  };

  const onSelectData = (data: PaymentType) => {
    setAddNew(true);
    setSelectedData(data);
  };

  const handleGeneratePayment = () => {
    paymentService.paymentsDo("generate_payment", {tutor_contract: params.id}).then(data => {
      paymentSearch()
    })
  }

  const rowSelection: TableRowSelection<PaymentType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  useEffect(() => {
    paymentSearch();
  }, [paginator.filterData]);

  const paymentSearch = () => {
    paymentService
      .getPayments({ ...paginator.filterData, tutor_contract: params.id })
      .then(({ data: value }) => {
        setPaymentRequestDatas(value.results);
      });
  };
  const showDetail = (data: PaymentType) => {};

  const pay = (data: PaymentType) => {
    onSelectData(data)
  };

  const refundPayment = (data: PaymentType) => {
    paymentService.paymentDo(data.id, "refund").then((value) => {
      toast.success("successfully refunded");
      paymentSearch()
    });
  };

  const approvePayment = (data: PaymentType) => {
    paymentService.paymentDo(data.id, "approve").then((value) => {
      toast.success("successfully approve");
      paymentSearch()
    });
  };

  const cashPayment = (data: PaymentType) => {
    paymentService.paymentDo(data.id, "cash").then((value) => {
      toast.success("successfully approve");
      paymentSearch()
    });
  };

  const cancelPayment = (data: PaymentType) => {
    paymentService.paymentDo(data.id, "cancel").then((value) => {
      toast.success("successfully cancelled");
      paymentSearch()
    });
  };

  const renderMenuItem = (detail: PaymentType) => {
    const items = [
      {
        label: (
          <Popconfirm
            placement="topLeft"
            title="Are you Sure you want to refund it?"
            onConfirm={(e) => {
              refundPayment(detail);
            }}
          >
            {translate("refund")}
          </Popconfirm>
        ),
        key: "1",
        visible:
          detail.status === PaymentStatus.PAID &&
          authorize.otherAction("paymentrequest"),
      },
      {
        label: (
          <Popconfirm
            placement="topLeft"
            title="Are you Sure you want to approve it?"
            onConfirm={(e) => {
              approvePayment(detail);
            }}
          >
            {translate("approve")}
          </Popconfirm>
        ),
        key: "1",
        visible:
          detail.status === PaymentStatus.NEED_APPROVAL &&
          authorize.otherAction("paymentrequest"),
      },
      {
        label: (
          <Popconfirm
            placement="topLeft"
            title="Are you Sure you want to paid it?"
            onConfirm={(e) => {
              cashPayment(detail);
            }}
          >
            {translate("cash")}
          </Popconfirm>
        ),
        key: "1",
        visible:
          detail.status === PaymentStatus.NOT_PAID &&
          authorize.otherAction("paymentrequest"),
      },

      {
        label: (
          <Popconfirm
            placement="topLeft"
            title="Are you Sure you want to cancel it?"
            onConfirm={(e) => {
              cancelPayment(detail);
            }}
          >
            {translate("cancel")}
          </Popconfirm>
        ),
        key: "2",
        visible:
          detail.status === PaymentStatus.NOT_PAID &&
          authorize.otherAction("paymentrequest"),
      },
    ];

    return items.filter((item) => item.visible !== false);
  };

  const components: SearchComponentProps[] = [
    {
      placeholder: "Search",
      key: "search",
      type: componentType.TEXT,
    },
    {
      placeholder: "Status",
      key: "status",
      type: componentType.DROPDOWN,
      options: paymentStatusOption,
    },
  ];

  const columns: ColumnsType<PaymentType> = [
    {
      title: "Student",
      dataIndex: "student_name",
      key: "student_name",
      render: (_, data) => (
        <>
          <div className="flex flex-col max-md:hidden">
            <div>{data.student_name}</div>
          </div>
          <div className="md:hidden">
            <div className="font-semibold">
              <a
                className="mb-0 text-sm font-semibold"
                onClick={() => showDetail(data)}
              >
                Student Name: {data.student_name}
              </a>
            </div>
            <div className="text-normal text-gray-6F text-[12px]">
              {data.tutor_name && "Tutor Name: " + data.tutor_name}
            </div>
            <div className="text-normal text-gray-6F text-[12px]">
              {data.status &&
                "Status: " + getLabelByValue(paymentStatusOption, data.status)}
            </div>

            <div className="text-normal text-gray-6F text-[12px]">
              {data.total_price && "Total Price: " + data.total_price}
            </div>

            <div className="text-normal text-gray-6F text-[12px]">
              {data.total_hour && "Total Hour: " + data.total_hour}
            </div>

            <div className="text-normal text-gray-6F text-[12px]">
              {data.hourly_rate && "Hourly Rate: " + data.hourly_rate}
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Tutor",
      dataIndex: "tutor",
      key: "tutor",
      render: (_, { tutor_name }) => (
        <>
          <div className="flex flex-col ">
            <div>{tutor_name}</div>
          </div>
        </>
      ),
    },

    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          <div className="flex flex-col ">
            <div>{getLabelByValue(paymentStatusOption, status)}</div>
          </div>
        </>
      ),
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (_, data) => {
        const items = renderMenuItem(data);
        return (
          <div className="flex gap-1">
            {data.status === PaymentStatus.NOT_PAID && (
              <Button onClick={() => pay(data)}>Pay</Button>
            )}
            {items.length ? (
              <Dropdown
                className="border-none"
                overlay={<Menu selectable={true} items={items} />}
              >
                <Button>
                  <MoreOutlined className="" size={200} />
                </Button>
              </Dropdown>
            ) : (
              <></>
            )}{" "}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <div className="flex items-baseline">
          <h1 className="flex-1 text-2xl font-semibold text-center">
            Payment List
          </h1>
          {params.id && <div>
            <CustomButton
              text={
                <div className="flex items-baseline gap-1">
                  <FaPlus className="h-3" />
                  <p>Generate</p>
                </div>
              }
              fun={handleGeneratePayment}
              className="px-10 mt-0"
            />
          </div>}
        </div>
        <SearchBar
          components={components}
          handleChange={paginator.handleChange}
          filteredData={paginator.filterData}
        />
        <div className="px-2">
          <CustomTable
            rowSelection={rowSelection}
            columns={columns.filter((item) => item.className !== "hidden")}
            dataSource={paymentRequestDatas}
            pagination={false}
            rowKey="id"
            header="student_name"
          />
        </div>
      </div>

      <Modal
        open={addNew}
        width={800}
        onCancel={onClose}
        footer={[]}
      >
        <PaymentAdd
          searchPayment={paymentSearch}
          detail={selectedData}
          cancel={onClose}
        />
      </Modal>
      <Modal
        open={generatePayment}
        onCancel={() => setGeneratePayment(false)}
        footer={[]}
      >
        <PaymentGenerate
          searchPayment={paymentSearch}
          detail={selectedData}
          cancel={() => setGeneratePayment(false)}
        />
      </Modal>
    </>
  );
};

export default PaymentList;
