#!/bin/bash

# 启动 vlmcsd Docker 容器
# 此脚本会启动 KMS 服务和 Web 界面

# 检查 Docker 是否已安装
if ! command -v docker &> /dev/null; then
    echo "错误: Docker 未安装。请先安装 Docker 后再运行此脚本。"
    exit 1
fi

echo "========================================================"
echo "      启动 vlmcsd KMS 服务 和 Web 激活工具界面"
echo "========================================================"
echo ""

# 容器名称
CONTAINER_NAME="vlmcsd"

# 检查容器是否已存在
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo "发现已存在的 ${CONTAINER_NAME} 容器"
    
    # 检查容器是否正在运行
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        echo "容器已经在运行中，无需重新启动"
    else
        echo "容器存在但未运行，正在启动..."
        docker start ${CONTAINER_NAME}
    fi
else
    echo "正在启动新的 vlmcsd 容器..."
    docker run -d --name ${CONTAINER_NAME} \
        -p 1688:1688 \
        -p 80:80 \
        --restart unless-stopped \
        yourusername/vlmcsd:latest
fi

echo ""
echo "========================================================"
echo "                    服务已启动"
echo "========================================================"
echo "KMS 激活服务: 端口 1688"
echo "Web 激活工具界面: http://localhost 或 http://服务器IP"
echo ""
echo "您可以通过浏览器访问 Web 界面，轻松获取激活命令"
echo "========================================================" 