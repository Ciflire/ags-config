import  Mpris  from "resource:///com/github/Aylur/ags/service/mpris.js"

export function Media() {
    const label = Utils.watch("", Mpris, "player-changed", () => {
        if (Mpris.players[0]) {
            const { track_artists, track_title } = Mpris.players[0]
            return `${track_artists.join(", ")} - ${track_title}`
        } else {
            return "Nothing is playing"
        }
    })

    return Widget.Button({
        class_name: "media",
        on_primary_click: () => App.ToggleWindow('mpris'),
        on_scroll_up: () => Mpris.getPlayer("")?.next(),
        on_scroll_down: () => Mpris.getPlayer("")?.previous(),
        child: Widget.Label({ label }),
    })
}
