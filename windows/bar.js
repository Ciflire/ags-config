import { clock } from "../modules/clock.js"
import { AudioButton, AudioCircle } from "../modules/audio.js"
import { backlightButton } from "../modules/backlight.js"
import { batteryCircle } from "../modules/battery.js"
import { focusedTitle } from "../modules/focusedWindow.js"
import { sysTray } from "../modules/systray.js"
import { Workspaces } from "../modules/workspaces.js"
import { Media } from "../modules/media.js"


function leftWidgets() {
  return Widget.Box(
    {
      spacing: 8,
      class_name: 'top-bar-left-widgets',
      children: [
        Workspaces(),
        focusedTitle
      ]
    })

}

function centerWidgets() {
  return Widget.Box({
    class_name: 'top-bar-center-widgets',
    children: [
      clock
    ]
  })
}

function rightWidgets() {
  return Widget.Box({
    hpack: "end",
    class_name: 'top-bar-right-widgets',
    child: Widget.CenterBox({
      endWidget: Widget.Box({
        spacing: 50,
        children: [
          Widget.Box({
            spacing: 8,
            class_name: "sys-status",
            children : [batteryCircle,
              AudioButton,
              backlightButton,
            ]
          }),
          Widget.Box({
            children: [
              Media()
            ]
          }),
          sysTray,
        ]
      }),
    })
  })
}

export function Bar(monitor = 0) {
  return Widget.Window({
    monitor,
    margins: [5, 7],
    class_name: "top-bar",
    exclusivity: "exclusive",
    anchor: ["top", "left", "right"],
    child: Widget.CenterBox({
      spacing: 8,
      vertical: false,
      class_name: "test",
      startWidget: leftWidgets(),
      centerWidget: centerWidgets(),
      endWidget: rightWidgets()
    })
  })
}

