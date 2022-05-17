# Blog
## 来自后端的一些说明
### 关于文件
- blog/ 是主工作目录，所有工作均在此目录下。
- env/ 运行环境相关文件。在运行blog的相关内容时，首先执行命令
  ```shell
  env/Scripts/activate.bat
  ```
  以进入django的虚拟环境。
- 新建github项目时创建的assets/和home.html均仍保留原样。

### 关于前端所需工作
前端的同学主要需要修改blog/templates/下的几个html文件，其中：
- base.html 是基础页面，所有页面都由之派生。
- header.html & footer.html 是头尾的相关内容，由于其需要用于多个场合，因此为了方便代码复用，将其专门提出。
- article/list.html 可以作为主页，显示文章列表等。
- article/detail.html 是文章详情页面。
- article/edit.html 是新建&编辑文章的页面.
这些页面我们已经按照www.dusaiphoto.com的Django教程写了个初步的框架（原文中将新建文章和编辑文章的页面分开，我们为了方便已将其合并），用的是bootstrap等样式，前端的同学可以按需修改。有任何问题随时联系。

### 关于本地测试
- 在blog目录下执行
  ```shell
  python manage.py runserver
  ```
  即可使本地服务器开始工作。
- 在浏览器中访问**http://127.0.0.1:8000/article/article-list/**
  即可进入文章列表页面，即我们暂定的主页。
- 在浏览器中访问**http://127.0.0.1:8000/admin/**
  即可进入后台，通过超级用户登录后可以管理后台数据。超级用户的用户名为**root**，密码为**123456**。