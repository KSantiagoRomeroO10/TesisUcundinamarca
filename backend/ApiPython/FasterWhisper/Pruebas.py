import sounddevice as sd
import soundfile as sf

def audio_callback(indata, frames, time, status):
  """Esta función es llamada para cada bloque de audio."""
  if status:
    print(status)
  # Guardar los datos en el archivo de salida.
  archivo_salida.write(indata.copy())

# Configuración
duracion_bloque = 10  # Duración de cada archivo de audio en segundos
frecuencia_muestreo = 44100  # Frecuencia de muestreo del audio
nombre_archivo = "Audio"  # Nombre base para los archivos de salida
formato_archivo = ".wav"  # Formato del archivo de salida
numero_archivo = 0  # Contador para los archivos de salida

try:
  while True:
    # Crear archivo de salida
    nombre_completo = f"{nombre_archivo}_{numero_archivo}{formato_archivo}"
    archivo_salida = sf.SoundFile(nombre_completo, mode='x', samplerate=frecuencia_muestreo, channels=2)
    with sd.InputStream(callback=audio_callback, samplerate=frecuencia_muestreo, channels=2):
      sd.sleep(duracion_bloque * 1000)  # Grabar durante 'duracion_bloque' segundos
    numero_archivo += 1
finally:
  archivo_salida.close()
