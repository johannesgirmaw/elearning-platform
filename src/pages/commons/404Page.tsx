import Footer from "../../components/layout/footer/Footer";
import Header from "../../components/layout/header/Header";
import error from '../../assets/images/error.webp';
function ErrorNotFoundPage() {
  return (
    <>
      <Header title="Page not" activeTab="404Error" underlined="Found" />
      <div className="py-8  w-full">
        <div className="container mx-auto">
          <div className="p-16 pt-5">
            <div className="flex flex-wrap items-center">
              <div className="lg:w-1/2 flex-auto max-w-full">
                <div className="text-center rounded-xl overflow-hidden relative z-10">

                  <div className="w-full">
                    <img src={error} alt="Page not found" />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 flex-auto max-w-full">
             
                <div className="max-w-[470px] ml-[10%] mt-45px">
                  <h5 className="text-[20px] font-medium text-custom_orange-900 mb-[20px]">This Page is Not Found!</h5>
                  <h2 className="text-[40px] font-medium mb-0 leading-[1.4]">We are very sorry for error. We <span className="relative text-custom_orange-900 before:absolute before:bg-shape_4 before:bg-center before:bg-cover 
            before:bg-no-repeat before:w-32 before:h-3 before:left-1/2 before:-bottom-3 before:-translate-x-1/2">
                    can't find this
                  </span> page.</h2>
                  <p className="text-[18px] mt-[30px] mb-0 text-[#52565b] leading-[1.8]">It has survived not only five centuries but also the leap into electronic typesetting.</p>
                  <a href="/" className="mt-[35px] bg-custom_orange-900 text-white  rounded-[10px] inline-block text-center cursor-pointer font-medium leading-[3.75rem] border-[0 solid bg-transparent] py-0 px-[2.188rem] hover:duration-[0.4s] hover:transition-all hover:ease-linear  hover:bg-[#212832]">Back To Home</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
      {/* <DownloadSection /> */}
      <Footer />
    </>
  );
}

export default ErrorNotFoundPage;
