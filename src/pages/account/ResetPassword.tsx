import DownloadSection from "../../components/courses/download/DownloadSection";
import Footer from "../../components/layout/footer/Footer";
import User from "../../components/account/auth/User";
import useUserPages from "../../components/account/auth/UserPages";
import Header from "../../components/layout/header/Header";

function ResetPassword(props: { isRequest: boolean; }) {
    const UserPages = useUserPages()
    
    return (
        <>
            <Header title="Reset" activeTab="reset_pwd" />
            <User page={props.isRequest ? UserPages.reset_request : UserPages.reset_pwd} />
            <DownloadSection />
            <Footer />
        </>
    );
}

export default ResetPassword;
