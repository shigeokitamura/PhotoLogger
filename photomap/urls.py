from django.urls import path

from . import views

app_name = 'photomap'
urlpatterns = [
    path('', views.index, name='index'),
]
