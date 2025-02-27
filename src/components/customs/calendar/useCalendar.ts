import moment from "moment";
import { useEffect } from "react";
import { ToolbarProps } from "react-big-calendar";

const useCalendar = (props:ToolbarProps) => {
    useEffect(() => {
          props.onNavigate("DATE", moment().toDate());
      }, [props.view]);
}

export default useCalendar;