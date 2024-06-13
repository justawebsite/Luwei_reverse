# Luwei_reverse

原绿A岛客户端对X岛的非官方适配

**如有侵权请立即联系删除**

# 构建

（所需环境及插件正在整理中）

所需：Android SDK、cordova8.1.0、适配版本的 nodejs、cordova_plugins.js 中所有插件的对应版本。

在构建前应确定已设置系统变量 "ANDROID_HOME" 为 Android SDK 所在位置。若没有，请执行：

```shell
export ANDROID_HOME = /.../Android/Sdk(此处为 Android SDK 所在位置 )
```

```shell
cordova create xdao com.hacfun.lwreverse XIsland
```

在当前所在位置创建一个 cordova 项目：软件名为“XIsland”，包名为“com.hacfun.lwreverse”，文件夹名为“xdao”

```shell
cp xdao
cordova platform add android
```

添加安卓平台

```shell
cordova plugin add ...
```

请自主安装相关插件

```shell
cordova build android
```

构建安卓安装包

# 下载

由于上述环境暂未整理完成，故无法构建。截至目前所发布的版本皆为在原软件包基础上的修改版

# 其他

暂无
