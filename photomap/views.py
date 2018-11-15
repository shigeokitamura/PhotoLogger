from django.shortcuts import get_object_or_404, render

# Create your views here.
from django.http import HttpResponse
from django.urls import reverse
from .models import Photo
from .forms import PhotoForm

def index(request):
    context = {
        'title': 'PhotoLogger',
        'photo': Photo.objects.all(),
        'form': PhotoForm(request.POST or None)
    }
    return render(request, 'photomap/index.html', context)

def upload(request):
    context = {
        'title': 'PhotoLogger'
    }
    return render(request, 'photomap/index.html', context)

def detail(request, photo_id):
    return HttpResponse("写真の詳細")