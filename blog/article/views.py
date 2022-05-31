import imp
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import ArticlePost
from .forms import ArticlePostForm
import markdown
import json
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db.models import Q
from comment.models import Comment


def article_list(request):

    search = request.GET.get('search')
    order = request.GET.get('order')
    tag = request.GET.get('tag')

    article_list = ArticlePost.objects.all()

    if search:
        article_list = ArticlePost.objects.filter(
            Q(title__icontains=search) | Q(body__icontains=search))
    else:
        search = ''

    if tag and tag != 'None':
        article_list = article_list.filter(tags__name__in=[tag])

    if order == 'total_views':
        article_list = ArticlePost.objects.all().order_by('-total_views')

    # 每页显示 6 篇文章
    paginator = Paginator(article_list, 6)
    # 获取 url 中的页码
    page = request.GET.get('page')
    # 将导航对象相应的页码内容返回给 articles
    articles = paginator.get_page(page)

    context = {
        'articles': articles,
        'order': order,
        'search': search,
        'tag': tag
    }
    return render(request, 'article/list.html', context)


def article_view_counter(request, id):
    article = ArticlePost.objects.get(id=id)
    # only count when others view
    if request.user.id != article.author:
        article.total_views += 1
        article.save(update_fields=['total_views'])


def article_detail(request, id):
    article_view_counter(request, id)
    article = ArticlePost.objects.get(id=id)
    comments = Comment.objects.filter(article=id)
    md = markdown.Markdown(extensions=[
        'markdown.extensions.extra',
        'markdown.extensions.codehilite',
        'markdown.extensions.toc',
    ])
    article.body = md.convert(article.body)

    context = {'article': article, 'toc': md.toc, 'comments': comments}
    return render(request, 'article/detail.html', context)


@login_required(login_url='/userprofile/login/')
def article_create(request):
    if request.method == "POST":
        article_post_form = ArticlePostForm(data=request.POST)
        if article_post_form.is_valid():
            new_article = article_post_form.save(commit=False)
            new_article.author = User.objects.get(id=request.user.id)
            new_article.save()

            article_post_form.save_m2m()

            return redirect("article:article_list")
        else:
            return HttpResponse("Form error, please refill.")
    else:
        article_post_form = ArticlePostForm()
        context = {'action': 'create', 'article_post_form': article_post_form}
        return render(request, 'article/edit.html', context)


@login_required(login_url='/userprofile/login/')
def article_delete(request, id):
    if request.method == 'POST':
        article = ArticlePost.objects.get(id=id)
        if request.user.id == article.author:
            article.delete()
            return redirect("article:article_list")
        else:
            return HttpResponse("Permission denied")
    else:
        return HttpResponse("Only POST request allowed.")


@login_required(login_url='/userprofile/login/')
def article_edit(request, id):
    article = ArticlePost.objects.get(id=id)
    if request.user.id != article.author:
        return HttpResponse("Permission denied")
    else:
        if request.method == "POST":
            article_post_form = ArticlePostForm(data=request.POST)
            if article_post_form.is_valid():
                article.title = request.POST['title']
                article.body = request.POST['body']
                article.save()
                return redirect("article:article_detail", id=id)
            else:
                return HttpResponse("Form error, please refill.")
        else:
            article_post_form = ArticlePostForm()
            context = {
                'action': 'edit',
                'article': article,
                'article_post_form': article_post_form
            }
            return render(request, 'article/edit.html', context)
