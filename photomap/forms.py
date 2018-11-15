from django import forms

class PhotoForm(forms.Form):
    latitude = forms.FloatField()
    longtitude = forms.FloatField()
    direction = forms.IntegerField(required=False)
    image = forms.ImageField()
    date = forms.DateTimeField()