from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def index(request):
    context = {
        'title': 'PhotoLogger'
    }
    return render(request, 'photomap/index.html', context)