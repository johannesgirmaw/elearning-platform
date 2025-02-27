import { useState } from "react";
import { CustomTab } from "../../../types/CustomTab";

export interface CustomTabProps {
  tabs?: CustomTab[];
  activeTab?: number;
}

const useCustomTab = (props: CustomTabProps) => {
  const [tabs, setTabs] = useState<CustomTab[]>(props.tabs || []);
  const [activeTab, setActiveTab] = useState<CustomTab>(
    tabs[props.activeTab || 0]
  );
  const handleRemoveTab = (tab: CustomTab) => {
    if (activeTab.id === tab.id) {
      const index = tabs.findIndex((value) => value.id === tab.id);
      setActiveTab(tabs[index - 1]);
    }
    const newTabs = tabs.filter(t => tab.id !== t.id)
    setTabs(newTabs);
  };
  const handleActiveTab = (tab: CustomTab) => {
    setActiveTab(tab);
  };

  const handleAddTab = (tab: CustomTab, isActive: boolean = false) => {
    const newTabs = [...tabs, tab];
    setTabs(newTabs);
    if(isActive){
      setActiveTab(tab)
    }
  };

  return {
    tabs,
    activeTab,
    handleRemoveTab,
    handleActiveTab,
    handleAddTab
  };
};

export default useCustomTab;
