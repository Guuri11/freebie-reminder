import { useContext } from "react";

import { AppContext } from "../../context";
import AppStore from "../../stores/app";
import UIStore from "../../stores/app/ui";
import SettingsStore from "../../stores/app/settings";

export const useAppStore = (): AppStore => {
  const context = useContext(AppContext);
  if (context === null) {
    console.log("Use the hook inside AppProvider");
  }
  return context;
};


export const useUIStore = (): UIStore => {
  const store = useAppStore();
  return store.UIStore;
};

export const useSettingsStore = (): SettingsStore => {
  const store = useAppStore();
  return store.settingStore;
}
