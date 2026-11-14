#!/bin/sh
# Key (chromakey) klip Cut-NN ke scratch keyedNN bila ruang cakera > 6GB.  sh keyjob.sh 03 04 ...
cd /home/user/randomvideo; S=/tmp/claude-0/-home-user-randomvideo/40cb5a6b-871a-54ac-aedd-2f85610bae62/scratchpad
for N in "$@"; do
  [ -d $S/keyed$N ] && [ $(ls $S/keyed$N | wc -l) -gt 1000 ] && continue
  while [ $(df --output=avail -BG /tmp | tail -1 | tr -dc 0-9) -lt 6 ]; do sleep 60; done
  python3 -I explainer/tools/key_frames.py $S/cuts/cut$N.mp4 $S/keyed$N 370 >> /tmp/key.log 2>&1
  ln -sfn $S/keyed$N video-cut$N-pg/keyed
  echo "keyed $N" >> /tmp/key.log
done
