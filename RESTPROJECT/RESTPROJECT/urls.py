"""
URL configuration for RESTPROJECT project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path , include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,     # login
    TokenRefreshView         # refresh
)
urlpatterns = [
    path("admin/", admin.site.urls),
    path('apis/' , include('APIs.urls')),
    path('authy/', include('authy.urls')),  # your app endpoints
    path('authy/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('authy/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # refresh
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
