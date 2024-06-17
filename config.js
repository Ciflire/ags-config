import { Bar } from "./windows/bar.js"
import { NotificationPopups } from "./windows/notificationPopups.js"
import { win } from "./windows/media_player.js"

App.config({
  style: App.configDir + "/style.css",
  windows: [
    Bar(),
    NotificationPopups(),
    win,
  ],
})
