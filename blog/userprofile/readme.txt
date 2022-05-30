1.实现了用户登录和登出、注册、及删除功能。重置用户密码需配置发邮件的邮箱，所以并没有做
对用户编辑文章进行了限制

记得数据迁移，修改了不少model

2.管理员账号：GM 密码：1234
如果还需要删除旧数据：
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.all().delete()

然后文章就删掉了（之前是和id=1的用户关联）

>>>exit()
python manage.py createsuperuser

重新创建管理员账号，用户请随便注册一个公用的（不用填email也可）

3.增加浏览量、热度、搜索
4.增加标签，需要安装django-taggit，多个标签最好用英文逗号进行分隔。中文逗号有的版本会报错，干脆就不要去使用了