import { Button, ConfigProvider, Menu } from "antd";
import useTranslation from "../../../utils/translation";
import { FiSettings, FiList, FiUserCheck, FiUsers, FiUser } from "react-icons/fi";
import { IoLibraryOutline } from "react-icons/io5";
import { DashboardMenuItem } from "../../commons/dashboard-sidebar/dashboardMenuItems";
import { Link, useLocation } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import useAuthorization from "../../account/auth/authorization";
import { RiAdvertisementFill, RiBankFill } from "react-icons/ri";
import { IoLocation } from "react-icons/io5";
import { MdOutlineFilePresent, MdPayment } from "react-icons/md";

const generateMenu = (menus: DashboardMenuItem[]) => {
  let lst: any = [];
  for (let menu of menus) {
    if (menu.children && menu.children.length) {
      const childMenu = generateMenu(menu.children);
      lst.push(
        <Menu.SubMenu icon={menu.icon} key={menu.keyId} title={menu.name}>
          {childMenu}
        </Menu.SubMenu>
      );
    } else {
      lst.push(
        <Menu.Item key={menu.link} icon={menu.icon}>
          <Link to={menu.link}>{menu.name}</Link>
        </Menu.Item>
      );
    }
  }
  return lst;
};

interface MenuProps {
  collapsed: boolean;
  setCollapsed: (collapse: boolean) => void;
}

const MenuList = ({ collapsed, setCollapsed }: MenuProps) => {
  const { translate } = useTranslation();
  const authorization = useAuthorization();
  const location = useLocation();

  const menu: () => DashboardMenuItem[] = () => {
    let menus: DashboardMenuItem[] = [ {
      id: "profile",
      keyId: 1,
      icon: <FiUser />,
      name: translate("profile"),
      link: "/instructor_dashboard/profile",
      visible: authorization.isLoggedIn(),
    },
    {
      id: "tutors",
      keyId: 1,
      name: translate("tutors"),
      link: "#",
      icon: <FiList></FiList>,
      children: [
        {
          id: "profile",
          keyId: 11,
          name: translate("profile"),
          link: "/instructor_dashboard/profile",
        },
        {
          id: "tobetutor_request",
          keyId: 12,
          name: translate("tobe_tutor_request"),
          link: "/instructor_dashboard/tobe_tutor_request",
          visible: authorization.canCreate("tutor"),
        },
        {
          id: 'tutor_contract',
          keyId: 13,
          name: 'TutorContract',
          link: '/instructor_dashboard/tutor_contract',
          visible: authorization.canCreate("tutorcontract"),
        },
        {
          id: 'location',
          keyId: 14,
          // icon:<IoLocation />,
          name: 'Location',
          link: '/instructor_dashboard/location',
          visible: authorization.canCreate("location"),
        },
        {
          id: 'subject',
          keyId: 15,
          // icon:<IoLocation />,
          name: 'Subjects',
          link: '/instructor_dashboard/subject',
          visible: authorization.canCreate("subject"),
        },
      ],

    },
    {
      id: "courses",
      keyId: 2,
      name: translate("courses"),
      link: "#",
      icon: <IoLibraryOutline></IoLibraryOutline>,
      children: [
        {
          id: "category",
          keyId: 21,
          name: "Category",
          link: "/instructor_dashboard/category",
          visible: authorization.canCreate("category"),
        },
        {
          id: "my_courses",
          keyId: 22,
          name: translate("my_courses"),
          link: "/instructor_dashboard/courses",
          visible: authorization.canCreate("course"),
        },
        {
          id: 'course_approval',
          keyId: 23,
          name: 'Course Publishment',
          link: '/instructor_dashboard/course_publish',
          visible: authorization.isSysAdmin(),
        },
        {
          id: "tobeinstructor_request",
          keyId: 24,
          name: translate("tobe_instructor_request"),
          link: "/instructor_dashboard/tobe_instructor_request",
          visible: authorization.canCreate("tobeinstructorrequest"),
        },
      ],
    },
    {
      id: "user_acl",
      keyId: 3,
      name: translate("user_acl"),
      link: "#",
      icon: <FiUserCheck></FiUserCheck>,
      children: [
        {
          id: "list_user",
          keyId: 31,
          name: "Users",
          link: "/instructor_dashboard/user_list",
          visible: authorization.canCreate('customuser'),
        },
        {
          id: "permission_user",
          keyId: 32,
          name: "User Permission",
          link: "/instructor_dashboard/user_permission_list",
          visible: authorization.canCreate("userpermission"),
        },
      ],
    },
    {
      id: "group_acl",
      keyId: 4,
      name: translate("group_acl"),
      link: "#",
      icon: <FiUsers></FiUsers>,
      children: [
        {
          id: "group",
          keyId: 41,
          name: "Group",
          link: "/instructor_dashboard/group_list",
          visible: authorization.canCreate("group"),
        },
        {
          id: "group_permission",
          keyId: 42,
          name: "Group Permission",
          link: "/instructor_dashboard/group_permission_list",
          visible: authorization.canCreate("grouppermission"),
        },

      ],
    },
    {
      id: 'advert',
      keyId: 5,
      icon: <RiAdvertisementFill />,
      name: 'Advert',
      link: '/instructor_dashboard/advert_list',
      visible: authorization.canCreate("advert"),
    },
    {
      id: 'bank',
      keyId: 6,
      icon: <RiBankFill />,
      name: 'Bank',
      link: '/instructor_dashboard/bank_list',
      visible: authorization.canCreate("bank")
    },
    {
      id: 'attendance',
      keyId: 7,
      icon: <IoLocation />,
      name: 'Attendance',
      link: '/instructor_dashboard/attendance',
      visible: authorization.canCreate("attendance")
    },
    {
      id: 'payments',
      keyId: 8,
      icon: <MdPayment />,
      name: 'Payments',
      link: '/instructor_dashboard/payments',
      visible: authorization.canCreate("paymentrequest"),
    },
    {
      id: 'file',
      keyId: 9,
      icon: <MdOutlineFilePresent />,
      name: 'File',
      link: '/instructor_dashboard/file',
      visible: authorization.canCreate("file"),
    },
    ];
    menus = menus.map(value => {
      if (value.children && value.children.length) {
        value.children = value.children.filter(val => val.visible);
        value.visible = value.children.length ? true : false;
      }
      return value;
    });
    return menus.filter(value => value.visible);
  };

  const generatedMenu = generateMenu(menu());
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorPrimary: '#212832',
            itemBg: '#ff735c',
            itemColor: '#212832',
            itemSelectedBg: '#212832',
            itemSelectedColor: '#eee',
            algorithm: true, // Enable algorithm
            subMenuItemBg: '#ff735c'
          },
          Button: {}
        },
      }}
    >
    <div className={`${!collapsed && 'w-[250px] h-full overflow-y-auto bg-custom_orange-900 '}`}>
        <div className={`md:hidden ${collapsed ? 'bg-white fixed' : 'justify-end pr-3'} flex `}>
          <Button
            type="text"
            className=" p-2 text-right text-custom_black-200 hover:!text-custom_black-200"
            onClick={() => setCollapsed(!collapsed)}
            icon={
              collapsed ? (
                <MenuUnfoldOutlined rev={undefined} />
              ) : (
                <MenuFoldOutlined rev={undefined} />
              )
            }
          />
        </div>
        {!collapsed &&
          <Menu
            theme="light"
            inlineCollapsed={collapsed}
            mode="inline"
            className="z-auto flex flex-col gap-4 text-base "
            onSelect={() => setCollapsed(true)}
            defaultSelectedKeys={[ location.pathname ]}
          >
            {generatedMenu}
          </Menu>
        }
      </div>
    </ConfigProvider>
  );
};

export default MenuList;
