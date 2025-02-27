import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import useLocationService from "./LocationService";
import useLoading from "../../customs/loading/LoadingHook";
import { Location } from "../tutor/TutorInfoModel";
import CustomInput from "../../customs/custom-input/CustomInput";
import { locationTypeOptions, location_type } from "../../../types/Enums";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import CustomButton from "../../customs/custom-button/CustomButton";
import SmallLoading from "../../customs/loading/SmallLoading";
import { useEffect, useState } from "react";

interface LocationAddProps {
  locationForm: UseFormReturn<Location, any>;
  reloadLocation: () => void;
  cancle?: () => void;
}

const LocationAdd = (props: LocationAddProps) => {
  const locationService = useLocationService();
  const locationType = props.locationForm.watch('location_type')
  const [ parentLocation, setParentLocation ] = useState<any[]>([]);
  const loading = useLoading();

  const onSubmit: SubmitHandler<Location> = (data: Location) => {
    loading.startLoading();
    if (data.id) {
      locationService.updateLocation(data.id, data)
        .then((value) => {
          props.locationForm.reset();
          props.cancle?.();
          loading.stopLoading();
          props.reloadLocation();
        })
        .catch((error) => { loading.stopLoading(); console.log(error.data); });
    } else {
      locationService
        .addLocation(data)
        .then((value) => {
          props.locationForm.reset();
          props.cancle?.();
          loading.stopLoading();
          props.reloadLocation();
        })
        .catch((error) => { loading.stopLoading(); console.log(error.data); });
    }

  };

  const getLocation = () => {
    locationService.getLocations({ location_type: locationType - 1}).then((value) => {
      setParentLocation(value.data.results.map((v) => ({ label: v.address, value: v.id })))
  });
  };

  useEffect(() => {
    props.locationForm.resetField('parent');
  }, [ locationType ]);

  return (<>
    <h1 className="mb-3 text-2xl font-bold text-center">Location</h1>
    <form onSubmit={props.locationForm.handleSubmit(onSubmit)}>
      <CustomDropdown
        type="select"
        className="w-full "
        label="location_type"
        options={{
          required: "Location Type is required",
        }}
        data={locationTypeOptions}
        placeholder="Location Type"
        onValueChange={getLocation}
        {...props.locationForm}
      />
      {props.locationForm.getValues('location_type') !== location_type.region && <CustomDropdown
        className="w-full "
        type="select"
        label="parent"
        options={{
          required: {value: props.locationForm.getValues('location_type') !== location_type.region, message: "Parent Location is Required"}
        }}
        data={parentLocation}
        placeholder={
          props.locationForm.getValues('location_type') === location_type.zone?
          "Region / City":
          props.locationForm.getValues('location_type') === location_type.woreda?
          "Zone / Sub City":""}
        isSearchable={true}
        onInputChange={getLocation}
        {...props.locationForm}
      />}
      <CustomInput
        type="text"
        label="address"
        options={{
          required: "Address is Required",
        }}
        placeholder="Address"
        {...props.locationForm}
      />
      <CustomButton
        is_loading={<SmallLoading {...loading} />}
        text={"Submit"}
        type="submit"
        className=""
      />
    </form>
  </>
  );
};

export default LocationAdd;
