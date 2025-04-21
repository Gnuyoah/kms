# KMS Web 界面

本项目现在提供了一个简单的 Web 界面，可以更方便地生成 KMS 激活命令。

## 功能简介

通过 Web 界面，您可以：

- 选择需要激活的产品（Windows 或 Office）
- 选择产品版本，自动获取对应的密钥
- 选择或自定义 KMS 服务器地址
- 自动生成激活命令
- 一键复制命令，方便在命令提示符或 PowerShell 中执行

## 使用方法

1. 进入 `web` 目录
2. 打开 `index.html` 文件（可以直接在浏览器中打开）
3. 按照界面提示选择产品、版本和服务器
4. 复制生成的命令
5. 在管理员权限的命令提示符或 PowerShell 中执行命令

## 示例

例如，如果您选择了 Windows 11 专业版，系统会自动生成以下命令：

```
slmgr -ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr -skms kms.0t.net.cn
slmgr -ato
```

## 更多信息

- 界面是纯静态的，无需后端支持，可以在本地使用
- 支持所有在 KMS.md 文档中列出的 Windows 和 Office 版本
- 代码简洁，易于维护和扩展

要了解更多关于 KMS 激活的信息，请查看 [READNE.KMS.md](READNE.KMS.md) 文件。 