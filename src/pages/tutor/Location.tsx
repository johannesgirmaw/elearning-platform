import { useForm } from "react-hook-form";
import Footer from "../../components/layout/footer/Footer";
import LocationAdd from "../../components/tutors/location/LocationAdd";
import LocationList from "../../components/tutors/location/LocationList";
import { Location } from "../../components/tutors/tutor/TutorInfoModel";
import useLocationService from "../../components/tutors/location/LocationService";
import { useEffect, useState } from "react";
import { location_type } from "../../types/Enums";
import { Modal } from "antd";

const LocationPage = () => {
  const locationForm = useForm<Location>({});
  const [createLocation, setCreateLocation] = useState(false)
  const locationService = useLocationService();
  const [data, setData] = useState<Location[]>([]);

  const setValue = (value: Location) => {
    console.log(value)
    locationForm.reset(value);
    setCreateLocation(true)
  };

  const cancle = () => {
    setCreateLocation(false)
    locationForm.reset()
  }

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
          <div className="flex py-1 gap-2 justify-evenly items-center">
            <h1 className="text-2xl font-bold text-center">Location List</h1>
            <button className="text-white px-3 py-1 text-lg rounded-lg border border-gray-300  bg-custom_orange-700  hover:bg-black  transition duration-300 ease-out hover:ease-out md:hidden "  onClick ={(() => setCreateLocation(!createLocation))} >Add New</button>
          </div>
          <LocationList setValue={setValue} data={data} searchLocation={getLocation} />
        </div>
        <div className="w-full sm:w-1/2 hidden md:block 2xl:w-1/4">
          <LocationAdd cancle={cancle} locationForm={locationForm} reloadLocation={getLocation} />
        </div>
      </div>
      {/* <Footer /> */}
      <Modal open={createLocation && (window.innerWidth < 768)} onCancel={cancle} footer={[]}>
        <LocationAdd cancle={cancle} locationForm={locationForm} reloadLocation={getLocation} />
      </Modal>
    </>
  );
};
export default LocationPage;
