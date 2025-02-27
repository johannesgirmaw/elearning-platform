import './download.css';
import shape_14 from "../../../assets/images/shape-14.webp";
import google_play from "../../../assets/images/google-play.webp";
import app_store from "../../../assets/images/app-store.webp";

function DownloadSection() {
    return (
        <div className="  py-20 bg-custom_orange-900 relative overflow-hidden w-full px-4">
            <div className="absolute w-[300px]  m:w-[560px] lg:w-[560px]  h-[300px] md:h-[560px] lg:h-[560px] border-solid border-[#ffffff26] border-[1px] rounded-full top-[60px] left-[85px]"></div>
            <div className="absolute w-[300px]  m:w-[560px] lg:w-[560px]  h-[300px] md:h-[560px] lg:h-[560px] border-solid border-[#ffffff26] border-[1px] rounded-full top-[60px] left-[31%]"></div>
            <div className="absolute w-[300px]  m:w-[560px] lg:w-[560px]  h-[300px] md:h-[560px] lg:h-[560px] border-solid border-[#ffffff26] border-[1px] rounded-full bottom-[70%] right-[15%]"></div>
            <div className="absolute w-[300px]  m:w-[560px] lg:w-[560px]  h-[300px] md:h-[560px] lg:h-[560px] border-solid border-[#ffffff26] border-[1px] rounded-full top-[-50px] right-[-243px]"></div>

            <div className="container mx-auto max-w-[1200px]">

                <div className="flex justify-center md:justify-between w-full  items-center flex-wrap place-items-center  relative mt-7 px-">
                    <div className="mt-6 pr-4 max-w-lg">
                        <h5 className="text-white text-xl mb-5 font-medium">Ready to start?</h5>
                        <h2 className="text-white text-2xl sm:text-4xl font-medium">Download our mobile app. for easy to start your course.</h2>
                    </div>

                    <img className="absolute top-[40%] left-[50%] animate-custom-wiggle max-w-full" src={shape_14} alt="shape-14" />
                    <div className=" pt-[20px] pl-[15px]">
                        <ul className="flex flex-wrap justify-center">
                            <li className="mr-[30px] pt-[20px]"><a href="#" className='w-[180px] h-[63px] bg-white flex justify-center place-items-center rounded-[10px] shadow-[0_0_0_5px_rgba(255,255,255,0.15)]'><img src={google_play} className="max-w-full" alt="Google Play" /></a></li>
                            <li className="mr-[30px] pt-[20px]"><a href="#" className='w-[180px] h-[63px] bg-white flex justify-center place-items-center rounded-[10px] shadow-[0_0_0_5px_rgba(255,255,255,0.15)]'><img src={app_store} className="max-w-full"  alt="App Store" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default DownloadSection;