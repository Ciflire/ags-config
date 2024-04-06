import { battery } from "resource:///com/github/Aylur/ags/service/battery.js"; 


export const BatteryLabel = () => Widget.Box({
    class_name: 'battery',
    visible: battery.bind('available'),
    children: [
        Widget.Icon({
            icon: battery.bind('percent').as(p =>
                `battery-level-${Math.floor(p / 10) * 10}-symbolic`,
            ),
        }),
        Widget.ProgressBar({
            vpack: 'center',
            fraction: battery.bind('percent').as(p =>
                p > 0 ? p / 100 : 0,
            ),
        }),
    ],
});
