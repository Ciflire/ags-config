import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js"

export const focusedTitle = Widget.Label({
    label: Hyprland.active.client.bind('class'),
    visible: Hyprland.active.client.bind('address')
        .as(addr => !!addr),
})

