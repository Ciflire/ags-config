import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";


const dispatch = (/** @type {string | number} */ ws) => Hyprland.messageAsync(`dispatch workspace ${ws}`);

const workspacesIcons = ["  ", " 󰈹 ", " 󰨞 ", "  ", "  ", " 󰙯 ", "  "]

export const Workspaces = () => Widget.EventBox({
  onScrollUp: () => dispatch('-1'),
  onScrollDown: () => dispatch('+1'),
  class_name: 'ws-box',
  child: Widget.Box({
    children: Array.from({ length: 7 }, (_, i) => i + 1).map(i => Widget.Button({
      class_name: "ws-button",
      attribute: i,
      // Keeps button from expanding to fit its container
      onClicked: () => dispatch(i),
      child: Widget.Box({
        class_name: "ws-indicator",
        // vpack: "start",
        vpack: "center",
        hpack: "center",
        children: [
          Widget.Label({
            label: workspacesIcons[i - 1],
            justification: "center",
          })
        ],
      }),
      setup: self => self.hook(Hyprland, () => {
        // The "?" is used here to return "undefined" if the workspace doesn't exist
        self.toggleClassName('ws-inactive', (Hyprland.getWorkspace(i)?.windows || 0) === 0);
        self.toggleClassName('ws-occupied', (Hyprland.getWorkspace(i)?.windows || 0) > 0);
        self.toggleClassName('ws-active', Hyprland.active.workspace.id === i);
        self.toggleClassName('ws-large', (Hyprland.getWorkspace(i)?.windows || 0) > 1);
      }),

    })),
  }),
});
