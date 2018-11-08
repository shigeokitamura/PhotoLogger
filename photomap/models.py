from django.db import models

# Create your models here.
class Photo(models.Model):
    longtitude = models.FloatField()
    latitude = models.FloatField()
    direction = models.IntegerField()
    image = models.ImageField(upload_to='uploads/')
    date = models.DateTimeField('date uploaded')