function Dropdown(prop:any){

    return <>
    <div className="w-35 self-end mb-2 mt-5 lg:mt-0 md:w-44 ">
        <select name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-none block    pb-3 pt-3">
          {prop.data.map((d:any)=><> <option value={d.value}>{d.name}</option></>)}
        </select>
    </div>
    </>

    
}

export default Dropdown;
