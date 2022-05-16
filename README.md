# Blog
## 来自后端的一些说明
### 关于前端所需工作
前端的同学主要需要修改blog/templates/下的几个html文件，其中：
- base.html 是基础页面，所有页面都由之派生。
- header.html & footer.html 是头尾的相关内容，由于其需要用于多个场合，因此为了方便代码复用，将其专门提出。
- article/list.html 可以作为主页，显示文章列表等。
- article/detail.html 是文章详情页面。
- article/create.html & edit.html 是新建&编辑文章的页面，两个页面可以相似处理。
这些页面我们已经按照www.dusaiphoto.com的Django教程写了个初步的框架，用的是bootstrap等样式，前端的同学可以按需修改。有什么问题随时联系。

### 关于可移植性
由于layer已经下架，因此我们将layer放在本地的静态文件中，没有用mdn。