import dayjs from 'dayjs'
import en from 'antd/es/date-picker/locale/en_US';

export const buddhistLocale: typeof en = {
    ...en,
    lang: {
      ...en.lang,
      shortMonths: 'ጥር_የካ_መጋ_ሚያ_ግን_ሰኔ_ሐምሌ_ነሐ_መስ_ጥቅ_ህዳር_ታህ'.split('_')
    },
  };

const localeObject  = {
    name: 'et', // name String
    weekdays: 'እሁድ_ሰኞ_ማክሰኞ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ'.split('_'), // weekdays Array
    weekdaysShort: 'እ_ሰ_ማ_ረ_ሐ_አ_ቅ'.split('_'), // OPTIONAL, short weekdays Array, use first three letters if not provided
    weekdaysMin: 'እ_ሰ_ማ_ረ_ሐ_አ_ቅ'.split('_'), // OPTIONAL, min weekdays Array, use first two letters if not provided
    weekStart: 1, // OPTIONAL, set the start of a week. If the value is 1, Monday will be the start of week instead of Sunday。
    yearStart: 4, // OPTIONAL, the week that contains Jan 4th is the first week of the year.
    months: 'ጥር_የካቲት_መጋቢት_ሚያዚያ_ግንቦት_ሰኔ_ሐምሌ_ነሐሴ_መስከረም_ጥቅምት_ህዳር_ታህሳስ'.split('_'), // months Array
    monthsShort: 'ጥር_የካ_መጋ_ሚያ_ግን_ሰኔ_ሐምሌ_ነሐ_መስ_ጥቅ_ህዳር_ታህ'.split('_'), // OPTIONAL, short months Array, use first three letters if not provided
    ordinal: (n: any) => `${n}º`, // ordinal Function (number) => return number + output
    formats: {
      // abbreviated format options allowing localization
      LTS: 'h:mm:ss A',
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A',
      // lowercase/short, optional formats for localization
      l: 'D/M/YYYY',
      ll: 'D MMM, YYYY',
      lll: 'D MMM, YYYY h:mm A',
      llll: 'ddd, MMM D, YYYY h:mm A'
    },
    relativeTime: {
      // relative time format strings, keep %s %d as the same
      future: 'in %s', // e.g. in 2 hours, %s been replaced with 2hours
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours', // e.g. 2 hours, %d been replaced with 2
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    },
    meridiem: (hour: number, minute: any, isLowercase: any) => {
      // OPTIONAL, AM/PM
      return hour > 12 ? 'PM' : 'AM'
    }
  }


const locale = localeObject // Your Day.js locale Object.

dayjs.locale(locale, undefined, true) // load locale for later use

export default locale