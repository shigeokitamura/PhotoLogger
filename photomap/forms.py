from django import forms

class PhotoForm(forms.Form):
    latitude = forms.FloatField()
    longitude = forms.FloatField()
    direction = forms.IntegerField(max_value=360)
    photoby = forms.CharField()
    image = forms.ImageField()