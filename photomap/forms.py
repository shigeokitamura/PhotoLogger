from django import forms

class PhotoForm(forms.Form):
    latitude = forms.FloatField()
    longitude = forms.FloatField()
    direction = forms.IntegerField(required=False, max_value=360)
    image = forms.ImageField()