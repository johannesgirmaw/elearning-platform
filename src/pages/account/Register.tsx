import DownloadSection from "../../components/courses/download/DownloadSection";
import Footer from "../../components/layout/footer/Footer";
import User from "../../components/account/auth/User";
import useUserPages from "../../components/account/auth/UserPages";
import Header from "../../components/layout/header/Header";

function Register() {
  const UserPages = useUserPages()
  
  return (
    <>
      <Header title="Registeration" activeTab="register" />
      <User page={UserPages.student_register} />
      {/* <DownloadSection /> */}
      <Footer />
    </>
  );
}

export default Register;
