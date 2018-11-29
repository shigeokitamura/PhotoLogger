from django.db import models
from django.utils import timezone

# Create your models here.
class Photo(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    direction = models.IntegerField(default=-1)
    photoby = models.CharField(default='null', max_length=150)
    image = models.ImageField(upload_to='uploads/')
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "lat: " + str(self.latitude) + ", lng: " + str(self.longitude) + ", dir: " + str(self.direction)