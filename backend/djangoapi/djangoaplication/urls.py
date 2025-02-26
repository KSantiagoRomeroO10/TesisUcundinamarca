from django.urls import path
from . import views

urlpatterns = [
  path('extraer_palabras/', views.extraer_palabras_importantes, name='extraer_palabras'),
  path('subir_video/', views.subir_video, name='subir_video'),
  path('video/actualizar/<int:idVideo>/', views.actualizar_video, name='actualizar_video'),
  path('subir_audio/', views.subir_audio, name='subir_audio'),
  path('audio/actualizar/<int:idAudio>/', views.actualizar_audio, name='actualizar_audio')
]
