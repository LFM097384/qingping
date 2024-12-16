#!/bin/bash

echo "正在启动青萍之末项目..."
echo

# 检查是否安装了所需依赖
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖包..."
    npm install
else
    echo "依赖包已存在..."
fi

# 启动开发服务器
echo "正在启动开发服务器..."
echo "请在浏览器中访问 http://localhost:3000"
npm start
