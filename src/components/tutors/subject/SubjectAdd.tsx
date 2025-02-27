import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../customs/custom-input/CustomDropdown"
import CustomInput from "../../customs/custom-input/CustomInput"
import CustomTextArea from "../../customs/custom-input/CustomTextArea"
import useTranslation from "../../../utils/translation";
import useLoading from "../../customs/loading/LoadingHook";
import { useEffect, useState } from "react";
import { SelectItem } from "../../../types/MenuItems";
import { SubmitHandler, useForm } from "react-hook-form";
import useSubjectService, { Subject } from "./SubjectService";
import useCategoryService from "../../courses/category/CategoryService";
import CustomButton from "../../customs/custom-button/CustomButton";

const  SubjectAdd  = () => {

    const { register, setError, control, handleSubmit,reset, getValues, watch, formState: { errors } } = useForm<Subject>();
    const [categories, setCategories] = useState<SelectItem<string>[]>([]);
    const loading = useLoading()
    const {translate} = useTranslation()
    const navigate = useNavigate()
    const categoryService = useCategoryService()
    const subjectService = useSubjectService()

    const getCategoryData = (filterText: string) => {
        categoryService.getCategories({
          ps: 5,
          cursor: '',
          search: filterText
        }).then(({data: response} )=> {
          setCategories(response.results.map((resp) => ({
            label: resp.category_name,
            value: resp.id
          })))
        })
      
      };
    
      useEffect(() => {
        getCategoryData("")
      }, [])


      const onSubmit: SubmitHandler<Subject> = (data: Subject) => {
        loading.startLoading();
        if (data.id) {
          subjectService.updateSubject(data.id, data)
            .then((value) => {
              loading.stopLoading();
            })
            .catch((error) => { loading.stopLoading(); console.log(error.data); });
        } else {
            subjectService
            .addSubject(data)
            .then((value) => {
              loading.stopLoading();
            })
            .catch((error) => { loading.stopLoading(); console.log(error.data); });
        }
    
      };
    return (
            <>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomDropdown
                                placeholder="Category"
                                data={categories}
                                register={register}
                                control={control}
                                multiple
                                label='category'
                                options={{
                                    required: 'Category is required'
                                }}
                                onInputChange={(value) => getCategoryData(value)}
                                isSearchable={true}
                                error={errors.category}
                                />
                        <CustomInput
                            register={register}
                            label="subject_name"
                            error={errors.subject_name}
                            options={{
                                required: "Subject Name is required"
                            }}
                            placeholder="Subject Name"
                            />
                        <CustomTextArea
                            register={register}
                            label="description"
                            error={errors.description}
                            options={{
                            required: "Course Description is required"
                            }}
                            placeholder="Description"
                            />


                      {/* {!props.bankDetail && */}
                        <CustomButton type="submit" text="Add Subject" />
                      {/* {props.bankDetail && */}

                    </form>
                </div>    
            </>
    )
        
        
        
}

export default SubjectAdd;