@echo off
setlocal enabledelayedexpansion

echo ========================================================
echo       启动 vlmcsd KMS 服务 和 Web 激活工具界面
echo ========================================================
echo.

:: 检查 Docker 是否已安装
where docker >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo 错误: Docker 未安装。请先安装 Docker 后再运行此脚本。
    exit /b 1
)

:: 容器名称
set CONTAINER_NAME=vlmcsd

:: 检查容器是否已存在
docker ps -a --format "{{.Names}}" | findstr /b /c:"%CONTAINER_NAME%" >nul
if %ERRORLEVEL% equ 0 (
    echo 发现已存在的 %CONTAINER_NAME% 容器
    
    :: 检查容器是否正在运行
    docker ps --format "{{.Names}}" | findstr /b /c:"%CONTAINER_NAME%" >nul
    if %ERRORLEVEL% equ 0 (
        echo 容器已经在运行中，无需重新启动
    ) else (
        echo 容器存在但未运行，正在启动...
        docker start %CONTAINER_NAME%
    )
) else (
    echo 正在启动新的 vlmcsd 容器...
    docker run -d --name %CONTAINER_NAME% ^
        -p 1688:1688 ^
        -p 80:80 ^
        --restart unless-stopped ^
        yourusername/vlmcsd:latest
)

echo.
echo ========================================================
echo                     服务已启动
echo ========================================================
echo KMS 激活服务: 端口 1688
echo Web 激活工具界面: http://localhost 或 http://服务器IP
echo.
echo 您可以通过浏览器访问 Web 界面，轻松获取激活命令
echo ========================================================

:: 自动打开浏览器（取消注释以启用此功能）
:: start http://localhost

pause 