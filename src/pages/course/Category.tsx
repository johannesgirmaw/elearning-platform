import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

import CategoryAdd from '../../components/courses/category/CategoryAdd'
import CategoryList from '../../components/courses/category/CategoryList'
import { Category } from '../../types/Category'

import { Modal } from 'antd'
import useAuthorization, { isVisible } from '../../components/account/auth/authorization'

function CategoryContainer() {
 const authorization = useAuthorization();
 const [addNew, setAddNew] = useState(false);
 const [selectedData, setSelectedData] = useState<Category>();
 const [search, setSearch] = useState(false)

  const onClose = () => {
    setAddNew(false);
    setSelectedData(undefined);
    setSearch(!search)
  }

  const context: any = useOutletContext();
  
  useEffect(() => {
    context.setTitle("Categories")
  },[])

    return (
      <>
    <div className="flex md:flex-row p-2 flex-col justify-evenly md:pr-16 mx-auto gap-4">
          <div className='w-full md:w-3/5 md:px-6'>
              <CategoryList search={search} setAddNew={setAddNew} selectedData={selectedData} setSelectedData={setSelectedData} />
          </div>
          <div className={`w-full md:w-2/5 md:px-6 ${isVisible(authorization.canCreate("category"))} hidden md:block`}>
          <CategoryAdd cancel={onClose} categoryData={selectedData} setCategoryData={setSelectedData}/>
          </div>
     </div>
        <Modal open={addNew && (window.innerWidth < 768)} onCancel={() => {setAddNew(false); setSelectedData(undefined);}}  footer={[]} >
          <CategoryAdd  categoryData={selectedData}  setCategoryData={setSelectedData} cancel={onClose} />
        </Modal>
      </>
    )

}


export default CategoryContainer

