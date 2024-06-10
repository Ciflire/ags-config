

export const clock = Widget.Label().poll(1000, label => label.label = Utils.exec('date "+%H:%M:%S"'))

