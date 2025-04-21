FROM alpine:latest as builder
WORKDIR /build
RUN apk add --no-cache git make build-base && \
    git clone --branch master --single-branch https://github.com/Wind4/vlmcsd.git && \
    cd vlmcsd/ && \
    make

FROM alpine:latest
LABEL maintainer="Your Name <your.email@example.com>"
LABEL description="Microsoft KMS Emulator"
LABEL org.opencontainers.image.source="https://github.com/yourusername/vlmcsd"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /root/
COPY --from=builder /build/vlmcsd/bin/vlmcsd /usr/bin/vlmcsd
COPY --from=builder /build/vlmcsd/bin/vlmcs /usr/bin/vlmcs

# 创建非root用户运行服务
RUN addgroup -S vlmcsd && \
    adduser -S -G vlmcsd vlmcsd && \
    mkdir -p /etc/vlmcsd && \
    chown -R vlmcsd:vlmcsd /etc/vlmcsd

USER vlmcsd

# 默认KMS端口
EXPOSE 1688/tcp

# 使用健康检查
HEALTHCHECK --interval=60s --timeout=3s CMD vlmcs 127.0.0.1 || exit 1

VOLUME ["/etc/vlmcsd"]

# 以守护进程模式运行
CMD ["/usr/bin/vlmcsd", "-D", "-d", "-e"]