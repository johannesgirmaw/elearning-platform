import DownloadSection from "../../components/courses/download/DownloadSection";
import Footer from "../../components/layout/footer/Footer";
import User from "../../components/account/auth/User";
import useUserPages from "../../components/account/auth/UserPages";
import InstructorUser from "../../components/account/auth/InstructorUser";
import Header from "../../components/layout/header/Header";

function TutorRegister() {
  const UserPages = useUserPages()
  
  return (
    <>
      <Header title="Instructor Registration" activeTab="register" />
      <InstructorUser page={UserPages.tutor_register} />
      <DownloadSection />
      <Footer />
    </>
  );
}

export default TutorRegister;
