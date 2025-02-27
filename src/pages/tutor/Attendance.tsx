import { useForm } from "react-hook-form";
import Footer from "../../components/layout/footer/Footer";
import LocationAdd from "../../components/tutors/location/LocationAdd";
import LocationList from "../../components/tutors/location/LocationList";
import { Location } from "../../components/tutors/tutor/TutorInfoModel";
import useLocationService from "../../components/tutors/location/LocationService";
import { useEffect, useState } from "react";
import { location_type } from "../../types/Enums";

const AttendancePage = () => {
  const locationForm = useForm<Location>({});
  const locationService = useLocationService();
  const [data, setData] = useState<Location[]>([]);

  const setValue = (value: Location) => {
    locationForm.reset(value);
  };

  const getLocation = (location_type?: location_type) => {
    locationService
      .getLocations({location_type})
      .then((value) => [setData(value.data.results)]);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <div className="flex flex-col-reverse w-full gap-3 mt-3 sm:flex-row">
        <div className="w-full sm:w-1/2 2xl:w-3/4">
          <h1 className="mb-3 text-2xl font-bold text-center">Location List</h1>
          <LocationList setValue={setValue} data={data} searchLocation={getLocation} />
        </div>
        <div className="w-full sm:w-1/2 2xl:w-1/4">
          <h1 className="mb-3 text-2xl font-bold text-center">Location</h1>
          <LocationAdd locationForm={locationForm} reloadLocation={getLocation} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AttendancePage;
