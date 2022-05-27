# Blog

博客框架参考自 https://github.com/stacklens/django_blog_tutorial。

## 来自后端的一些说明
### 关于文件
- `blog/` 是主工作目录，所有工作均在此目录下。
- `env/` 运行环境相关文件。
- 新建 github 项目时创建的 `assets/` 和 `home.html` 均仍保留原样。

#### Windows 系统准备
- 在运行blog的相关内容时，首先打开 `env/Scripts/activate.bat`，将其中 `VIRTUAL_ENV` 属性更改为本机 `env` 文件夹所在绝对路径。
- 在安装 django 后点击执行
  ```
  env/Scripts/activate.bat
  ```
  以进入 django 的虚拟环境。

#### Linux 系统准备
- 安装 Python，通过包管理器（conda 或 pip 都可以）安装 `django` 与 `markdown` 两个软件包即可。

### 关于本地测试
- 在 blog 目录下执行
  ```shell
  python manage.py runserver
  ```
  即可使本地服务器开始工作。
- 在浏览器中访问 **http://127.0.0.1:8000/article/article-list/** 即可进入文章列表页面，即我们暂定的主页。
- 在浏览器中访问 **http://127.0.0.1:8000/admin/** 即可进入后台，通过超级用户登录后可以管理后台数据。
- 超级用户的用户名为 **root** ，密码为 **123456**。

### 关于前端所需工作
前端的同学主要需要修改 `blog/templates/` 下的几个 HTML 文件，其中：
- `base.html` 是基础页面，所有页面都由之派生。
- `header.html` 和 `footer.html` 是头尾的相关内容，由于其需要用于多个场合，因此为了方便代码复用，将其专门提出。
- `article/list.html` 可以作为主页，显示文章列表等。
- `article/detail.html` 是文章详情页面。
- `article/edit.html` 是新建和编辑文章的页面。
这些页面我们已经按照 [django_blog_tutorial](https://github.com/stacklens/django_blog_tutorial) 写了个初步的框架（原文中将新建文章和编辑文章的页面分开，我们为了方便已将其合并），用的是 bootstrap 等样式，前端的同学可以按需修改。有任何问题随时联系。