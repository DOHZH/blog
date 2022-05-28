from django.urls import path
from . import views

app_name = 'article'

urlpatterns = [
    path('article-list/', views.article_list, name='article_list'),
    path('article-detail/<int:id>/', views.article_detail, name='article_detail'),
    path('article-create/', views.article_create, name='article_create'),
    path('article-delete/<int:id>/', views.article_delete, name='article_delete'),
    path('article-edit/<int:id>/', views.article_edit, name='article_edit'),
    path('earth_json/', views.earth_json, name="earth_json"),
    path('img/shadow.jpg', )
]