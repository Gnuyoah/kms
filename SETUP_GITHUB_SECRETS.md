# 设置 GitHub Secrets 用于 Docker Hub 推送

为了让 GitHub Actions 工作流能够自动构建并推送 Docker 镜像到 Docker Hub，您需要在 GitHub 仓库中设置以下 Secrets：

## 所需的 Secrets

1. `DOCKERHUB_USERNAME` - 您的 Docker Hub 用户名
2. `DOCKERHUB_TOKEN` - 您的 Docker Hub 访问令牌（不是密码）

## 设置步骤

### 1. 创建 Docker Hub 访问令牌

1. 登录到您的 [Docker Hub 账户](https://hub.docker.com)
2. 点击右上角您的用户名，然后选择 "Account Settings"
3. 在左侧菜单中，选择 "Security"
4. 点击 "New Access Token"
5. 给令牌起一个名称（例如 "GitHub Actions"）并选择适当的权限（至少需要 "Read & Write"）
6. 点击 "Generate"
7. 复制生成的令牌（这是您唯一能看到它的机会）

### 2. 在 GitHub 仓库中添加 Secrets

1. 转到您的 GitHub 仓库
2. 点击 "Settings" 选项卡
3. 在左侧菜单中，点击 "Secrets and variables" 下的 "Actions"
4. 点击 "New repository secret"
5. 添加第一个 Secret：
   - Name: `DOCKERHUB_USERNAME`
   - Value: 您的 Docker Hub 用户名
6. 点击 "Add secret"
7. 再次点击 "New repository secret"
8. 添加第二个 Secret：
   - Name: `DOCKERHUB_TOKEN`
   - Value: 您刚才生成的 Docker Hub 访问令牌
9. 点击 "Add secret"

## 验证设置

添加这些 Secrets 后，当您推送代码到主分支或创建新标签时，GitHub Actions 工作流将自动触发，构建 Docker 镜像并推送到 Docker Hub。

您可以在您的 GitHub 仓库的 "Actions" 选项卡中查看工作流的运行状态。

## 注意事项

- 访问令牌有过期时间，请记得在到期前更新
- 如果您更改了 Docker Hub 用户名或令牌，记得也更新 GitHub Secrets
- GitHub Actions 有使用限制，请查阅 [GitHub Actions 文档](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration) 了解详情 