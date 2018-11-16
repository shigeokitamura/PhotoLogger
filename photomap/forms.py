from django import forms

class PhotoForm(forms.Form):
    latitude = forms.FloatField()
    longtitude = forms.FloatField()
    direction = forms.IntegerField(required=False, min_value=0, max_value=360)
    image = forms.ImageField()