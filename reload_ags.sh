inotifywait \
  --monitor \
  --recursive \
  --event close_write \
  --exclude ".*css" \
  ~/.config/ags | while read; do
  ags -q && ags &
done
