import registerLogin from '../../../assets/images/register-login.jpg';
import { UserPage } from "../../../types/UserPages";
import useTranslation from "../../../utils/translation";

function User(props: UserPage) {
    const {translate} = useTranslation()
    const { page:{title, element }} = props;

    return <div className="py-1  md:py-8  w-full">
        <div className="container mx-auto">
            <div className="px-5 md:p-16 max-sm:pb-6 md:pt-5 border border-solid border-custom_orange-100 rounded-xl">
                <div className="flex flex-wrap items-center">
                    <div className="lg:w-1/2 flex-auto max-w-full">
                        <div className="md:bg-custom_orange-100 max-sm:flex max-sm:justify-center text-center rounded-xl overflow-hidden relative z-10 mt-0">
                            <div className="w-full h-full">
                                <img src={registerLogin} alt="Register Login" className='' />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex-auto max-w-full">
                        <div className="max-w-full lg:max-w-[460px] ml-auto md:mt-11">
                            <h3 className="text-3xl font-medium md:pb-3">{title} <span
                                className="relative text-custom_orange-900 before:absolute before:bg-shape_4 before:bg-center before:bg-cover 
                                            before:bg-no-repeat before:w-32 before:h-3 before:left-1/2 before:-bottom-3 before:-translate-x-1/2">
                                                {title === 'Verification Code'?"":translate('now')}
                            </span>
                            </h3>
                            <div className="pt-7 relative">
                                {element}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default User;