import { action, makeAutoObservable, observable } from "mobx";
import AppStore from "..";
import { Resetable } from "../../interfaces/resetable";
import { storeData } from "../../../hooks/useAsyncStorage";
import { MODE } from "../../../constants";

class SettingsStore implements Resetable {
  appStore!: AppStore;

  @observable allowNotifications = false;
  @observable theme = MODE;

  constructor(app: AppStore) {
    makeAutoObservable(this);
    this.appStore = app;
    this.allowNotifications = false;
    this.theme = MODE;
  }

  reset(): void {
    this.allowNotifications = false;
    this.theme = MODE;
  }

  @action setAllowNotifications(allow: "1" | "0") {
    storeData("allow-notifications", allow);
    this.allowNotifications= allow === "1";
  }


  @action setTheme(mode: "dark" | "light") {
    storeData("theme-mode", mode);
    this.theme= mode;
  }
}

export default SettingsStore;
