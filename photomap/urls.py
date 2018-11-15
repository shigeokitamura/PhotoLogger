from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

app_name = 'photomap'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:photo_id>/detail/', views.detail, name='detail'),
    path('upload/', views.upload, name='upload'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

