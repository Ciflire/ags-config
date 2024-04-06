import { BatteryLabel } from './modules/battery.js';
import { Bar } from './modules/bar.js';
import {NotificationPopups} from "./modules/notificationPopups.js"


const screens = JSON.parse(Utils.exec('hyprctl monitors all -j'));

let windows = [NotificationPopups()];

for (let i = 0; i < screens.length; i++) {
  const screen = screens[i];

  // @ts-ignore
  windows.push(Bar({monitor: screen.id}))

}

export default {
  style: './style.css',
  windows: windows
}
