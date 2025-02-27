import Footer from "../../components/layout/footer/Footer";
import CustomButton from "../../components/customs/custom-button/CustomButton";
import CustomCard from "../../components/customs/custom-card/CustomCard";
import Header from "../../components/layout/header/Header";

function FAQ() {
    return (
        <>
            <Header title="Frequently Asked" underlined="Question" activeTab="faq" />
            <div className="my-20  w-full">
                <div className="container mx-auto pt-6 pb-10 px-9 lg:px-20">
                    <div className="flex flex-wrap bg-custom_orange-100 rounded-xl pl-0 mb-0 w-full">
                        <div className="flex-grow-0 lg:flex-grow basis-0 px-1 pt-4 pb-0 sm:p-4">
                            <CustomButton form="edge" text="UI/UX Design" />
                        </div>
                        <div className="flex-grow-0 lg:flex-grow basis-0 px-1 pt-4 pb-0 sm:p-4">
                            <CustomButton form="edge" text="Development" />
                        </div>
                        <div className="flex-grow-0 lg:flex-grow basis-0 px-1 pt-4 pb-0 sm:p-4">
                            <CustomButton form="edge" text="Data Science" />
                        </div>
                        <div className="flex-grow-0 lg:flex-grow basis-0 px-1 pt-4 pb-0 sm:p-4">
                            <CustomButton form="edge" text="Business" />
                        </div>
                        <div className="flex-grow-0 lg:flex-grow basis-0 px-1 pt-4 pb-0 sm:p-4">
                            <CustomButton form="edge" text="Finance" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 mt-8">
                        <CustomCard light={true}>
                            <div className="flex flex-wrap items-center">
                                <div className="lg:w-5/12">
                                    <h4 className="text-xl group-hover:text-custom_orange-900 max-w-sm font-medium text-custom_black-200">
                                        What is the academic calendar for universities in the United States?
                                    </h4>
                                </div>
                                <div className="lg:w-7/12 mt-7">
                                    <p className="mb-4">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text
                                    </p>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text
                                    </p>
                                </div>
                            </div>
                        </CustomCard>
                        <CustomCard light={true}>
                            <div className="flex flex-wrap items-center">
                                <div className="lg:w-5/12">
                                    <h4 className="text-xl group-hover:text-custom_orange-900 max-w-sm font-medium text-custom_black-200">
                                        What is the academic calendar for universities in the United States?
                                    </h4>
                                </div>
                                <div className="lg:w-7/12 mt-7">
                                    <p className="mb-4">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text
                                    </p>
                                    <p>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industry's standard dummy text ever since the 1500 when un known printer took make a type specimen typesetting industry lorem Ipsum has been the industry's standard dummy text
                                    </p>
                                </div>
                            </div>
                        </CustomCard>
                    </div>
                    <div className="mt-12 flex items-center justify-center">
                        <CustomButton text="Other's Question" />
                    </div>
                </div>
            </div>
            {/*<DownloadSection />*/}
            <Footer />
        </>
    );
}

export default FAQ;
