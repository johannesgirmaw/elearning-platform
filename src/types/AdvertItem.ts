export interface Advert {
    id: string,
    company_name: string,
    description: string,
    link:string,
    start_time: string | Date,
    end_time: string |Date,
    position:string | number,
    status:string | number,
    image_url:FileList | string;
    video_url:FileList | string;
}

export interface PartialAdvert extends Partial<Advert>{
	
}








