#!/bin/sh
# Now send blocks with information forever:
echo '{ "version": 1, "click_events": true,  }'
echo '['

(while :
do
	status+='['

	#volume
	vol=$(pactl get-sink-volume \@DEFAULT_SINK@ | grep -Eo '[0-9]{1,2}%' | tail -1)
	mute=$(pactl get-sink-mute \@DEFAULT_SINK@)
	if [[ "$mute" =~ "yes" ]]; then
		status+='{"name":"battey","full_text":" '$vol'"},'
	elif [[ "$mute" =~ "no" ]]; then
		status+='{"name":"battey","full_text":" '$vol'"},'
	fi
	# battey
	bat=$(find /sys/class/power_supply -name "BAT*")
	capacity=$(< "$bat/capacity")
	bat_status=$(< "$bat/status")
	if (($capacity <= 20)) && [ "$bat_status" == "Discharging" ]; then urgent=true; else urgent=false; fi
	status+='{"name":"battey","full_text":"\udb80\udc7f '$capacity'% ['$bat_status']","short_text":"'$capacity'%","urgent":'$urgent'},'
	# time
	# status+=$(date +'%a %b %d %H:%M')
	status+='{"name":"time","full_text":"'$(date +'%a %b %d %H:%M')'","short_text":"'$(date +'%H:%M')'"},'

	status+='],'
	echo $status
	status=''
	sleep 1
done) &

# Listening for STDIN events
while read line;
do
	if [[ $line == *"name"*"time"* ]]; then
		kitty oc.sh cal
	fi  
done
