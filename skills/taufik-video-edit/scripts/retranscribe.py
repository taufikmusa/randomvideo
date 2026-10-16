# Transkrip semula julat sempit: python3 -I retranscribe.py <voice.wav> <folder-model> 4.5-10 20-25 ...  (cetak versi bahasa ms & id untuk dibanding)
import sys, wave, numpy as np, subprocess, sherpa_onnx
wav=sys.argv[1]; d=sys.argv[2]+'/'; rngs=[tuple(map(float,a.split('-'))) for a in sys.argv[3:]]
subprocess.run(['ffmpeg','-v','error','-y','-i',wav,'-ac','1','-ar','16000','/tmp/_r.wav'],check=True)
w=wave.open('/tmp/_r.wav'); sr=16000; x=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768
for lang in ['ms','id']:
    r=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=d+'small-encoder.int8.onnx',decoder=d+'small-decoder.int8.onnx',tokens=d+'small-tokens.txt',language=lang,task='transcribe',num_threads=4)
    for a,b in rngs:
        s=r.create_stream(); s.accept_waveform(sr,x[int(a*sr):int(b*sr)]); r.decode_stream(s); print(lang,a,b,s.result.text.strip())
