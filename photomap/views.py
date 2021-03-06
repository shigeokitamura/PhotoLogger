from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.core import serializers
from django.contrib.auth.decorators import login_required

# Create your views here.
from .models import Photo
from .forms import PhotoForm

@login_required
def camera(request):
    context = {
        'title': 'PhotoLogger - Camera',
        'photo': Photo.objects.all(),
        'form': PhotoForm(),
    }
    return render(request, 'photomap/index.html', context)

@login_required
def upload(request):
    if request.method == 'GET':
        return redirect('photomap:index')
    elif request.method == 'POST':
        form = PhotoForm(request.POST, request.FILES)
        if not form.is_valid():
            return HttpResponse(form.errors)
        
        photo = Photo()
        photo.latitude = form.cleaned_data['latitude']
        photo.longitude = form.cleaned_data['longitude']
        if form.cleaned_data['direction']:
            photo.direction = form.cleaned_data['direction']
        photo.image = form.cleaned_data['image']
        photo.photoby = form.cleaned_data['photoby']
        photo.save()

        return HttpResponse("Success")

@login_required
def map(request):
    context = {
        'title': 'PhotoLogger - Map',
        'photo': Photo.objects.all(),
        'form': PhotoForm(),
    }
    return render(request, 'photomap/map.html', context)

def detail(request, photo_id):
    return HttpResponse("写真の詳細")

def photos(request):
    data = Photo.objects.all()
    json_data = serializers.serialize('json', data)
    return HttpResponse(json_data)
