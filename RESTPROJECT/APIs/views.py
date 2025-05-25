# from django.shortcuts import render
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer
# Create your views here.

# @api_view(["GET"])
# def get_api(request):
#     article = Article.objects.all()
#     serializer = ArticleSerializer(article , many=True)
#     return Response(serializer.data)

# @api_view(["POST"])
# def post_api(request):
#     serializer = ArticleSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data , status=201)
#     return Response(serializer.errors , status=400)

# @api_view(["DELETE"])
# def delete_api(request , pk):
#     try:
#         article = Article.objects.get(pk=pk)
#     except Article.DoesNotExist:
#         return Response(status=404)
    
#     article.delete()
#     return Response(status=204)

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer