import { useEffect } from "react";

interface FullProps {
    color: string
    widthHeight?: string;
}

export const FullStar = (props: FullProps) => {


    return <svg aria-hidden="true" className={`${props.widthHeight || 'w-5 h-5'} ${props.color}`}
        fill="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path className='st0' d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
}
interface HalfProps {
    firstColorRgb: string;
    secondColorRgb: string;
    widthHeight?: string
    rating: number;
}

export const HalfStar = (props: HalfProps) => {
    const ran = Math.random().toString()

    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`${props.widthHeight || 'w-5 h-5'} `} stroke-width="1" stroke="#eb985ccf">
        <defs>
            <linearGradient id={`halfStarGradient${ran}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="52%" style={{ stopColor: props.firstColorRgb, stopOpacity: 1, border: "border: solid 2px green" }} />
                <stop offset="48%" style={{ stopColor: props.secondColorRgb, stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        <path d="M10 2 L12.64 6.76 L18.18 7.64 L14.36 11.52 L15.45 16.76 L10 14.24 L4.55 16.76 L5.64 11.52 L1.82 7.64 L7.36 6.76 Z" fill={`url(#halfStarGradient${ran})`} />
    </svg>

}
interface ButtonReviewerProps {
    rating: number
    setRating: (rating: number) => void
    rateOnHover : number;
    setRateOnHover: (rating: number) => void
}

interface ButtonProps extends ButtonReviewerProps {
    rate: number
}

export const ButtonStar = (props: ButtonProps) => {


    return    <li onMouseEnter={() => props.setRateOnHover(props.rate)} onMouseLeave={() => props.setRateOnHover(0)}  onClick={()=>props.setRating(props.rate)} className="cursor-pointer" key={props.rate}>
    <svg aria-hidden="true" className={` w-5 h-5 ${(props.rateOnHover || props.rating)>= props.rate?'text-yellow-400':'text-custom_black-900'} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>{props.rate} star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            
    </li>
}


export const ButtonReviewStar = ({rating, setRating, rateOnHover, setRateOnHover}:ButtonReviewerProps) => {
   return  <>
    <ButtonStar rate={1} rating={rating} setRating={setRating} rateOnHover={rateOnHover} setRateOnHover={setRateOnHover} />
    <ButtonStar rate={2} rating={rating} setRating={setRating} rateOnHover={rateOnHover} setRateOnHover={setRateOnHover} />
    <ButtonStar rate={3} rating={rating} setRating={setRating} rateOnHover={rateOnHover} setRateOnHover={setRateOnHover} />
    <ButtonStar rate={4} rating={rating} setRating={setRating} rateOnHover={rateOnHover} setRateOnHover={setRateOnHover}/>
    <ButtonStar rate={5} rating={rating}  setRating={setRating} rateOnHover={rateOnHover} setRateOnHover={setRateOnHover} />
    </>
}

export const Rating = (props: { rating: number, widthHeight?: string }) => {

    return <div className="flex">
        {Array(Math.floor(props.rating)).fill(1).map(value => <FullStar widthHeight={props.widthHeight} color='text-yellow-400' />)}
        {Array(Math.ceil(props.rating) - Math.floor(props.rating)).fill(1).map(value =>
            <HalfStar widthHeight={props.widthHeight} firstColorRgb="rgb(250 204 21)" secondColorRgb="rgb(209 213 219)" rating={props.rating} />)}
        {Array(5 - Math.ceil(props.rating)).fill(1).map(value => <FullStar widthHeight={props.widthHeight} color="text-gray-300" />)}
    </div>
}