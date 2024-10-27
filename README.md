# RuoYi v3.8.8

## 基线

原始仓库: https://github.com/yangzongzhuan/RuoYi-Vue3

当前基于Commit: 7507a18

## 后端

[RuoYi-SpringBoot](https://github.com/XFY9326/RuoYi-SpringBoot)

## 修改内容

-   去除无用界面
-   全部依赖升级
-   增加prettier格式化代码
-   补充表单构建模块
-   使用pnpm代替npm
-   增加部分代码补全功能
-   增加自动部署管理脚本

## 前端运行

```shell
# 进入项目目录
cd RuoYi-Vue3

# 安装pnpm
npm install -g pnpm

# 安装依赖
pnpm install

# 启动服务
# 前端访问地址 http://localhost:8081
pnpm dev

# 构建测试环境
# 构建的内容在dist目录下，另外所有构建内容还会打包到dist-zip目录下
pnpm build:stage

# 构建生产环境
# 构建的内容在dist目录下，另外所有构建内容还会打包到dist-zip目录下
pnpm build:prod

# 预览构建后的代码
# 在dist目录下启动http服务器
pnpm preview

# 代码批量格式化
pnpm reformat
```

## 部署

在任意位置运行`ry.sh`脚本，将会以脚本所在目录作为工作目录存放临时与备份文件

```shell
# 将打包的文件部署到指定位置
# 通过修改脚本中的DEPLOY_DIR_NAME和DEPLOY_DIR_PATH变量实现调整 部署位置
# 部署的目录文件夹必须存在
ry.sh deploy ./dist-zip/dist-production.zip

# 备份服务为001
ry.sh backup 001

# 从001的备份回滚服务
ry.sh rollback 001
```

注意，由于Git会修改换行符号，执行shell脚本前建议强制将CRLF转为LF

```shell
sed -i "s/\r$//" ry.sh
```

## Swagger

由于后端使用SpringDoc需要反向代理支持，所有Swagger相关的Url都被定位到`/api-docs`路径下

因此Swagger UI的Url修改为：`/api-docs/swagger-ui/index.html`

## Nginx配置

-   `proxy_pass`设置为真实后端位置
-   如果在Docker内，`proxy_set_header X-Forwarded-Port`设置为真实端口号  
    如果不在Docker内，`proxy_set_header X-Forwarded-Port`设置为`$server_port`
-   `gzip_static`：GZIP静态压缩，仅编译启用http_gzip_static_module模块时有效，可使用`nginx -V`查看

```text
server {
    gzip_static on;

    location / {
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
    }

    location /api {
        proxy_pass http://127.0.0.1:8080;

        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Prefix /api;

        rewrite ^/api(.*)$ $1 break;
    }

    location /api-docs {
        proxy_pass http://127.0.0.1:8080;

        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_set_header X-Forwarded-Prefix /api;
    }
}
```

## 默认账户

-   用户名：admin
-   密码：admin123
