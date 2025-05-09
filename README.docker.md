# vlmcsd Docker 镜像

这是一个运行 vlmcsd (KMS 服务器模拟器) 的 Docker 镜像，可用于激活 Windows 和 Office 产品。现在增加了一个易用的 Web 界面，方便用户生成激活命令。

## Docker Hub 地址

[https://hub.docker.com/r/yourusername/vlmcsd](https://hub.docker.com/r/yourusername/vlmcsd)

## 功能特点

- 基于轻量级 Alpine Linux
- 多架构支持 (amd64, arm64, armv7)
- 内置健康检查
- 以非 root 用户运行，提高安全性
- 支持通过卷挂载配置文件
- **新增 Web 界面**，可以轻松生成激活命令

## 使用方法

### 快速启动

```bash
docker run -d --name vlmcsd -p 1688:1688 -p 80:80 yourusername/vlmcsd
```

### 使用 Docker Compose

```yaml
version: '3'
services:
  vlmcsd:
    image: yourusername/vlmcsd:latest
    container_name: vlmcsd
    restart: always
    ports:
      - "1688:1688"  # KMS 服务端口
      - "80:80"      # Web 界面端口
    volumes:
      - ./config:/etc/vlmcsd
```

### 访问 Web 界面

启动容器后，在浏览器中访问：

```
http://localhost
```

或者你的服务器 IP 地址：

```
http://your-server-ip
```

通过 Web 界面，您可以：
1. 选择需要激活的产品（Windows 或 Office）
2. 选择具体版本
3. 获取自动生成的激活命令
4. 一键复制命令进行激活

### 测试 KMS 服务器是否工作

从容器内测试：

```bash
docker exec vlmcsd vlmcs 127.0.0.1
```

从主机测试（假设KMS服务器运行在本地）：

```bash
# Windows (管理员命令提示符)
slmgr /skms 127.0.0.1
slmgr /ato

# Office (以管理员身份运行命令提示符)
cd "C:\Program Files\Microsoft Office\Office16"
cscript ospp.vbs /sethst:127.0.0.1
cscript ospp.vbs /act
```

## 环境变量

目前镜像不支持环境变量配置，如需自定义配置，请挂载配置文件。

## 构建镜像

```bash
git clone https://github.com/yourusername/vlmcsd.git
cd vlmcsd
docker build -t yourusername/vlmcsd:latest .
```

## 安全建议

- 默认情况下，Web 界面没有启用身份验证
- 不建议将此服务暴露到公共网络
- 如需在公网使用，请考虑使用反向代理并添加身份验证

## 注意事项

- 本镜像仅用于学习和研究目的
- 请确保您拥有正版 Windows 和 Office 的许可证

## 许可证

本项目遵循 MIT 许可证。

## 相关项目

- [vlmcsd 原始项目](https://github.com/Wind4/vlmcsd) 