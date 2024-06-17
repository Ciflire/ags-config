import Battery from "resource:///com/github/Aylur/ags/service/battery.js" ;

export const batteryCircle = Widget.CircularProgress({
    class_name: "circular-battery-widget",
    rounded: false,
    tooltip_text: Battery.bind('percent').as( p => `Battery: ${p}%`),
    inverted: false,
    startAt: 0.75,
    value: Battery.bind('percent').as(p => p / 100),
    child: Widget.Icon({
        size: 10,
        icon: Battery.bind("icon_name"),
    }),
})
