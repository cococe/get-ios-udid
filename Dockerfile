FROM node:20.17-alpine

# 设置工作目录
WORKDIR /app

# 将本地代码复制到容器中
COPY . /app

# 安装项目依赖
RUN npm install

# 暴露应用的端口
EXPOSE 9000

# 启动应用
CMD ["node", "./index.js"]
