from faster_whisper import WhisperModel

model_size = 'tiny'
# float32, float16, int8
# int8 float16 float32
# large-v3 medium tiny
model = WhisperModel(model_size, device="cpu", compute_type="float32")

# or run on GPU with INT8
# model = WhisperModel(model_size, device="cuda", compute_type="int8_float16")
# or run on CPU with INT8
# model = WhisperModel(model_size, device="cpu", compute_type="int8")

segments, info = model.transcribe("backend/ApiPython/FasterWhisper/Audio.wav", beam_size=5)

print("Detected language '%s' with probability %f" % (info.language, info.language_probability))

for segment in segments:
  print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))