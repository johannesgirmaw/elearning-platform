import React, { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import CustomInputError from "../custom-input-error/CustomInputError";
import CustomInput from "./CustomInput";

function CustomDropdownVideoList(props: any) {
  const [searchText, setSearchText] = useState("");
  const [showList, setShowList] = useState(false);
  const { placeholder, data, value, onValueChange, onFilterData, errorList = [] } = props;

  useEffect(() => {
    const wait = setTimeout(() => onFilterData(searchText), 1000)
    return () => clearTimeout(wait)
  }, [searchText])

  const handleList = (e: React.MouseEvent<HTMLElement>) => {
    setShowList(!showList);
  };

  const handleSelect = (selected: any) => {
    onValueChange(selected)
    setShowList(false)
    setSearchText('')
  }

  const errorParagraphList = errorList.map((error: string, idx: number) => (
    <CustomInputError msg={error} key={idx} />
  ));

  return (
    
    <div className="mt-5 border border-custom_orange-700 rounded-lg">
      <div className="flex px-6 text-gray-400 h-12 items-center justify-between rounded-lg">
        {value ? <p className="text-custom_black-200">{value.name}</p> : <p>{placeholder}</p>}
        {showList ? (
          <i className="cursor-pointer" onClick={handleList}>
            <FaCaretDown></FaCaretDown>
          </i>
        ) : (
          <i className="cursor-pointer" onClick={handleList}>
            <FaCaretUp></FaCaretUp>
          </i>
        )}
      </div>
      {showList && <div className="-mt-5">
        <ul>
          {data.map((d: any) => (
            <li
              className="px-6 h-10 text-base text-custom_black-200 hover:bg-custom_orange-800 flex hover:text-white items-center"
              key={d.value}
              onClick={() => handleSelect(d)}
            >
              {d.name}
            </li>
          ))}
        </ul>
      </div>}
      {errorParagraphList}
    </div>
  );
}

export default CustomDropdownVideoList;
