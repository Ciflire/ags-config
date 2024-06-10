import { Bar } from "./windows/bar.js"
import { NotificationPopups } from "./windows/notificationPopups.js"


App.config({
  style: App.configDir + "/style/notificationPopups.css",
  windows: [
    Bar(),
    NotificationPopups()
  ],
})
