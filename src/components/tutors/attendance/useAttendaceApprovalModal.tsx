import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import CustomText from "../../customs/custom-text/CustomText";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Attendance } from "../../../types/Attendance";
import { AttendanceStatus } from "../../../types/Enums";
import useAuthorization from "../../account/auth/authorization";
import useLoading from "../../customs/loading/LoadingHook";
import useAttendanceService from "./AttendanceService";
import { getTimeFromDate } from "../../../utils/timeUtils";

interface AttendanceApprovalModalProps {
  searchAttendance: () => void;
  setIsApprovalModalOpen: (value: boolean) => void;
  isApprovalModalOpen: boolean;
  handleApprovalCancel: () => void;
  attendanceForm: UseFormReturn<Attendance, any, Attendance>;
  approvalForm: UseFormReturn<Attendance, any, Attendance>;
  showModal: () => void;
}

const useAttendanceApprovalModal = (props: AttendanceApprovalModalProps) => {
  const handleEdit = () => {
    props.handleApprovalCancel();
    props.attendanceForm.reset(props.approvalForm.getValues());
    props.attendanceForm.setValue(
      "starting_time",
      getTimeFromDate(props.attendanceForm.getValues("starting_hour") as string)
    );
    props.attendanceForm.setValue(
      "ending_time",
      getTimeFromDate(props.attendanceForm.getValues("ending_hour") as string)
    );
    props.showModal();
  };

  const handleDelete = (id?: string) => {
    id &&
      attendanceService.deleteAttendance(id).then((value) => {
        props.handleApprovalCancel();
        props.searchAttendance();
      });
  };

  const authorization = useAuthorization();
  const loading = useLoading();
  const attendanceService = useAttendanceService();

  const onApproval: SubmitHandler<Attendance> = (data) => {
    data.status = AttendanceStatus.ACCEPTED;
    loading.startLoading();
    attendanceService
      .updateAttendance(data)
      .then(({ data: value }) => {
        props.searchAttendance();
        loading.stopLoading();
        props.setIsApprovalModalOpen(false);
      })
      .catch((error) => {
        // const errors = error.response.data.error.details;
        // for (const err in errors) {
        //   if (err === "non_field_errors") {
        //     attendanceForm.setError("root", { message: errors[err] });
        //   } else {
        //     attendanceForm.setError(err as keyof Attendance, { message: errors[err] });
        //   }
        // }
        loading.stopLoading();
      });
  };

  const onReject: SubmitHandler<Attendance> = (data) => {
    data.status = AttendanceStatus.REJECTED;
    loading.startLoading();
    attendanceService
      .updateAttendance(data)
      .then(({ data: value }) => {
        props.searchAttendance();
        loading.stopLoading();
        props.setIsApprovalModalOpen(false);
      })
      .catch((error) => {
        // const errors = error.response.data.error.details;
        // for (const err in errors) {
        //   if (err === "non_field_errors") {
        //     attendanceForm.setError("root", { message: errors[err] });
        //   } else {
        //     attendanceForm.setError(err as keyof Attendance, { message: errors[err] });
        //   }
        // }
        loading.stopLoading();
      });
  };

  return {
    title: (
      <h1 className="my-2 text-2xl text-center">
        Approval <CustomText text="Attendance" />
      </h1>
    ),
    footer: (
      <div className="flex justify-between w-full">
        {props.approvalForm.getValues("tutor") ===
          authorization.getUser().id && (
          <div>
            <Button type="text" onClick={handleEdit}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDelete(props.approvalForm.getValues("id"))}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        )}
        {props.approvalForm.getValues("student") ===
          authorization.getUser().id && (
          <div className="space-x-1">
            <Button
              htmlType="submit"
              onClick={props.approvalForm.handleSubmit(onReject)}
            >
              Reject
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={props.approvalForm.handleSubmit(onApproval)}
            >
              Approve
            </Button>
          </div>
        )}
      </div>
    ),
    open: props.isApprovalModalOpen,
    onOk: props.approvalForm.handleSubmit(onApproval),
    okText: "Approve",
    onCancel: props.handleApprovalCancel,
  };
};

export default useAttendanceApprovalModal;
