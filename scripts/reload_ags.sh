inotifywait \
  --monitor \
  --recursive \
  --event close_write \
  ~/.config/ags | while read; do
  ags -q && ags &
done
