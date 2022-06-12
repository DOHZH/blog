from django.db import models
from django.contrib.auth.models import User
from article.models import ArticlePost
from ckeditor.fields import RichTextField


# comments
class Comment(models.Model):
    article = models.ForeignKey(ArticlePost,
                                on_delete=models.CASCADE,
                                related_name='comments')
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE,
                             related_name='comments')
    body = RichTextField() 
    parent = TreeForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children'
    )
    reply_to = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name='replyers'
    )
    created = models.DateTimeField(auto_now_add=True)

     class MPTTMeta:
        order_insertion_by = ['created']

    def __str__(self):
        return self.body[:20]
