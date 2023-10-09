import { action } from "mobx";

import { Resetable } from "../interfaces/resetable";
import UIStore from "./ui";
import SettingsStore from "./settings";

class AppStore implements Resetable {
  UIStore!: UIStore;
  settingStore!: SettingsStore;

  constructor() {
    this.UIStore = new UIStore(this);
    this.settingStore = new SettingsStore(this);
  }

  @action reset(): void {
    this.UIStore.reset();
    this.settingStore.reset();
  }
}

export default AppStore;
