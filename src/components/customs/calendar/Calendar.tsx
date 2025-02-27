import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import "./index.css";
import RBCToolbar from "./CustomToolbar";
import { ReactNode } from "react";
moment.locale('et', {
  months : 'ጥር_የካቲት_መጋቢት_ሚያዚያ_ግንቦት_ሰኔ_ሐምሌ_ነሐሴ_መስከረም_ጥቅምት_ህዳር_ታህሳስ'.split('_'),
  monthsShort : 'ጥር_የካ_መጋ_ሚያ_ግን_ሰኔ_ሐምሌ_ነሐ_መስ_ጥቅ_ህዳር_ታህ'.split('_'),
  monthsParseExact : true,
  weekdays : 'እሁድ_ሰኞ_ማክሰኞ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ'.split('_'),
  weekdaysShort : 'እ_ሰ_ማ_ረ_ሐ_አ_ቅ'.split('_'),
  weekdaysMin : 'እ_ሰ_ማ_ረ_ሐ_አ_ቅ'.split('_'),
  weekdaysParseExact : true,
  longDateFormat : {
      LT : 'HH:mm',
      LTS : 'HH:mm:ss',
      L : 'DD/MM/YYYY',
      LL : 'D MMMM YYYY',
      LLL : 'D MMMM YYYY HH:mm',
      LLLL : 'dddd D MMMM YYYY HH:mm'
  },
  calendar : {
      sameDay : '[Aujourd’hui à] LT',
      nextDay : '[Demain à] LT',
      nextWeek : 'dddd [à] LT',
      lastDay : '[Hier à] LT',
      lastWeek : 'dddd [dernier à] LT',
      sameElse : 'L'
  },
  relativeTime : {
      future : 'dans %s',
      past : 'il y a %s',
      s : 'quelques secondes',
      m : 'une minute',
      mm : '%d minutes',
      h : 'une heure',
      hh : '%d heures',
      d : 'un jour',
      dd : '%d jours',
      M : 'un mois',
      MM : '%d mois',
      y : 'un an',
      yy : '%d ans'
  },
  dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
  ordinal : function (number) {
      return number + (number === 1 ? 'er' : 'e');
  },
  meridiemParse : /PD|MD/,
  isPM : function (input) {
      return input.charAt(0) === 'M';
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem : function (hours, minutes, isLower) {
      return hours < 12 ? 'PD' : 'MD';
  },
  week : {
      dow : 1, // Monday is the first day of the week.
      doy : 4  // Used to determine first week of the year.
  }
});
// moment.locale("et")
const localizer = momentLocalizer(moment);

export interface CustomCalanderProps extends CalendarProps {
  children?: ReactNode
  isFirst: boolean
  setIsFirst: (value:boolean) => void
}

export default function Calendar(customProps: Omit<CustomCalanderProps, "localizer">) {
  return <BigCalendar {...customProps} localizer={localizer} components={{toolbar: props => (<RBCToolbar {...props} isFirst={customProps.isFirst} setIsFirst={customProps.setIsFirst} children={customProps.children}/>)}} />;
}
