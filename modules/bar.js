import { Window } from "resource:///com/github/Aylur/ags/widget.js"
import { Workspaces } from "./workspaces.js" 

const hyprland = await Service.import("hyprland")
const mpris = await Service.import("mpris")
const audio = await Service.import("audio")
const battery = await Service.import("battery")
const systemtray = await Service.import("systemtray")

const date = Variable("", {
  poll: [1000, () => {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    // @ts-ignore
    let formattedDate = currentDate.toLocaleDateString('en-UK', options);
    formattedDate = formattedDate.replace(/\b\w/g, c => c.toUpperCase()); // Met en majuscule la première lettre de chaque mot
    return formattedDate;
  }]
});
// widgets can be only assigned as a child in one container
// so to make a reuseable widget, make it a function
// then you can simply instantiate one by calling it



function ClientTitle() {
  return Widget.Label({
    class_name: "client-title",
    label: hyprland.active.client.bind("class"),
  })
}


function Clock() {
  return Widget.Label({
    class_name: "clock",
    label: date.bind(),
  })
}


function Media() {
  const label = Utils.watch("", mpris, "player-changed", () => {
    if (mpris.players[0]) {
      const { track_artists, track_title } = mpris.players[0]
      return `${track_artists.join(", ")} - ${track_title}`
    } else {
      return "Nothing is playing"
    }
  })

  return Widget.Button({
    class_name: "media",
    on_primary_click: () => mpris.getPlayer("")?.playPause(),
    on_scroll_up: () => mpris.getPlayer("")?.next(),
    on_scroll_down: () => mpris.getPlayer("")?.previous(),
    child: Widget.Label({ label }),
  })
}


function Volume() {
  const icons = {
    101: "overamplified",
    67: "high",
    34: "medium",
    1: "low",
    0: "muted",
  }

  function getIcon() {
    const icon = audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
      threshold => threshold <= audio.speaker.volume * 100)

    return `audio-volume-${icons[icon]}-symbolic`
  }

  const icon = Widget.Icon({
    icon: Utils.watch(getIcon(), audio.speaker, getIcon),
  })

  const slider = Widget.Slider({
    hexpand: true,
    draw_value: false,
    on_change: ({ value }) => audio.speaker.volume = value,
    setup: self => self.hook(audio.speaker, () => {
      self.value = audio.speaker.volume || 0
    }),
  })

  return Widget.Box({
    class_name: "volume",
    css: "min-width: 180px",
    children: [icon, slider],
  })
}


function BatteryLabel() {
  const value = battery.bind("percent").as(p => p > 0 ? p / 100 : 0)
  const arrayIconDischarging = ['󰂃', '󰁺', '󰁻', '󰁼', '󰁽', '󰁾', '󰁿', '󰂀','󰂁','󰂂', '󰁹'];
  const arrayIconCharging = ['󰂃', '󰢜 ', '󰂆 ', '󰂇 ', '󰂈 ', '󰢝 ', '󰂉 ', '󰢞 ','󰂊 ','󰂋 ', '󰂅 '];
  let icon;
  if (battery.charging) {
    icon = battery.bind("percent").as(p => arrayIconDischarging[Math.floor(p/10)])
  }
  else {
    icon = battery.bind("percent").as(p => arrayIconCharging[Math.floor(p/10)])
  }
  return Widget.Box({
    class_name: "battery",
    visible: battery.bind("available"),
    children: [
      Widget.LevelBar({
        widthRequest: 140,
        vpack: "center",
        value,
      }),
    ],
  })
}


function SysTray() {
  const items = systemtray.bind("items")
    .as(items => items.map(item => Widget.Button({
      child: Widget.Icon({ icon: item.bind("icon") }),
      on_primary_click: (_, ev) => {
        try { item.activate(ev) }
        catch (e) { print(e) }
      }, on_secondary_click: (_, event) => item.openMenu(event),
      tooltip_markup: item.bind("tooltip_markup"),
    })))

  return Widget.Box({
    children: items,
  })
}


// layout of the bar
function Left() {
  return Widget.Box({
    spacing: 8,
    children: [
      Workspaces(),
      ClientTitle(),
    ],
  })
}

function Center() {
  return Widget.Box({
    spacing: 8,
    children: [
      Media(),
    ],
  })
}

function Right() {
  return Widget.Box({
    hpack: "end",
    spacing: 8,
    children: [
      Volume(),
      BatteryLabel(),
      Clock(),
      SysTray(),
    ],
  })
}

// @ts-ignore
export const Bar = ({ monitor } = {}) =>
  Window({
    name: `bar${monitor || ''}`, // name has to be unique
    className: 'bar-bg unset',
    monitor: monitor,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
      className: 'bar shadow',
      startWidget: Left(),
      centerWidget: Center(),
      endWidget: Right(),
    }),
  });
