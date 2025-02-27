import React, { useState } from 'react';
import classnames from 'classnames';
import './pagination.scss';
import CustomDropdown from '../custom-input/CustomDropdown';
import { SelectItem } from '../../../types/MenuItems';
import { useForm } from 'react-hook-form';

export interface PaginationProps {
  current: number,
  onPageNumberChange: (page: number) => void,
  className: string;
  paginationRange?: number[],
  onPageSizeChange: (newPageSize: number) => void,
  pageSizeOptions: SelectItem<number>[]
  pageSize: number;
  DOTS: number;
}

const Pagination = (props: PaginationProps) => {
  const {
    onPageNumberChange,
    current,
    className,
    paginationRange,
    onPageSizeChange,
    pageSizeOptions,
    DOTS
  } = props;

  const { register, control, formState: { errors } } = useForm<{ page_size: number }>({defaultValues: {page_size: props.pageSize}});


  // If there are less than 2 times in pagination range we shall not render the component
  // if (current === 0 || paginationRange!.length < 2) {
  //   return null;
  // }

  const onNext = () => {
    onPageNumberChange(current + 1);
  };


  const onPrevious = () => {
    onPageNumberChange(current - 1);
  };


  let lastPage = paginationRange![paginationRange!.length - 1];

  return (
    <div className='flex flex-col sm:flex-row justify-end items-center mt-4'>
      <CustomDropdown
        placeholder="Page Size"
        data={pageSizeOptions}
        register={register}
        control={control}
        label='page_size'
        isClearable={false}
        onValueChange={onPageSizeChange}
        error={errors.page_size}
        className='border-none'
      />
      <ul
        className={classnames('pagination-container', { [className]: className })}
      >
        <li>
        </li>
        {/* Left navigation arrow */}
        <li
          className={classnames('pagination-item', {
            disabled: current === 1
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange?.map(pageNumber => {

          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>;
          }

          // Render our Page Pills
          return (
            <li
              className={classnames('pagination-item', {
                selected: pageNumber === current
              })}
              onClick={() => onPageNumberChange(pageNumber as number)}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li
          className={classnames('pagination-item', {
            disabled: current === lastPage
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;