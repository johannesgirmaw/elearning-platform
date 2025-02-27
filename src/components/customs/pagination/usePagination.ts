import { useEffect, useMemo, useState } from "react";
import { SelectItem } from "../../../types/MenuItems";
import { PaginationProps } from "antd";

const range = (start: number, end: number) => {
  let length = end - start + 1;
  /*
    Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};


export interface TableSearchModel {
  search?: string
  view_type?: string
  cursor?:string;
  ps?: number
  pn?: number
}


export interface UserSearchModel extends TableSearchModel {
  method?: string
}

export const usePagination = <T extends TableSearchModel>(props?: T) => {
  const [total, setTotal] = useState<number>(20);
  const [DOTS, setDOTS] = useState<number>(0);
  const [siblingCount, setSibilingCount] = useState<number>(1);
  const [showSizeChanger, setShowSizeChanger] = useState<boolean>(true);
  const [current, setCurrent] = useState<number>(1);
  const [next, setNext]= useState<{cursor: string} | string | null>(null)
  const [previous, setPrevious]= useState<{cursor: string}| string | null>(null)
  const [paginationRange, setPaginationRange] = useState<number[]>([]);
  // const [pageSizeOptions, setPageSizeOptions] = useState<SelectItem<number>[]>([
  //   { value: 1, label: '1' }, { value: 10, label: '10' }, { value: 25, label: '25' }, { value: 50, label: '50' }
  // ]);
  const [pageSizeOptions, setPageSizeOptions] = useState<number[] | string[]>([
		5, 10, 25, 50,
	]);
  const [pageSize, setPageSize] = useState(props?.ps || 10);
  const [filterData, setFilterData] = useState<T | TableSearchModel>({
    pn: current,
    ps: pageSize,
    ...props,
  });

  const onChange: PaginationProps["onShowSizeChange"] = (pn, ps) => {
    setCurrent(pn)
		const data = { ...filterData, pn, ps } as T;
		setFilterData(data);
	};
  
	const handleChange = (key: string, value: any) => {
		const data = { ...filterData, [key]: value } as T;
		if (filterData !== data){
			setFilterData({...data});
		}
	};

  const setSearchParamValuePair = (key:string, value:any)=>{
    const data = {...filterData, [key]:value} as T;
    if(filterData !==data){
      setFilterData({...data})
    }
  }

  const onPageNumberChange = (pn: number) => {
    setCurrent(pn)
    const data = { ...filterData, pn } as T;
    setFilterData(data);
  };

  const onPageSizeChange = (ps: number) => {
    const data = { ...filterData, ps } as T;
    setFilterData(data);
    setPageSize(ps)
  };


	useEffect(() => {
		setPageSize(filterData.ps!);
	}, [filterData]);


  useEffect(() => {
    const totalPageCount = Math.ceil(total / pageSize);
    
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      setPaginationRange(range(1, totalPageCount));
    }

    /*
        Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(current - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      current + siblingCount,
      totalPageCount
    );

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
        Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      setPaginationRange([...leftRange, DOTS, totalPageCount]);
    }

    /*
        Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {

      let rightItemCount = 2 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      setPaginationRange([firstPageIndex, DOTS, ...rightRange]);
    }

    /*
        Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      setPaginationRange([firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]);
    }
  }, [total, pageSize, siblingCount, current, DOTS]);

  return {
    paginationRange, 
    current,
    pageSizeOptions,
    setPageSizeOptions,
    total,
    showSizeChanger,
    onPageNumberChange,
    setTotal,
    setShowSizeChanger,
    setCurrent,
    onChange,
    filterData,
    setFilterData,
    pageSize,
    setPageSize,
    onPageSizeChange,
    setSibilingCount,
    handleChange,
    DOTS,
    next,
    setNext,
    previous,
    setPrevious,
    setSearchParamValuePair
  };
};