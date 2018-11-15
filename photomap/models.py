from django.db import models
from django.utils import timezone

# Create your models here.
class Photo(models.Model):
    latitude = models.FloatField()
    longtitude = models.FloatField()
    direction = models.IntegerField(default=-1)
    image = models.ImageField(upload_to='uploads/')
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "lat: " + str(self.latitude) + ", lng: " + str(self.longtitude) + ", dir: " + str(self.direction)