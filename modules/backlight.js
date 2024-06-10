import brightness from "../service/brightness.js";

function brightnessPercentage(number) {
  return Math.round(number * 100)
}

export const backlightCircle = 
  Widget.CircularProgress({
    css: 'min-width: 25px;'  // its size is min(min-height, min-width)
        + 'min-height: 25px;'
        + 'font-size: 2px;' // to set its thickness set font-size on it
        + 'margin: 0px;' // you can set margin on it
        + 'background-color: #131313;' // set its bg color
        + 'color: aqua;', // set its fg color
    value: brightness.bind('screen_value'),
    tooltip_text: brightness.bind('screen_value').as(v => `${brightnessPercentage(v)}%`),
    rounded: true,
    startAt: 0.75,
    child: Widget.Icon({
      size: 10,
      icon: 'brightness-symbolic',
    })
  })

export const backlightButton = Widget.Button({
  css: 'background: none; margin: 0px;  padding: 0;',
  cursor: "pointer",
  on_scroll_up: () => Utils.exec('brightnessctl set +5%'),
  on_scroll_down: () => Utils.exec('brightnessctl set 5%-'),
  child: backlightCircle
})

