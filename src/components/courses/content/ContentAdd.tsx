import CustomInput from "../../customs/custom-input/CustomInput";
import CustomDropdown from "../../customs/custom-input/CustomDropdown";
import { useEffect, useState } from "react";
import CustomButton from "../../customs/custom-button/CustomButton";
import CustomCard from "../../customs/custom-card/CustomCard";
import QuestionAdd from "../question/QuestionAdd";
import { Chapter, Content } from "../../../types/Course";
import useTranslation from "../../../utils/translation";
import CustomImageFileInput from "../../customs/custom-input/CustomImageFileInput";
import CustomFileInput from "../../customs/custom-input/CustomFileInput";
import { useContentService } from "./ContentService";
import { SubmitHandler, useForm } from "react-hook-form";
import useLoading from "../../customs/loading/LoadingHook";
import useToast from '../../customs/toast/ToastHook';
import { SelectItem } from "../../../types/MenuItems";
import useFileService from "../../commons/file/FileService";
import { ContentType, FileTypes } from "../../../types/Enums";
import CustomDurationInput from "../../customs/custom-input/CustomDurationInput";
import Loading from "../../customs/loading/Loading";
import CustomTextArea from "../../customs/custom-input/CustomTextArea";
import { youtubeRegex } from "../../../utils/regex";

interface ContentAddProps {
  appendContent: (content : Content)=> void,
  chapter: string;
  selelctedContent?: Content;
  cancel?: () => void;
}

interface ContentType {
  id: number,
  name: string,
  content: JSX.Element
}

function ContentAdd({cancel,chapter,appendContent, selelctedContent}: ContentAddProps) {
  const [fileComponent, setFileComponent] = useState<JSX.Element>()
  const { register, control, setValue , handleSubmit,setError, formState: { errors },reset,getValues } = useForm<Content>();
  const {translate} = useTranslation();
  const [id, setId] = useState<string>();
  const contentService = useContentService()
  const loading = useLoading()
  const toast= useToast();
  const fileService = useFileService();
  const [youtubeUrlError, setYoutubeUrlError] = useState<string>("");
  const contentTypes: SelectItem<number>[] = [
    { value: 100, label: "Video Content" },
    { value: 101, label: "Image Content" },
    { value: 102, label: "Document Content" },
    { value: 103, label: "Question" },
    { value: 104, label: "Youtube video" },

  ];

  useEffect(() => {
    if(selelctedContent) {
      handleContentType(selelctedContent.content_type)
      reset(selelctedContent) 
    } else {
      reset({title:"", description: ""} as Content)
    } 
  }, [selelctedContent])

  const validateInputValue = (event:React.ChangeEvent<HTMLInputElement>) =>{
    const value = event.target.value;
    console.log("youtubeRegex.test(value)", youtubeRegex.test(value))
    if(!youtubeRegex.test(value)){
      console.log("url should be youtube url")
      setError("url",{message:"url should be youtube url"})
    }
  }
  
  const urlComponent = 
  (
    <CustomInput
      placeholder={translate('youtubeurl')}
      register={register}
      options={{
        required: 'url is required'
      }}
      label="url"
      onValueChange={(e)=>validateInputValue(e)}
      error={errors.url}
    />
  )

  const fileComp = (content_type: keyof typeof FileTypes) =>  
  <CustomFileInput register={register}
    fileType={content_type}
    label="file_field"
    options={{
      required:  "file is required" 
    }}
    placeholder="File "
    // error={errors.file_field} 
    />
  

  const handleContentType = (content_type?: keyof typeof FileTypes) => {
    if (content_type && [ContentType.IMAGE, ContentType.DOCUMENT, ContentType.VIDEO].some(value=> value === content_type) ){
      setFileComponent(fileComp(content_type));  
    } else if(content_type && content_type === ContentType.YOUTUBE_VIDEO){
      setFileComponent(urlComponent)
    } else {
      setFileComponent(<></>)
    }
  }

  const updateContent = (content: Content) => {
    contentService.updateContent(content).then(result => {
      toast.success("succesfully updated")
      cancel?.();
      appendContent(result.data)
      loading.stopLoading()
    }).catch((error) => loading.stopLoading())
  }

  const addContent = (content: Content) => {
    contentService.addContent(content).then(result=>{
      toast.success("succesfully added")
      setId(result.data.id)
      cancel?.();
      appendContent(result.data)
      reset()
      loading.stopLoading()
    }).catch((error) =>  {console.error(error); loading.stopLoading()}); 
  }

  const addOrUpdateContent = (content: Content) => {
    selelctedContent?.id ? updateContent(content) : addContent(content)
  }

  const onSubmit : SubmitHandler<Content> = (data) => {
    const formData = new FormData();
    data.file_field?.length && formData.append(
      "url",
      data?.file_field[0],
      (data.file_field[0] as unknown as File)?.name
    );
    formData.append("file_type",'101');
    data.chapter = chapter;
    loading.startLoading()  
    if([ContentType.IMAGE, ContentType.DOCUMENT, ContentType.VIDEO].some(value=> value === data.content_type) && (!selelctedContent?.id || formData.get("url"))){
      fileService.addFile(formData).then(({data:value})=>{
        data.url = value.url
        addOrUpdateContent(data)
      });
    } else{
      addOrUpdateContent(data);
    }
  }
  

  return (
    <>
      <CustomCard className="relative">
        <Loading    {...loading}  />
        <form onSubmit={handleSubmit(onSubmit)}>
           <CustomInput
            placeholder={translate('title')}
            register={register}
            label="title"
            options={{
              required: "Title is required"
            }}
            error={errors.title}
          />

          <CustomDropdown
            placeholder={translate("content_type")}
            data={contentTypes}
            key="name"
              register={register}
              label='content_type'
              options={{
                required: 'Content Type is required'
              }}
              isSearchable={false}
              control={control}
              error={errors.content_type}
              onValueChange={handleContentType}
          />  

          <CustomDurationInput label="duration" setValue={setValue} type="time"  options={{required: "Duration is required"}} getValues={getValues} placeholder="Duration"  error={errors.duration} register={register} />
          
          {getValues("content_type") === ContentType.QUESTION && <>
            <CustomInput
              type="number"
              placeholder="No of Question"
              register={register}
              label="no_question"
              options={{
                required: "No of Question is required"
              }}
              error={errors.no_question}
            />
            
            <CustomInput
              type="number"
              prefix={"per"}
              suffix={"go"}
              placeholder="Passing result in percent"
              register={register}
              label="passing_percent"
              options={{
                required: "Passing precent is required"
              }}
              error={errors.passing_percent}
            />
            <CustomDurationInput label="re_examination_waiting" setValue={setValue} getValues={getValues} placeholder="Re Examination Waiting"  error={errors.re_examination_waiting} register={register} />
          </>
          }
          <CustomTextArea
          placeholder={translate(getValues("content_type") === ContentType.QUESTION ? "instruction" : 'description')}
          register={register}
          type="textarea"
          label="description"
          options={{
            required: "Description is required"
          }}
          error={errors.description}
          />
          {fileComponent}
          <CustomButton type="submit" text={(selelctedContent?.id ? "Update": "Add" ) + " Content"} />
        </form>
      </CustomCard>
    </>
  );
}

export default ContentAdd;
