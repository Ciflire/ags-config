import Audio from "resource:///com/github/Aylur/ags/service/audio.js"

/** @param {'speaker' | 'microphone'} type */
export const AudioCircle = (type = 'speaker') =>
  Widget.CircularProgress({
    css: 'min-width: 25px;'  // its size is min(min-height, min-width)
      + 'min-height: 25px;'
      + 'font-size: 2px;' // to set its thickness set font-size on it
      + 'margin: 0px;' // you can set margin on it
      + 'background-color: #131313;' // set its bg color
      + 'color: aqua;', // set its fg color
    value: Audio[type].bind('volume'),
    tooltip_text: Audio[type].bind('volume').as(v => `${v}%`),
    rounded: true,
    startAt: 0.75,
    child: Widget.Icon().hook(Audio.speaker, self => {
      const vol = Audio.speaker.volume * 100;
      const icon = [
        [101, 'audio-volume-overamplified-symbolic'],
        [67, 'volume-level-high'],
        [34, 'volume-level-medium'],
        [1, 'volume-level-low'],
        [0, 'volume-level-muted'],
        // @ts-ignore
      ].find(([threshold]) => threshold <= vol)?.[1];

      self.icon = `${icon}`;
      self.tooltip_text = `Volume ${Math.floor(vol)}%`;
      self.size = 10;

    })
  })

export const AudioButton = Widget.Button({
  css: 'background: none; margin: 0px;  padding: 0;',
  cursor: "pointer",
  on_clicked: () => Audio.speaker.is_muted = !Audio.speaker.is_muted ,
  on_scroll_up: () => Utils.exec('wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 5%+'),
  on_scroll_down: () => Utils.exec('wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-'),
  child: AudioCircle('speaker')
})


