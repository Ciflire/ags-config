import brightness from "../service/brightness.js";

function brightnessPercentage(number) {
  return Math.round(number * 100)
}

export const backlightCircle = 
  Widget.CircularProgress({
    class_name: "circular-backlight-widget",
    value: brightness.bind('screen_value'),
    tooltip_text: brightness.bind('screen_value').as(v => `Brightness: ${brightnessPercentage(v)}%`),
    rounded: true,
    startAt: 0.75,
    child: Widget.Icon({
      size: 10,
      icon: 'brightness-symbolic',
    })
  })

export const backlightButton = Widget.Button({
  cursor: "pointer",
  on_scroll_up: () => Utils.exec('brightnessctl set +5%'),
  on_scroll_down: () => Utils.exec('brightnessctl set 5%-'),
  child: backlightCircle
})

