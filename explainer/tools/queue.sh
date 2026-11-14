#!/bin/sh
# Giliran render: untuk setiap video siap (fail READY) -> render -> thumbnail terbenam -> commit+push MP4 -> buang keyed/out.
# sh queue.sh 02 03 04 ...
cd /home/user/randomvideo
S=/tmp/claude-0/-home-user-randomvideo/40cb5a6b-871a-54ac-aedd-2f85610bae62/scratchpad
for N in "$@"; do
  D=video-cut$N-pg; V=$D/video-cut$N-pg.mp4
  until [ -f $D/READY ]; do sleep 20; done
  ln -sf $S/cuts/cut$N.mp4 $D/audio.mp4
  while pgrep -f "render.js $D" > /dev/null; do sleep 20; done
  if [ ! -f $V ]; then
    until [ -d $D/keyed ] && [ $(ls $D/keyed/ | wc -l) -gt 100 ]; do sleep 20; done
    WORKERS=3 node explainer/render.js $D > /tmp/r$N.log 2>&1 || { echo "RENDER GAGAL $N" >> /tmp/queue.log; continue; }
  fi
  if [ ! -f $D/.embedded ]; then sh skills/video-explainer-3d/scripts/embed_thumb.sh $V $D/thumb/thumbnail.jpg >> /tmp/queue.log 2>&1 && touch $D/.embedded; fi
  SZ=$(stat -c%s $V); if [ $SZ -gt 98000000 ]; then ffmpeg -v error -y -i $V -c:v libx264 -crf 22 -preset medium -c:a copy -movflags +faststart $V.tmp.mp4 && mv $V.tmp.mp4 $V; fi
  rm -rf $D/out $D/stills
  flock /tmp/git.lock sh -c "git add -f $V && git add -A $D explainer && git commit -qm 'Cut-$N explainer video + thumbnail' && git push -q origin claude/adoring-hypatia-6f8aon" >> /tmp/queue.log 2>&1
  echo "SIAP $N $(stat -c%s $V) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $V)" >> /tmp/queue.log
  rm -rf $(readlink -f $D/keyed)
done
echo QUEUE_DONE >> /tmp/queue.log
