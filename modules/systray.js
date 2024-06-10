import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js';

/** @param {import('types/service/systemtray').TrayItem} item */
const SysTrayItem = item => Widget.Button({
  css: 'min-height: 25px' ,
  cursor: "pointer",
  child: Widget.Icon().bind('icon', item, 'icon'),
  tooltipMarkup: item.bind('tooltip_markup'),
  onPrimaryClick: (_, event) => item.activate(event),
  onSecondaryClick: (_, event) => item.openMenu(event),
});

export const sysTray = Widget.Box({
  children: SystemTray.bind('items').as(i => i.map(SysTrayItem))
})
