import { User } from "@sentry/react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { AttendanceStatus } from "../../../types/Enums";
import { filterUnique } from "../../../utils/array";
import {
  convertDateString,
  getDatesInRange,
  getTimeFromDate,
  isEqualDate,
  parseDateTime,
  toTime,
} from "../../../utils/timeUtils";
import { ETutorContract } from "../../../types/ETutorContractItem";
import { Attendance } from "../../../types/Attendance";
import { SubmitHandler } from "react-hook-form";
import { getHourDifference } from "../../../utils/date";
import useAuthorization from "../../account/auth/authorization";
import useETutorContractService from "../etutorContract/ETutorContractService";
import useLoading from "../../customs/loading/LoadingHook";
import useTutorService from "../tutor/ToturService";
import useAttendanceService, {
  AttendanceTableSearchModel,
} from "./AttendanceService";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Checkbox } from "antd";
import _ from "lodash";

export enum EVENT_TYPE {
  CONTRACT,
  ATTENDANCE,
  MERGED,
}

interface CalendarEvent {
  id?: string;
  start: Date;
  end: Date;
  title?: ReactNode;
  type: EVENT_TYPE;
  status?: AttendanceStatus;
  tutor_name: string;
  student_name: string;
  time: string;
  student?: string | User;
}

const defaultValues: Attendance = {
  ending_hour: new Date(),
  tutor_contract_request: "",
  tutor: "",
  student: "",
  student_name: "",
  tutor_name: "",
  starting_time: "",
  ending_time: "",
  starting_hour: "",
  total_daily_hour: 0,
  status: AttendanceStatus.SUBMITTED,
  remark: "",
};

let attendances: Attendance[] = [];
const useAttenaceList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const [events, setEvents] = useState<CalendarEvent[]>();
  const [contracts, setContracts] = useState<ETutorContract[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const attendanceService = useAttendanceService();
  const tutorRequestService = useETutorContractService();
  const tutorService = useTutorService();
  const loading = useLoading();
  const authorization = useAuthorization();
  const [filteredData, setFiltredData] = useState<AttendanceTableSearchModel>({
    tutor_contract: params.id,
  });
  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendance[]>(attendances);

  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const attendanceForm = useForm<Attendance>({ defaultValues });
  const approvalForm = useForm<Attendance>({ defaultValues });

  const getStyling = (event: CalendarEvent) => {
    let backgroundColor;
    let textColor;
    if (
      event.status === AttendanceStatus.SUBMITTED ||
      event.status === AttendanceStatus.RESUBMITTED
    ) {
      backgroundColor = "bg-[#FFCB11]";
      textColor = "text-[#000]";
    } else if (event.status === AttendanceStatus.REJECTED) {
      backgroundColor = "bg-[#ED1406]";
      textColor = "text-[#fff]";
    } else if (
      event.status === AttendanceStatus.ACCEPTED &&
      event.type === EVENT_TYPE.MERGED
    ) {
      backgroundColor = "bg-[#1BA804]";
      textColor = "text-[#000]";
    } else if (event.status === AttendanceStatus.ACCEPTED) {
      backgroundColor = "bg-[#9DD993]";
      textColor = "text-[#fff]";
    } else if (event.type === EVENT_TYPE.CONTRACT && event.start < new Date()) {
      backgroundColor = "bg-[#DAD7B9]";
      textColor = "text-[#000]";
    } else {
      backgroundColor = "bg-[#2D97FA]";
      textColor = "text-[#fff]";
    }

    return { textColor, backgroundColor };
  };

  useEffect(() => {
    searchContrats();
  }, []);

  useEffect(() => {
    searchAttendance();
  }, [filteredData]);

  useEffect(() => {
    handleEvent();
    defaultValues.student = contracts?.[0]?.user;
  }, [attendance, contracts, startDate, endDate]);

  const searchContrats = () => {
    tutorRequestService
      .getETutorContracts({ tutor_contract: params.id })
      .then(({ data: value }) => {
        setContracts(value.results);
      });
  };

  const searchAttendance = () => {
    attendanceService.getAttendances(filteredData).then(({ data: value }) => {
      setAttendance(value.results);
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleApprovalCancel = () => {
    setIsApprovalModalOpen(false);
  };

  const handleRangeChange = (range: Date[] | { start: Date; end: Date }) => {
    if (Array.isArray(range)) {
      setStartDate(range[0]);
      let end_date: Date;
      if (range.length > 1) {
        end_date = range[range.length - 1];
        setEndDate(end_date);
      } else {
        const date = new Date(range[0]);
        end_date = new Date(date.setDate(date.getDate() + 1));
        setEndDate(end_date);
      }
      setFiltredData({ ...filteredData, start_date: range[0], end_date });
    } else {
      setStartDate(range.start);
      setEndDate(range.end);
      setFiltredData({
        ...filteredData,
        start_date: range.start,
        end_date: range.end,
      });
    }
  };

  const addAttendance = (data: Attendance) => {
    tutorService.getTutors({}).then(({ data: value }) => {
      data.tutor = value.results[0].id;
      attendanceService
        .addAttendance(data)
        .then(({ data: value }) => {
          searchAttendance();
          loading.stopLoading();
          setIsModalOpen(false);
          attendanceForm.reset(defaultValues);
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
    });
  };

  const handleSelectSlot = useCallback(
    ({ start, end }: any) => {
      if (params.id && contracts.length && contracts[0].tutor_id === authorization.getUser().id) {
        attendanceForm.reset({
          ...defaultValues,
          // student: contracts.length === 1 ? contracts[0].user : "",
          starting_hour: convertDateString(start),
          starting_time: "00:00",
          ending_time: "00:00",
        });
        showModal();
      }
    },
    [setEvents, contracts]
  );

  const handleSelectEvent = useCallback((event: any) => {
    if (
      event.status === AttendanceStatus.SUBMITTED &&
      event.student === authorization.getUser().id
    ) {
      approvalForm.reset(event);
      setIsApprovalModalOpen(true);
    } else if (
      (event.status === AttendanceStatus.SUBMITTED ||
        event.status === AttendanceStatus.RESUBMITTED ||
        event.status === AttendanceStatus.REJECTED) &&
      event.tutor_id === authorization.getUser().id
    ) {
      attendanceForm.reset({
        starting_hour: event.start,
        starting_time: getTimeFromDate(event.start),
        ending_time: getTimeFromDate(event.end),
        student: event.student,
        id: event.id,
        status:
          event.status === AttendanceStatus.SUBMITTED
            ? AttendanceStatus.SUBMITTED
            : AttendanceStatus.RESUBMITTED,
      });
      showModal();
    } else if (
      event.type === EVENT_TYPE.CONTRACT &&
      event.tutor_id === authorization.getUser().id
    ) {
      attendanceForm.reset({
        starting_hour: event.start,
        starting_time: getTimeFromDate(event.start),
        ending_time: getTimeFromDate(event.end),
        student: event.student,
        tutor_contract_request: event.id,
      });
      showModal();
    }
  }, []);

  const approveSelected = () => {
    selectedAttendance.forEach((attendance, idx, arr) => {
      attendance.status = AttendanceStatus.ACCEPTED;
      attendanceService.updateAttendance(attendance).then(({ data: value }) => {
        if (idx === arr.length - 1) {
          searchAttendance();
          attendances = [];
          setSelectedAttendance(attendances);
        }
      });
    });
  };

  const rejectSelected = () => {
    selectedAttendance.forEach((attendance, idx, arr) => {
      attendance.status = AttendanceStatus.REJECTED;
      attendanceService.updateAttendance(attendance).then(({ data: value }) => {
        if (idx === arr.length - 1) {
          searchAttendance();
          attendances = [];
          setSelectedAttendance(attendances);
        }
      });
    });
  };

  const handleSelectedAttendance = useCallback(
    (e: any, attendance: Attendance) => {
      if (e.target.checked) {
        attendances = [attendance, ...attendances];
        setSelectedAttendance(attendances);
      } else {
        const filtered = attendances.filter(
          (selected) => selected.id !== attendance.id
        );
        attendances = filtered;
        setSelectedAttendance(attendances);
      }
    },
    []
  );

  const editAttendance = (data: Attendance) => {
    attendanceService
      .updateAttendance(data)
      .then(({ data: value }) => {
        searchAttendance();
        loading.stopLoading();
        setIsModalOpen(false);
        attendanceForm.reset(defaultValues);
      })
      .catch((error) => {
        loading.stopLoading();
      });
  };

  const onSubmit: SubmitHandler<Attendance> = (data) => {
    loading.startLoading();
    if (params.id) {
      data.tutor_contract_request = params.id;
    }
    data.starting_hour = parseDateTime(
      data.starting_hour as Date,
      data.starting_time
    );
    data.ending_hour = parseDateTime(
      data.starting_hour as Date,
      data.ending_time
    );
    data.total_daily_hour = getHourDifference(
      new Date(data.starting_hour),
      new Date(data.ending_hour)
    );
    if (data.id) {
      editAttendance(data);
    } else {
      addAttendance(data);
    }
  };

  const handleEvent = () => {
    const availabilities = contracts
      .map((contract) =>
        filterUnique(contract.contract_availabilty_times, [
          "start_time",
          "end_time",
          "day",
        ])
          .map((available) => {
            console.log(new Date(contract.end_date));
            return [
              ...getDatesInRange(
                available.day,
                available.start_time,
                available.end_time,
                new Date(contract.payment_date) < startDate
                  ? startDate
                  : new Date(contract.payment_date),
                !contract.end_date || new Date(contract.end_date) > endDate
                  ? endDate
                  : new Date(contract.end_date)
              ),
            ];
          })
          .reduce((prev, curr) => prev.concat(curr), [])
          .map((value) => ({ ...value, contract }))
      )
      .reduce((prev, curr) => prev.concat(curr), []);

    const merged = attendance
      .filter((att) =>
        availabilities.find(
          (available) =>
            att.tutor === available.contract.tutor &&
            att.student === available.contract.student &&
            isEqualDate(att.starting_hour, available.start) &&
            isEqualDate(att.ending_hour, available.end)
        )
      )
      .map((value) => ({
        ...value,
        type: EVENT_TYPE.MERGED,
        tutor_name: value.tutor_name,
        student_name: value.student_name,
        time: `${toTime(value.starting_hour)} - ${toTime(value.ending_hour)}`,
        start: new Date(value.starting_hour),
        end: new Date(value.ending_hour),
        id: value.id,
        student: value.student,
      }));

    const contractEvent: any[] = availabilities
      .filter((avail) => {
        return !merged.find(
          (value) =>
            value.tutor === avail.contract.tutor &&
            value.student === avail.contract.student &&
            isEqualDate(value.starting_hour, avail.start) &&
            isEqualDate(value.ending_hour, avail.end)
        );
      })
      .map((available) => ({
        ...available,
        type: EVENT_TYPE.CONTRACT,
        tutor: available.contract.tutor_id,
        tutor_name: available.contract.tutor_name,
        student_name: available.contract.student_name,
        time: `${toTime(available.start)} - ${toTime(available.end)}`,
        start: new Date(available.start),
        end: new Date(available.end),
        id: available.contract.id,
        student: available.contract.student,
      }));

    const attendanceEvent = attendance
      .filter(
        (attendance) =>
          !merged.find(
            (value) =>
              isEqualDate(value.starting_hour, attendance.starting_hour) &&
              isEqualDate(value.ending_hour, attendance.ending_hour)
          )
      )
      .map((result) => ({
        ...result,
        tutor_name: result.tutor_name,
        student_name: result.student_name,
        time: `${toTime(result.starting_hour)} - ${toTime(result.ending_hour)}`,
        start: new Date(result.starting_hour),
        end: new Date(result.ending_hour),
        type: EVENT_TYPE.ATTENDANCE,
        id: result.id,
        student: result.student,
      }));
    const concatnated = [...merged, ...contractEvent, ...attendanceEvent];
    const events = concatnated.map((concat, i) => {
      const { textColor, backgroundColor } = getStyling(concat);
      return {
        ...concat,
        title: (
          <div key={i} className={`${textColor} ${backgroundColor}`}>
            <div className="flex items-center gap-1">
              {(concat.status === AttendanceStatus.SUBMITTED ||
                concat.status === AttendanceStatus.RESUBMITTED) && (
                <Checkbox
                  className="w-1 h-1 mr-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectedAttendance(e, concat);
                  }}
                />
              )}
              <p className="text-xs">{`${concat.tutor_name}(${concat.student_name})`}</p>
            </div>
            <div className="flex">
              <h1 className="text-xs">Time:</h1>
              <p className="text-xs">{concat.time}</p>
            </div>
          </div>
        ),
      };
    });
    setEvents(events);
  };

  return {
    params,
    handleEvent,
    searchAttendance,
    setIsApprovalModalOpen,
    isApprovalModalOpen,
    handleApprovalCancel,
    attendanceForm,
    showModal,
    approvalForm,
    handleRangeChange,
    handleSelectEvent,
    handleSelectSlot,
    events,
    setFiltredData,
    filteredData,
    isModalOpen,
    onSubmit,
    handleCancel,
    approveSelected,
    rejectSelected,
    selectedAttendance,
  };
};

export default useAttenaceList;
