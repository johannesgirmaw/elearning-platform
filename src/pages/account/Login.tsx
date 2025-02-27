import DownloadSection from "../../components/courses/download/DownloadSection";
import Footer from "../../components/layout/footer/Footer";
import User from "../../components/account/auth/User";
import useUserPages from "../../components/account/auth/UserPages";
import Header from "../../components/layout/header/Header";

function Login() {

  const UserPages = useUserPages()

  return (
    <>
      <Header title="Login" activeTab="login" />
      <User page={UserPages.login} />
      {/*<DownloadSection />*/}
      {/* <Footer /> */}
    </>
  );
}

export default Login;
