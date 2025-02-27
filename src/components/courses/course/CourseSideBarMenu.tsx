import {
    BsFileEarmarkPlusFill,
    BsFillBookmarksFill,
    BsFillPieChartFill,
  } from "react-icons/bs";
  import { FaUserAlt } from "react-icons/fa";
import { DashboardMenuItem } from "../../commons/dashboard-sidebar/dashboardMenuItems";

export const sidebars: (course_id: string) =>DashboardMenuItem[] = (course_id: string) => {
  return [
    { icon: <BsFillBookmarksFill></BsFillBookmarksFill>, name: "Contents", id: 'context', keyId: 5, link: `courses/${course_id}`},
    { icon: <BsFillPieChartFill></BsFillPieChartFill>, name: "Reviews" , id: 'review', keyId: 9, link: `courses/${course_id}/reviews` },
    { icon: <FaUserAlt></FaUserAlt>, name: "Users and Progress", id: 'users', keyId: 6, link: '#' },
    { icon: <BsFileEarmarkPlusFill></BsFileEarmarkPlusFill>, name: "Files" , id: 'files', keyId: 7, link: '#' },
    { icon: <BsFillPieChartFill></BsFillPieChartFill>, name: "Reports" , id: 'report', keyId: 8, link: '#' },
  ];

}