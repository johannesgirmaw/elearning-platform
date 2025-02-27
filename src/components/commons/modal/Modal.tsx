import React from 'react';

export const Modal = (prop: any) => {
  const { setOpenModel, deleteMethod } = prop;
  return (
    <div className="relative w-full h-full max-w-2xl md:h-auto">
      <div className="relative bg-white  rounded-lg shadow dark:bg-gray-700">
        <div
          className="flex items-start justify-between
         p-4 border-b rounded-t dark:border-gray-600 bg-custom_orange-900 z-100"
        >
          <h1 className="text-2xl font-semibold text-white dark:text-white">
            Warnning
          </h1>
          <button
            type="button"
            className="text-white bg-transparent
              hover:bg-gray-200 hover:text-gray-900 
              rounded-lg text-sm p-1.5 ml-auto inline-flex
               items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setOpenModel('')}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Are You Sure You Want To Delete !
          </p>
        </div>

        <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 ">
          <button
            data-modal-hide="defaultModal"
            type="button"
            onClick={() => deleteMethod()}
            className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-800 dark:focus:bg-orange-800"
          >
            Delete
          </button>
          <button
            data-modal-hide="defaultModal"
            type="button"
            className="text-gray-500 bg-white
              hover:bg-gray-100 focus:ring-4 
              focus:outline-none focus:ring-blue-300 rounded-lg border
               border-custom_orange-700 text-sm font-medium px-5 py-2.5
                hover:text-gray-900 focus:z-10 dark:bg-gray-700
                 dark:text-gray-300 dark:border-gray-500
                  dark:hover:text-white dark:hover:bg-gray-600
                   dark:focus:ring-gray-600 "
            onClick={() => setOpenModel('')}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
