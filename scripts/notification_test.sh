#!/bin/sh

notify-send "message" "more message" -i "./discord.jpg" -t 1000 -u low;
sleep 0.1;
notify-send "message" "more message" -i "./discord.jpg" -t 1000 -u normal;
sleep 0.1;
notify-send "message" "more message" -i "./discord.jpg" -t 1000 -u critical;
sleep 0.1;
notify-send --action 'acion1=Focus Window' --action "action2=Focus Window" --action 'action3=Focus Window' test -t 1000 -i dialog-information-symbolic;
echo "all done";
exit 0
