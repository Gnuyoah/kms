FROM alpine:latest as builder
WORKDIR /build
RUN apk add --no-cache git make build-base && \
    git clone --branch master --single-branch https://github.com/Wind4/vlmcsd.git && \
    cd vlmcsd/ && \
    make

FROM alpine:latest
LABEL maintainer="Your Name <your.email@example.com>"
LABEL description="Microsoft KMS Emulator with Web Interface"
LABEL org.opencontainers.image.source="https://github.com/yourusername/vlmcsd"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /root/
COPY --from=builder /build/vlmcsd/bin/vlmcsd /usr/bin/vlmcsd
COPY --from=builder /build/vlmcsd/bin/vlmcs /usr/bin/vlmcs

# 安装nginx来提供Web界面
RUN apk add --no-cache nginx supervisor && \
    mkdir -p /run/nginx && \
    mkdir -p /etc/supervisor.d

# 创建目录并添加Web文件
COPY web/ /var/www/html/
COPY docker-files/nginx.conf /etc/nginx/http.d/default.conf
COPY docker-files/supervisord.conf /etc/supervisor.d/supervisord.ini

# 创建非root用户运行服务
RUN addgroup -S vlmcsd && \
    adduser -S -G vlmcsd vlmcsd && \
    mkdir -p /etc/vlmcsd && \
    chown -R vlmcsd:vlmcsd /etc/vlmcsd && \
    chown -R nginx:nginx /var/www/html

# 默认KMS端口和Web界面端口
EXPOSE 1688/tcp 80/tcp

# 使用健康检查
HEALTHCHECK --interval=60s --timeout=3s CMD vlmcs 127.0.0.1 || exit 1

VOLUME ["/etc/vlmcsd"]

# 使用supervisor管理服务
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]