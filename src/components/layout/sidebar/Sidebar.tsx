import { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import MenuList from "./MenuList";

function Sidebar() {
  const { Header, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(true);

  const isCollabsed = () => (window.innerWidth < 768) && collapsed
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className={`flex h-full overflow-y-hidden z-50 ${!collapsed && ' max-md:absolute max-md:w-screen'}`}> 
    <Layout className="md:w-[250px] h-full">
      <Sider trigger={null} collapsed={isCollabsed()} collapsible collapsedWidth={0} className="text-white w-[250px]"style={{width:"250"}}>
        <MenuList collapsed={isCollabsed()} setCollapsed={setCollapsed}/>
      </Sider>
    </Layout>
    <div className={`${!collapsed && 'min-w-full'} backdrop-blur-[1px] md:hidden`} onClick={() => setCollapsed(true)} ></div>
    </div>
  );
}

export default Sidebar;
