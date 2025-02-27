import React, { useEffect, useState } from 'react';
import { Button, Carousel, Modal } from 'antd';
import useAdvertService from './AdvertService';
import { Advert } from '../../../types/AdvertItem';
import useLoading from '../../customs/loading/LoadingHook';
import ReactPlayer from 'react-player';


const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '120px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
interface ExternalProps {
 position:string
}

const ExternalAdvert = (props:ExternalProps) => {
  const onChange = (currentSlide: number) => {
  };
  const advertservice = useAdvertService();
  const [adverts, setAdverts] = useState<any[]>([
  ]);
  const [advertsForMobile,setAdvertsForMobile]= useState<Advert[]>([])


 const loading = useLoading();

    
    useEffect(() => {
      searchAdverts()
    }, []);
  
  const searchAdverts = ()=> {
      loading.startLoading();
      advertservice
        .getAdverts({position:props?.position,isHome:true})
        .then(({ data: result }) => {
         if(window.innerWidth > 768){
          setAdverts(divideArray(result.results));
         }else{
          setAdverts(result.results)
         }
          
          loading.stopLoading();
        })
        .catch((error) => loading.stopLoading());
  }

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };
  function divideArray(arr:Advert[]) {
    const result = [];
    for (let i = 0; i < arr.length; i += 2) {
        result.push(arr.slice(i, i + 2));
    }
    return result;
}

  return (
    <Carousel autoplay >
        {
         adverts.map((item,index)=><>
         {Array.isArray(item)&&
           <div className='hidden  md:flex'>
         {
          item.map((advert:Advert)=><>
             {(advert.video_url===null|| advert.video_url==="")&& 
         <a className='w-full h-full mr-0 mt-6 md:mr-6 md:mt-0' href={advert.link} target='_blank'>
         <img src={advert.image_url.toString()} alt="" className='h-[120px] w-full object-cover cursor-pointer'/>
     </a>
       }
       {(advert.video_url!=null&& advert.video_url!="")&& 
          <>
            <div className='w-full h-full mr-0 mt-6 md:mr-6 md:mt-0'  onClick={showModal}>
         <img src={advert.image_url.toString()} alt="" className='h-[120px] w-full object-cover cursor-pointer'/>
     </div> 
        <Modal
          title={advert.company_name}
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <ReactPlayer
            url={advert.video_url?.toString()}
            width={100 +'%'}
            controls={true} 
          />
          <a className='text-custom_orange-900' href={advert.link} target='_blank'>Go to website</a>
        </Modal>
        </>
          
       }
          </>)
         }
          </div>}
        
        {typeof item === 'object' && !Array.isArray(item) &&
          <div className='flex  md:hidden'>
         
         {(item.video_url===null|| item.video_url==="")&& 
         <a className='w-full h-full ' href={item.link} target='_blank'>
         <img src={item.image_url.toString()} alt="" className='h-[120px] w-full object-cover cursor-pointer'/>
     </a>
       }
       {(item.video_url!=null&& item.video_url!="")&& 
          <>
            <div className='w-full h-full mr-0   '  onClick={showModal}>
         <img src={item.image_url.toString()} alt="" className='h-[120px] w-full object-cover cursor-pointer'/>
     </div> 
        <Modal
          title={item.company_name}
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <ReactPlayer
            url={item.video_url?.toString()}
            width={100 +'%'}
            controls={true} 
          />
          <a className='text-custom_orange-900' href={item.link} target='_blank'>Go to website</a>
        </Modal>
        </>
          
       }
         
         
          </div>}
         </>)   
        }
    </Carousel>
  );

};

export default ExternalAdvert;