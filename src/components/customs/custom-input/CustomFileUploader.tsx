import { useEffect, useState } from 'react';
import { FileOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Progress, Space, Typography, Upload, Image } from 'antd';
import { InputProps } from '../../../types/InputTypeProp';
import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { ContentType, FileTypes } from '../../../types/Enums';
import { RcFile } from 'antd/es/upload';
import CustomInputError from '../custom-input-error/CustomInputError';
import { FaStarOfLife } from 'react-icons/fa';
import { BiTrashAlt } from 'react-icons/bi';
import useApi from '../../../utils/api';
import { formatBytes } from '../../../utils/func_utils';

class FileType{
  name: string;
  uid:string;
  progress:number;
  estimate:number
}

export const CustomFileUploader = <T extends FieldValues>(props: InputProps<T>) =>{
    const { fileType = 100, getValues, label, register, placeholder, setValue, setError, clearErrors, control, options, error, imagePlaceHolder} = props;
    const [files, setFiles] = useState<FileType>(new FileType)
    const fileName = getValues&&getValues('file_name' as Path<T>);
    const fileSize = getValues&&getValues('file_size' as Path<T>);
    const {addFile, updateFile, deleteFile} = useFileApiFunc();
    const file_id = getValues && getValues(label)
    const [visible, setVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>("")
    const [scaleStep, setScaleStep] = useState(0.5);
    const [fileId, setFileId] = useState('');

    const validate = (file:RcFile, fileSize:number)=>{
        if(file.size < fileSize ){
            clearErrors?.(label)
            return true;
        }else{
            setError?.(label,{message:`File size should be less than ${ fileSize/(1024*1024) }MB`})
            return false
        }
     }

    const sizeValidation = (file:RcFile) => {
      if (file) {
        let fileSize = null
        if(ContentType.VIDEO===fileType){
          fileSize = 20*1024*1024
          return validate(file, fileSize)
        }
        else if (ContentType.IMAGE===fileType){
          fileSize = 2*1024*1024
          return validate(file, fileSize)
        }
        else if (ContentType.DOCUMENT ===fileType){
          fileSize = 1*1024*1024
          return validate(file, fileSize)
        }
      }
    }

    const uploadProps: UploadProps = {
      accept:FileTypes[fileType],
      maxCount:1,
      beforeUpload(file) {
        if(files){
          setFiles(new FileType())
        }
        return sizeValidation(file) || (Upload.LIST_IGNORE)
      },
      customRequest:(options)=>{
        const file = options.file as RcFile
        console.log(options)
        const formData = new FormData();
        formData.append('url', file as  Blob);
        formData.append("file_type",'101');

        const getFileObject = (progress:any, estimated:any)=>{
          return {
            name:file.name,
            uid:file.uid,
            progress:progress,
            estimated:estimated || 0
          }
        }

        if(!(getValues&&getValues(label))){
          let states = {setFiles, setFileValue, setImageUrl}
          addFile(file, setFileId,formData, getFileObject, states, props.fileType)
        }else{
          let states = {setFiles, setFileValue}
          updateFile(file,formData, getFileObject, states, file_id)
        }
        },
    };

    const setFileValue = (fileId:any) => setValue && setValue(label, fileId);
    useEffect(()=>{
      console.log('getValues&&getValues(label))!:',getValues&&getValues(label)!, fileId)
    }, [setValue, setFileValue, fileId])

    const getTimeString = (timeInSecond:any)=>{
      const hours = Math.floor(timeInSecond/3600)
      const minutes = Math.floor(timeInSecond/60 - hours*60);
      const seconds = Math.floor(timeInSecond - minutes*60 - hours*60);
      let timeString = `${seconds} sec`
      if(minutes){
        timeString = `${minutes} min ${timeString}`
      }
      if(hours){
        timeString = `${hours} hr ${timeString}`
      }
      return timeString
    }

    function areAllObjectValuesUndefined<T extends object>(obj: T): boolean {
      // Use Object.keys for type safety and potential performance benefits
      const keys = Object.keys(obj) as (keyof T)[]; // Type assertion for clarity
    
      for (const key of keys) {
        if (obj[key] !== undefined) {
          return false; // If any property is not undefined, return false
        }
      }
    
      // If the loop completes without finding any non-undefined values, return true
      return true;
    }

    return (
    <>
      <Controller
          key={label}
          name={label}
          control={control}
          rules={{
              required:options?.required, 
            }}
          render={({ field }) => {
              return(
                <div className='flex flex-col items-center justify-center h-full gap-y-2'>
                  <div className='flex flex-col w-full h-full'>
                  <label className="flex gap-1 text-xs text-slate-500" htmlFor={label}>{options?.required&&<FaStarOfLife style={{width:"7px",}} />}<span>{placeholder}</span></label>
                    <Upload.Dragger className='h-full' {...uploadProps} showUploadList={false}>
                        {props.fileType ===ContentType.IMAGE?(
                              <div className='flex flex-col items-center justify-center'>
                              { imageUrl!=="" ? (
                                <img src={imageUrl} alt="Uploaded Image" className='object-cover max-h-60' />
                              ) : (
                                imagePlaceHolder ||
                                <>
                                  <p className="ant-upload-drag-icon">
                                    <UserOutlined />
                                  </p>
                                  <p className="ant-upload-text">Click or drag picture to this area to upload</p>
                                  <p className="ant-upload-hint">
                                    Strictly prohibited uploading fake data or other banned images.
                                  </p>
                                </>
                              )}
                            </div>

                            ):(
                          <div>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                                </p>
                                
                                <p className="ant-upload-text">
                                  {
                                    !fileName ? (
                                    <>
                                      Click or drag file to this area to upload
                                    </>
                                    ):
                                    (
                                      <>Update current file by drag or upload new file</>
                                    )
                                  }
                                </p>
                                <p className="ant-upload-hint">
                                    Strictly prohibited uploading fake data or other
                                    banned files.
                                </p>
                          </div>)
                        }
                      </Upload.Dragger>
                      {
                         
                         !areAllObjectValuesUndefined(files) ? Object.values(files!).map((file , index) =>{
                            return(
                              file && (
                              <Space direction="vertical" className='mt-3' style={{
                                backgroundColor:"rgba(0,0,0,0.03",
                                padding:8,
                                borderRadius:10
                              }}>
                                <Space >
                                  <div className='flex flex-col'>
                                  <div className='flex'>
                                  <FileOutlined />
                                    <p className='w-full m-0 overflow-hidden truncate'>{(file as RcFile)?.name}</p>
                                    </div>
                                    {
                                      file?.estimated?(
                                    <Typography.Text type="secondary">
                                      {" "} is being uploaded in {getTimeString(file?.estimated)} seconds
                                    </Typography.Text>
                                      ):(
                                        <Typography.Text type="secondary">
                                      {" "} is uploaded successfully
                                    </Typography.Text>
                                      )
                                    }
                                    </div>
                                    <BiTrashAlt style={{color:"red"}} className='hover:cursor-pointer' onClick={()=>{deleteFile((getValues&&getValues(label))! || fileId ,setFiles, setFileValue ); setFileValue("");}}/>
                                </Space>
                                <Progress percent={Math.ceil(file?.progress * 100)} />
                              </Space>
                              )
                            )
                            }):(
                              (fileName && fileSize) &&(<Space direction="vertical" className='mt-3' style={{
                                backgroundColor:"rgba(0,0,0,0.03",
                                padding:8,
                                borderRadius:10
                              }}>
                                <Space >
                                  <FileOutlined />
                                    <Typography>
                                      {fileName} { (fileSize)}
                                    </Typography>
                                   
                                    <BiTrashAlt style={{color:"red"}} className='hover:cursor-pointer' onClick={()=>{deleteFile((getValues&&getValues(label))!|| fileId ,setFiles, setFileValue ); setFileValue("");}}/>
                                </Space>
                              </Space>)
                            )
                           
                      }
                  </div>
                  {props.fileType === ContentType.IMAGE && imageUrl && <div>
                      <Button type="primary" onClick={() => setVisible(true)}>show image preview </Button>
                      <Image
                        style={{ display: 'none' }}
                        src={imageUrl}
                        preview={{
                          visible,
                          scaleStep,
                          src: imageUrl,
                          onVisibleChange: (value) => {
                            setVisible(value);
                          },
                        }}
                      />
                    </div>}
                  {error && <CustomInputError msg={error?.message} />}
                </div>
              )
          }}
      />
    </>
    )
}


const useFileApiFunc = () =>{

  const { commonApi } = useApi()

  const addFile = (file:RcFile, setFileId:any, formData:FormData, getFileObject:any, states:any, file_type?: number) =>{
    let { setFiles, setFileValue, setImageUrl} = states

    commonApi.post("file/",
        formData, 
            {
              headers: {
                'content-type': 'multipart/form-data'
              },
              onUploadProgress: (event) => {
                setFiles(
                  (pre: FileType)=>{
                    return {...pre, [file.uid]:getFileObject(event?.progress, event.estimated)} as FileType
                  }
                )
              }
            })
      .then((result:any) => {
          setFileValue(result.data.id);
          setFileId(result.data.id);
          if(file_type === ContentType.IMAGE){
            setImageUrl(result.data.url)
          }
        }).catch((err) => {
          console.error('Error :', err);
        });
  }

  const updateFile = (file:RcFile, formData:FormData, getFileObject:any , states:any, id:any)=>{
    let { setFiles, setFileValue} = states
    
    commonApi.patch(`file/${id}`,
    formData, 
        {
          headers: {
            'content-type': 'multipart/form-data'
          },
          onUploadProgress: (event) => {
            setFiles(
              (pre: FileType)=>{
                return {...pre, [file.uid]:getFileObject(event?.progress, event.estimated)} as FileType
              }
            )
          }
        })
  .then((result:any) => {
      setFileValue(result.data.id);
    }).catch((err) => {
      console.error('Error :', err);
    });
  }

  const deleteFile = (id:string, setFiles:any, setFileValue:any,)=>{
    commonApi.delete(`file/${id}`
      ).then((result:any) => {
        setFileValue('');
        setFiles(new FileType());
      }).catch((err) => {
        console.error('Error :', err);
      });
  }

return {
  addFile, updateFile, deleteFile
}
}