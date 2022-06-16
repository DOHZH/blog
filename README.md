# Blog

博客框架参考自 [django_blog_tutorial](https://github.com/stacklens/django_blog_tutorial)。

## 来自后端的一些说明
### 关于文件
- `blog/` 是主工作目录，所有工作均在此目录下。
- `env/` 运行环境相关文件。
- 新建 GitHub 项目时创建的 `assets/` 和 `home.html` 均仍保留原样。

#### Windows 系统准备
- 在运行blog的相关内容时，首先打开 `env/Scripts/activate.bat`，将其中 `VIRTUAL_ENV` 属性更改为本机 `env` 文件夹所在绝对路径。
- 在安装 django 后点击执行
  ```
  env/Scripts/activate.bat
  ```
  以进入 django 的虚拟环境。

#### Linux 系统准备
- 安装 Python，通过包管理器安装以下软件包即可：（以 `pip` 为例）
  ```
  pip install django django-taggit django_ckeditor django_mptt Pillow markdown
  ```

### 关于本地测试
- 在 `blog/` 目录下执行：（`/tmp` 可以换成别的路径）
  ```shell
  python -X pycache_prefix=/tmp manage.py runserver
  ```
  即可使本地服务器开始工作。
- 在浏览器中访问 **http://127.0.0.1:8000/article/article-list/** 即可进入文章列表页面，即我们暂定的主页。
- 在浏览器中访问 **http://127.0.0.1:8000/admin/** 即可进入后台，通过超级用户登录后可以管理后台数据。
- 超级用户的用户名为 **`root`** ，密码为 **`123456`**。

### 关于前端所需工作
前端的同学主要需要修改 `blog/templates/` 下的几个 HTML 文件，其中：
- `base.html` 是基础页面，所有页面都由之派生。
- `header.html` 和 `footer.html` 是头尾的相关内容，由于其需要用于多个场合，因此为了方便代码复用，将其专门提出。
- `article/list.html` 可以作为主页，显示文章列表等。
- `article/detail.html` 是文章详情页面。
- `article/edit.html` 是新建和编辑文章的页面。
- `userprofile/login.html` 是用户的登陆界面。
- `userprofile/register.html` 是用户的注册界面。
- `userprofile/edit.html` 是用户编辑个人信息的界面。 
- 此外，前端同学在工作时，为了方面管理和后续工作，请尽量将 css 文件和 js 文件分离集中存放，例如将 css 放到 `static` 下的 `style` 文件夹等。  
这些页面我们已经按照 [django_blog_tutorial](https://github.com/stacklens/django_blog_tutorial) 写了个初步的框架（原文中将新建文章和编辑文章的页面分开，我们为了方便已将其合并），用的是 bootstrap 等样式，前端的同学可以按需修改。有任何问题随时联系。

### 关于用户管理

1. 实现了用户登录和登出、注册、及删除功能。重置用户密码需配置发邮件的邮箱，所以并没有做。对用户编辑文章进行了限制。

2. 管理员账号：user 密码：123456

    如果还需要删除旧数据：
    ```python
    python -X pycache_prefix=/tmp manage.py shell
    >>> from django.contrib.auth.models import User
    >>> User.objects.all().delete()  # 然后文章和用户就被删掉了（之前是和id=1的用户关联）
    >>> exit()
    ```

3. 重新创建管理员账号，用户请随便注册一个公用的（不用填email也可）
    ```shell
    python -X pycache_prefix=/tmp manage.py createsuperuser
    ```

4. 增加浏览量、热度、搜索
5. 增加标签，需要安装 `django-taggit`，多个标签最好用英文逗号进行分隔。中文逗号有的版本会报错，干脆就不要去使用了