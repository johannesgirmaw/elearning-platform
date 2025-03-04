import { store } from "../../../slicers/store";
import { removeToast } from "../../../slicers/toasts";
import { ToastItem, ToastType } from "../../../types/ToastItem";
import Countdown from "antd/es/statistic/Countdown";

const notificationEvent = {
  [ToastType.Info]: "blue",
  [ToastType.Alert]: "red",
  [ToastType.Success]: "green",
  [ToastType.Warning]: "yellow",
  [ToastType.Secondary]: "gray"
}

const Toast = (props: ToastItem) => {
  
  const handleToastDismiss = () => {
    store.dispatch(removeToast(props.id!));
  };

  const selectedColor = notificationEvent[props.type];

  return (
    <li className="my-3" key={props.id}>
      <Countdown className="hidden" value={Date.now() +  (1000 * props.duration)} onFinish={handleToastDismiss}   />
      <div
        id="alert-1"
        className={`flex p-4 mb-4 text-${selectedColor}-700 bg-${selectedColor}-100 rounded-lg dark:bg-gray-800 dark:text-${selectedColor}-400`}
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <div className="ml-3 text-sm font-medium">
          {props.msg}
        </div>
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 bg-${selectedColor}-100 text-${selectedColor}-500 rounded-lg focus:ring-2 focus:ring-${selectedColor}-400 p-1.5 hover:bg-${selectedColor}-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-${selectedColor}-400 dark:hover:bg-gray-700`}
          data-dismiss-target="#alert-1"
          aria-label="Close"
          onClick={handleToastDismiss}
        >
          <span className="sr-only">Close</span>
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
        </button>
      </div>
    </li>
  );
};

export default Toast;
