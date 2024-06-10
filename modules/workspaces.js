import  Hyprland  from "resource:///com/github/Aylur/ags/service/hyprland.js";


const dispatch = ws => Hyprland.messageAsync(`dispatch workspace ${ws}`);

const workspacesIcons = [" ", "󰈹 ", "󰨞 ", " ", " ", "󰙯 ", " "]

export const Workspaces = () => Widget.EventBox({
    onScrollUp: () => dispatch('+1'),
    onScrollDown: () => dispatch('-1'),
    child: Widget.Box({
        children: Array.from({ length: 7 }, (_, i) => i + 1).map(i => Widget.Button({
            attribute: i,
            onClicked: () => dispatch(i),
            child: Widget.Label(workspacesIcons[i-1])
        })),

    }),
})
