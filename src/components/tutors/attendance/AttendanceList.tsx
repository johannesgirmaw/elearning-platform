import React, { useState } from "react";
import { Button, Modal } from "antd";
import AttendanceAdd from "./AttendanceAdd";
import CustomText from "../../customs/custom-text/CustomText";
import AttendanceApproval from "./AttendanceApproval";
import { isMObile } from "../../../utils/modal";
import DebounceSelect from "../../customs/custom-input/DebounceSelect";
import { LabeledValue } from "antd/es/select";
import useUserService from "../../account/user/UserService";
import useAttenaceList from "./useAttendanceList";
import useAttendanceApprovalModal from "./useAttendaceApprovalModal";
import Calendar from "../../customs/calendar/Calendar";

const AttendanceList: React.FC = () => {
  const userService = useUserService();

  async function fetchUserList(name: string): Promise<LabeledValue[]> {
    return userService.getUsers({ search: name, method:"tutor_user" }).then(({ data: response }) => {
      return response.results.map((resp) => ({
        label: `${resp.short_name}`,
        value: resp.id,
      }));
    });
  }

  const [value, setValue] = useState<LabeledValue[]>([]);
  const [isFirst, setIsFirst] = useState<boolean>(true)
  const attendanceList = useAttenaceList();
  const attendanceApproval = useAttendanceApprovalModal({
    searchAttendance: attendanceList.searchAttendance,
    setIsApprovalModalOpen: attendanceList.setIsApprovalModalOpen,
    isApprovalModalOpen: attendanceList.isApprovalModalOpen,
    handleApprovalCancel: attendanceList.handleApprovalCancel,
    attendanceForm: attendanceList.attendanceForm,
    showModal: attendanceList.showModal,
    approvalForm: attendanceList.approvalForm,
  });

  return (
    <div>
      {!attendanceList.params.id && <h1 className="font-bold">Attendance</h1>}
      <div className="h-[85vh]">
        <Calendar
          onRangeChange={attendanceList.handleRangeChange}
          defaultView={isMObile() ? "day" : "month"}
          onSelectEvent={attendanceList.handleSelectEvent}
          onSelectSlot={attendanceList.handleSelectSlot}
          selectable
          events={attendanceList.events}
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          tooltipAccessor={"start"}
          children={
            <div className="space-x-2">
            {!attendanceList.params.id &&<DebounceSelect
              mode="multiple"
              value={value}
              placeholder="Select Student"
              fetchOptions={fetchUserList}
              onChange={(newValue) => {
                setValue(newValue as LabeledValue[]);
                const val = newValue as LabeledValue[];
                attendanceList.setFiltredData({
                  ...attendanceList.filteredData,
                  student: val.length ? (val[0].value as string) : undefined,
                });
              }}
              className="w-96"
            />}
            {attendanceList.selectedAttendance.length ? 
            <div className="flex gap-2">
            <Button type="primary" onClick={attendanceList.approveSelected}>Approve</Button> 
            <Button type="primary" className="!bg-red-600" onClick={attendanceList.rejectSelected}>Reject</Button> 
            </div>
            : null}
            </div>
          }
        />
      </div>
      <Modal
        title={
          <h1 className="my-2 text-2xl text-center">
            Add <CustomText text="Attendance" />
          </h1>
        }
        open={attendanceList.isModalOpen}
        onOk={attendanceList.attendanceForm.handleSubmit(
          attendanceList.onSubmit
        )}
        onCancel={attendanceList.handleCancel}
      >
        <AttendanceAdd attendanceForm={attendanceList.attendanceForm} />
      </Modal>
      <Modal {...attendanceApproval}>
        <AttendanceApproval approvalForm={attendanceList.approvalForm} />
      </Modal>
    </div>
  );
};

export default AttendanceList;
