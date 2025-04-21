# KMS 激活服务器与Web界面

这是一个集成了微软 KMS 服务模拟器(vlmcsd)和用户友好的Web界面的项目，可用于快速生成 Windows 和 Office 激活命令。

![KMS 激活工具界面预览](images/image.png)

## 项目介绍

本项目基于 [vlmcsd](https://github.com/Wind4/vlmcsd) 开发，提供以下功能：

- **KMS 服务器**：运行在标准 1688 端口
- **Web 激活界面**：提供直观的图形化界面，无需记忆复杂命令
- **多产品支持**：支持激活 Windows 7/8/8.1/10/11 和 Windows Server 以及 Office 系列产品
- **自动生成命令**：根据选择的产品自动生成激活命令
- **一键复制**：复制单条命令或全部命令，提高效率

## 快速开始

### 使用 Docker 运行 (推荐)

```bash
# 使用官方镜像
docker run -d --name vlmcsd -p 1688:1688 -p 80:80 yourusername/vlmcsd

# 或使用 Docker Compose
docker-compose up -d
```

### 手动安装

1. 克隆本仓库
```bash
git clone https://github.com/yourusername/vlmcsd.git
cd vlmcsd
```

2. 编译 vlmcsd
```bash
make
```

3. 启动服务
```bash
./bin/vlmcsd -D -d -e
```

4. 打开Web界面 (位于 `web` 目录)

## 使用方法

1. 通过浏览器访问 Web 界面：`http://your-server-ip` 或 `http://localhost`
2. 选择要激活的产品（Windows 或 Office）和具体版本
3. 选择 KMS 服务器（默认使用本地服务器 127.0.0.1）
4. 复制生成的命令
5. 在目标系统的管理员命令提示符或 PowerShell 中执行命令

### Windows 激活示例

当您选择 Windows 11 专业版时，系统会生成以下命令：

```
slmgr -ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr -skms your-server-ip
slmgr -ato
```

### Office 激活示例

当您选择 Office 2016 (32位) 时，系统会生成以下命令：

```
cd "C:\Program Files (x86)\Microsoft Office\Office16"
cscript ospp.vbs /sethst:your-server-ip
cscript ospp.vbs /act
```

## 项目结构

```
vlmcsd/
├── src/               # KMS 服务器源码
├── web/               # Web 界面文件
│   ├── index.html     # 主页面
│   ├── styles.css     # 样式表
│   └── script.js      # JavaScript 脚本
├── Dockerfile         # Docker 构建文件
├── docker-compose.yml # Docker Compose 配置
└── README.md          # 项目说明文档
```

## 技术细节

- **后端**：使用 vlmcsd 实现 KMS 服务模拟
- **前端**：纯静态实现，使用 HTML, CSS 和 JavaScript
- **容器化**：使用 Alpine Linux 作为基础镜像，体积小巧
- **服务管理**：使用 Supervisor 管理 KMS 服务和 Web 服务

## 激活原理

KMS (Key Management Service) 是微软用于批量激活的技术。本项目模拟 KMS 服务器行为，使客户端认为它正在与合法的 KMS 服务器通信。激活后有效期为 180 天，客户端会每 7 天自动尝试续期一次。

## 注意事项

- KMS 激活是临时性的，有效期为 180 天，但系统会自动续期
- 本项目仅供学习研究和技术交流使用
- 推荐组织和个人购买正版软件，支持软件开发者

## 安全建议

- 默认情况下，Web 界面没有启用身份验证
- 不建议将此服务暴露到公共网络
- 如需在公网使用，请考虑使用反向代理并添加身份验证

## 贡献指南

欢迎提交 Pull Request 或 Issue 来改进这个项目。

## 许可证

本项目基于 MIT 许可证发布。

## 相关项目

- [vlmcsd 原始项目](https://github.com/Wind4/vlmcsd)
- [Microsoft KMS 文档](https://docs.microsoft.com/zh-cn/windows-server/get-started/kms-client-activation-keys) 