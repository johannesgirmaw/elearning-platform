import { useEffect } from "react"
import Footer from "../../components/layout/footer/Footer"
import TutorInfoDetail from "../../components/tutors/tutor/TutorInfoDetail"
import Header from "../../components/layout/header/Header"
 

const TutorDetail = () => {
    useEffect(() => window.scrollTo(0, 0), [])
    return <>
        <Header />
        <TutorInfoDetail />
        <Footer />
    </>
}

export default TutorDetail