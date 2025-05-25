from django.urls import path , include
from .views import ArticleViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'articles' , ArticleViewSet , basename='article')

urlpatterns = [
    # path('getapi/' , get_api),
    # path('postapi/' , post_api),
    # path('deleteapi/<int:pk>/' , delete_api),
    path('' , include(router.urls)),
]

