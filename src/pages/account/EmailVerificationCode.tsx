import DownloadSection from "../../components/courses/download/DownloadSection";
import Footer from "../../components/layout/footer/Footer";
import User from "../../components/account/auth/User";
import useUserPages from "../../components/account/auth/UserPages";
import Header from "../../components/layout/header/Header";

function EmailVerificationCode() {
  const UserPages = useUserPages()
  return (
    <>
      <Header title="Verification code" activeTab="verification_code" />
      <User page={UserPages.email_verification_code} />
      <DownloadSection />
      <Footer />
    </>
  );
}

export default EmailVerificationCode;