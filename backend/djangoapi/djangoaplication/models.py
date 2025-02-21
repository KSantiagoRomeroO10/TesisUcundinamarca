from django.db import models

# Create your models here.

class Video(models.Model):
  
  idVideo = models.AutoField(primary_key=True)
  videoBlob = models.BinaryField()
  fileHash = models.CharField(max_length=64, unique=True)
  createdAt = models.DateTimeField(auto_now_add=True)
  updatedAt = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"Video {self.idVideo}"
  
  class Meta:
    managed = False 
    db_table = 'videos'

class Audio(models.Model):
  
  idAudio = models.AutoField(primary_key=True)
  audioBlob = models.BinaryField()
  fileHash = models.CharField(max_length=64, unique=True)
  createdAt = models.DateTimeField(auto_now_add=True)
  updatedAt = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"Audio {self.idAudio}"
  
  class Meta:
    managed = False 
    db_table = 'audios'