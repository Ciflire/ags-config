import Battery from "resource:///com/github/Aylur/ags/service/battery.js" ;

export const batteryCircle = Widget.CircularProgress({
    css: 'min-width: 25px;'  // its size is min(min-height, min-width)
        + 'min-height: 25px;'
        + 'font-size: 2px;' // to set its thickness set font-size on it
        + 'margin: 0px;' // you can set margin on it
        + 'background-color: #131313;' // set its bg color
        + 'color: aqua;', // set its fg color
    rounded: false,
    inverted: false,
    startAt: 0.75,
    value: Battery.bind('percent').as(p => p / 100),
    child: Widget.Icon({
        size: 10,
        icon: Battery.bind("icon_name"),
    }),
})
