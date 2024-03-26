# maphoto

![GitHub Repo stars](https://img.shields.io/github/stars/WShihan/maphoto?style=plastic)![GitHub repo size](https://img.shields.io/github/repo-size/WShihan/maphoto?style=plastic)![GitHub](https://img.shields.io/github/license/WShihan/maphoto)![GitHub last commit](https://img.shields.io/github/last-commit/WShihan/maphoto?style=plastic)![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/WShihan/maphoto)

一个练手小WebGIS项目，基于Vue3编写的仿iOS相册的地图应用，将照片导进地图展示，特点如下：

* 底图可切换。
* 多照片浏览。
* 照片聚合。
* 地图可特别配置。

<img style="width:40%;margin: 5% auto;" src="https://md-1301600412.cos.ap-nanjing.myqcloud.com/pic/typora/WechatIMG499.png" alt="WechatIMG499" />

[点击demo预览](https://www.wsh233.cn/webapp/maphoto)



## 1.使用

Maphoto只是一个单纯的前端应用，运行需要地图服务器的支持。

## 2.准备

* 地图服务器，支持类wfs服务，提供接口获取数据。（可自行修改，不用地图服务器也行）。
* 发布图层，需要包含icon和srcs字段，均为文本类型。
* 

## 3. 运行
本地新建vue环境配置文件，添加相应地址：
> * VUE_APP_BASE_URL="接口根地址"
> * VUE_APP_MAPHOTO_URL="图片地址"
> * VUE_APP_THUMB_URL="缩略图地址"
>



终端执行如下命令，安装项目依赖包，

```
npm install
```

执行如下命令本地开发运行，

```
npm run serve
```

执行如下命令编译生产版本，

```
npm run build
```



## Vue自定义配置

See [Configuration Reference](https://cli.vuejs.org/config/).



## 致谢

* 地图使用高德矢量地图，天地图注记图，OpenStreetMap（OSM）水彩地图。
* 框架使用Vue3，地图交互使用openlayers。
* 还用到很多包，无法一一列举，感谢:sparkling_heart:。
