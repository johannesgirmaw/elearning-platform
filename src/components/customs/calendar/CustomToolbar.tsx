import { DatePicker, Radio } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { ToolbarProps, View } from "react-big-calendar";
import dayjs from "dayjs";
import { buddhistLocale } from "../../../utils/localize/dayjs.local";

interface RBCToolbarProps extends ToolbarProps {
  children?: any;
  isFirst: boolean;
  setIsFirst: (value: boolean) => void;
}

function RBCToolbar(props: RBCToolbarProps) {
  const {
    view,
    views,
    onView,
    onNavigate,
    children,
    isFirst,
    setIsFirst,
    date,
  } = props;
  const [month, setMonth] = useState(dayjs(date));
  const onChange = (event: any, dateString: any) => {
    setMonth(event);
    if (view === "month" || view === 'agenda') {
      onNavigate("DATE", moment(dateString, "YYYY-MM").toDate());
    }
    else if (view === "week") {
      onNavigate("DATE", moment(dateString, "YYYY-W").toDate());
    } else if(view === 'day'){
      onNavigate("DATE", moment(dateString, 'YYYY-MM-DD').toDate())
    }
  };

  const goToView = (view: any) => {
    onView(view.target.value);
  };

  const goToBack = () => {
    onNavigate("PREV");
  };
  const goToNext = () => {
    onNavigate("NEXT");
  };

  const goToToday = () => {
    onNavigate("TODAY");
  };

  useEffect(() => {
    if (isFirst) {
      onNavigate("DATE", moment().toDate());
      setIsFirst(false);
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-2 mx-2 mb-2 2xl:justify-between">
      <div className="rbc-btn-group">
        <Radio.Button key="today" onClick={goToToday}>
          Today
        </Radio.Button>
        <Radio.Button key="back" onClick={goToBack}>
          Back
        </Radio.Button>
        <Radio.Button key="next" onClick={goToNext}>
          Next
        </Radio.Button>
        {view === "day" && (
          <DatePicker
            key="date-picker"
            defaultValue={month}
            allowClear={false}
            onChange={onChange}
          />
        )}
        {(view === "month" || view === "agenda") && (
          <DatePicker
            key="month-picker"
            defaultValue={month}
            allowClear={false}
            picker="month"
            locale={buddhistLocale}
            onChange={onChange}
          />
        )}
        {(view === "week") && (
          <DatePicker
            key="month-picker"
            defaultValue={month}
            allowClear={false}
            picker="week"
            locale={buddhistLocale}
            onChange={onChange}
          />
        )}
      </div>
      {children}
      <div className="space-x-1">
        <Radio.Group value={view} onChange={goToView}>
          {(views as View[])?.map((item: any) => (
            <Radio.Button key={item} value={item}>
              {item}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
}

export default RBCToolbar;
