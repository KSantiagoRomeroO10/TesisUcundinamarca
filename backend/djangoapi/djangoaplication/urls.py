from django.urls import path
from . import views

urlpatterns = [
  path('extraer_palabras/', views.extraer_palabras_importantes, name='extraer_palabras'),
  path('subir_video/', views.subir_video, name='subir_video'),
  path('subir_audio/', views.subir_audio, name='subir_audio'),
]
