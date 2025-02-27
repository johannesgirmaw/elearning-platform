import { FaTimes } from "react-icons/fa";
import { CustomTab } from "../../../types/CustomTab";

interface CustomTabProps {
  tabs: CustomTab[]
  handleRemoveTab: (tab: CustomTab) => void
  activeTab: CustomTab
  handleActiveTab: (tab: CustomTab) => void
}

function CustomTabs({
  tabs,
  activeTab,
  handleRemoveTab,
  handleActiveTab,
}: CustomTabProps) {
  return (
    <>
      <div className="flex items-baseline pl-4">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <div className="relative" key={tab.name}>
              {tab.isClosable && (
                <i
                  onClick={() => handleRemoveTab(tab)}
                  className="absolute text-gray-400 cursor-pointer right-2 hover:text-custom_black-200"
                >
                  <FaTimes />
                </i>
              )}
              <h1
                key={tab.name}
                onClick={(e) => handleActiveTab(tab)}
                className={`pr-4 mr-2 pb-1 font-bold cursor-pointer ${
                  activeTab.name === tab.name
                    ? "border-b-2 border-b-custom_orange-700"
                    : " text-gray-400 hover:text-custom_black-200 hover:border-b-2 hover:border-b-custom_orange-700"
                }`}
              >
                {tab.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
      {activeTab.element}
    </>
  );
}

export default CustomTabs;
