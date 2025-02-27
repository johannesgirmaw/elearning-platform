import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { SelectItem } from "../../../types/MenuItems";
import CustomInputError from "../../customs/custom-input-error/CustomInputError";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import Loading from "../../customs/loading/Loading";
import useLoading from "../../customs/loading/LoadingHook";
import { usePagination } from "../../customs/pagination/usePagination";
import useUserService from "../../account/user/UserService";
import CustomInput from "../../customs/custom-input/CustomInput";
import { Attendance } from "../../../types/Attendance";
import { toDate } from "../../../utils/timeUtils";

const AttendanceAdd = (props: {
  cancel?: () => void;
  searchUserPermission?: () => void;
  attendanceForm: UseFormReturn<Attendance, any>;
}) => {
  const [usersData, setUsersData] = useState<SelectItem<string>[]>([]);
  const {attendanceForm} = props;
  const userService = useUserService();
  const paginator = usePagination();

  const loading = useLoading();

  const getUserData = (newValue: string) => {
    
    userService.getUsers({...paginator.filterData, search:newValue}).then(({ data: response }) => {
      setUsersData(
        response.results.map((resp) => ({
          label: `${resp.username}`,
          value: resp.id,
        }))
      );
    });
  };

  useEffect(() => {
    getUserData("");
  }, []);

  return (
    <>
      <Loading {...loading} />

      <div className="container grid grid-cols-1 mx-auto">
        <form>
          <CustomInputError msg={attendanceForm.formState.errors.root?.message} key={2} />
          <div>
            <CustomDropdown
              placeholder="User"
              data={usersData}
              {...props.attendanceForm}
              label="student"
              options={{
                required: "User is required",
              }}
              isDisable={attendanceForm.getValues('tutor_contract_request') !==null}
              isSearchable={true}
              error={attendanceForm.formState.errors.student}
              onInputChange={getUserData}
              control={attendanceForm.control}
            />
            <div className="flex items-center justify-evenly">
              <p className="text-lg">{toDate(attendanceForm.getValues('starting_hour'))}</p>
              <CustomInput label="starting_time" placeholder="" type="time" {...attendanceForm} />
              <CustomInput label="ending_time" placeholder="" type="time" {...attendanceForm}  />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AttendanceAdd;
