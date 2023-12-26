from django.urls import path, re_path

from UserApp import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('user', views.userAPI),
    re_path(r'^user/([0-9]+)$', views.userAPI),
    re_path(r'^user/SaveSign/$', views.SaveSign),
    re_path(r'^user/login/$', views.login),
    path('verify_token/', views.verify_token),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
