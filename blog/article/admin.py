from django.contrib import admin
from .models import ArticlePost

admin.site.register(ArticlePost)
admin.AdminSite.site_url="/article/article-list/"
