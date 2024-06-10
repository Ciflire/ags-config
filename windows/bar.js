import { clock } from "../modules/clock.js"
import { AudioButton } from "../modules/audio.js"
import { backlightButton } from "../modules/backlight.js"
import { batteryCircle } from "../modules/battery.js"
import { focusedTitle } from "../modules/focusedWindow.js"
import { sysTray } from "../modules/systray.js"
import { Workspaces } from "../modules/workspaces.js"



function leftWidgets() {
  return Widget.Box(
    {
      spacing: 8,
      children: [
        clock,
        batteryCircle,
        backlightButton,
        AudioButton,
        focusedTitle,
      ]
    })

}

function centerWidgets() {
  return Widget.Box({
      children: [
        Workspaces()
      ]
    })
}

function rightWidgets() {
  return Widget.Box({
    hpack: "end",
    css: 'padding: 1px;',
    child: Widget.CenterBox({
      endWidget: sysTray,
    })
  })
}

export function Bar(monitor = 0) {
  return Widget.Window({
    monitor,
    class_name: "top-bar",
    exclusivity: "exclusive",
    anchor: ["top", "left", "right"],
    child: Widget.CenterBox({
      spacing: 8,
      vertical: false,
      startWidget: leftWidgets(),
      centerWidget: centerWidgets(),
      endWidget: rightWidgets()
    })
  })
}

