
interface Props {
    image?: string;
    name?: string;
}


export const ProfileImage = (props: Props) => {

    return <div className="rounded-full flex items-center min-w-16 w-16 h-16 mt-1 bg-gray-300 text-custom_orange-800 text-5xl justify-center">
        { props.image ? <img src={props.image}  alt="Author" /> :
            <div className="">{props.name!.slice(0,1)}</div>
        }
    </div>

}