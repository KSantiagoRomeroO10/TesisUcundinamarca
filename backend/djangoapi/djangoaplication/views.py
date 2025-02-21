from django.shortcuts import render

from .models import Video, Audio

from django.http import JsonResponse  # Importa JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import spacy
import hashlib

nlp = spacy.load('es_core_news_lg')

@csrf_exempt
def extraer_palabras_importantes(request):
  if request.method == 'POST':
    try:
      data = json.loads(request.body)
      texto = data.get('texto', '')
      if not texto:
        return JsonResponse({'error': 'No se proporcionó el campo "texto".', 'Entrega': False}, status=400)
      
      doc = nlp(texto)
      palabras_importantes = []
      palabras_originales = []

      for token in doc:
        if not token.is_punct and token.pos_ in ['VERB', 'NOUN', 'PROPN', 'ADJ', 'ADV', 'NUM']:
          palabras_importantes.append(token.lemma_.lower())
          palabras_originales.append(token.text.lower())

      return JsonResponse({
        'palabras_importantes': palabras_importantes,
        'palabras_originales': palabras_originales, 
        'Entrega': True
      }, status=200)
    except json.JSONDecodeError:
      return JsonResponse({'error': 'El cuerpo de la solicitud no es un JSON válido.'}, status=400)
  else:
    return JsonResponse({'error': 'Método no permitido. Use POST.', 'Entrega': False}, status=405)

# Lista de tipos MIME permitidos para video y audio
ALLOWED_VIDEO_MIME_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska']
ALLOWED_AUDIO_MIME_TYPES = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/x-wav']

@csrf_exempt
def subir_video(request):
  if request.method == 'POST':
    try:
      # Obtener el archivo de video desde la solicitud
      video_file = request.FILES.get('video_file')
      if not video_file:
        return JsonResponse({'error': 'No se proporcionó un archivo de video.', 'Entrega': False}, status=400)

      # Validar que el archivo sea un video
      if video_file.content_type not in ALLOWED_VIDEO_MIME_TYPES:
        return JsonResponse({'error': 'El archivo no es un video válido.', 'Entrega': False}, status=400)

      # Leer el contenido del archivo
      video_blob = video_file.read()

      # Calcular el hash del contenido del archivo
      file_hash = hashlib.sha256(video_blob).hexdigest()

      # Verificar si ya existe un video con el mismo hash
      if Video.objects.filter(fileHash=file_hash).exists():
        return JsonResponse({'error': 'El video ya existe en la base de datos.', 'Entrega': False}, status=400)

      # Guardar el video en la base de datos
      video = Video(videoBlob=video_blob, fileHash=file_hash)
      video.save()

      return JsonResponse({'mensaje': 'Video subido correctamente.', 'idVideo': video.idVideo, 'Entrega': True}, status=201)
    except Exception as e:
      return JsonResponse({'error': str(e), 'Entrega': False}, status=500)
  else:
    return JsonResponse({'error': 'Método no permitido. Use POST.', 'Entrega': False}, status=405)

@csrf_exempt
def subir_audio(request):
  if request.method == 'POST':
    try:
      # Obtener el archivo de audio desde la solicitud
      audio_file = request.FILES.get('audio_file')
      if not audio_file:
        return JsonResponse({'error': 'No se proporcionó un archivo de audio.', 'Entrega': False}, status=400)

      # Validar que el archivo sea un audio
      if audio_file.content_type not in ALLOWED_AUDIO_MIME_TYPES:
        return JsonResponse({'error': 'El archivo no es un audio válido.', 'Entrega': False}, status=400)

      # Leer el contenido del archivo
      audio_blob = audio_file.read()

      # Calcular el hash del contenido del archivo
      file_hash = hashlib.sha256(audio_blob).hexdigest()

      # Verificar si ya existe un audio con el mismo hash
      if Audio.objects.filter(fileHash=file_hash).exists():
        return JsonResponse({'error': 'El audio ya existe en la base de datos.', 'Entrega': False}, status=400)

      # Guardar el audio en la base de datos
      audio = Audio(audioBlob=audio_blob, fileHash=file_hash)
      audio.save()

      return JsonResponse({'mensaje': 'Audio subido correctamente.', 'idAudio': audio.idAudio, 'Entrega': True}, status=201)
    except Exception as e:
      return JsonResponse({'error': str(e), 'Entrega': False}, status=500)
  else:
    return JsonResponse({'error': 'Método no permitido. Use POST.', 'Entrega': False}, status=405)