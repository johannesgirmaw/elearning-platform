import PropTypes from "prop-types";
import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";
import Toast from "./Toast";
import { store } from "../../../slicers/store";

// import { removeToast } from "../../actions/toasts";

const Toasts = () => {
  // const { removeToast } = props.actions;
  const [toasts, setToasts] = useState<{msg: string, duration: number}[]>([])
  store.subscribe(() => {
    setToasts(store.getState().toast)
  })

  return (
    <ul className="fixed right-1/2 translate-x-1/2 bottom-5 z-50">
      {toasts.map((toast: any) => {
        const { id } = toast;
        return (
          <Toast {...toast} key={id} />
        );
      })}
    </ul>
  );
};

export default Toasts;