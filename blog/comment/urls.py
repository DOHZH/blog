from django.urls import path
from . import views

app_name = 'comment'

urlpatterns = [
    # make comments
    path('post-comment/<int:article_id>/',
         views.post_comment,
         name='post_comment'),
]