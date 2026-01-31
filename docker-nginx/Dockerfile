FROM alpine:3.18

# versions (you can change if needed)
ENV NGINX_VERSION=1.25.4
ENV NGINX_RTMP_MODULE_GIT=https://github.com/arut/nginx-rtmp-module.git

RUN apk add --no-cache \
        build-base \
        pcre-dev \
        zlib-dev \
        openssl-dev \
        linux-headers \
        ca-certificates \
        wget \
        git \
        autoconf \
        automake \
        libtool

WORKDIR /tmp

# download nginx
RUN wget http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz && \
    tar zxvf nginx-${NGINX_VERSION}.tar.gz

# clone rtmp module
RUN git clone ${NGINX_RTMP_MODULE_GIT} nginx-rtmp-module

WORKDIR /tmp/nginx-${NGINX_VERSION}

# configure & build nginx with rtmp module
RUN ./configure \
      --prefix=/etc/nginx \
      --sbin-path=/usr/sbin/nginx \
      --conf-path=/etc/nginx/nginx.conf \
      --error-log-path=/var/log/nginx/error.log \
      --http-log-path=/var/log/nginx/access.log \
      --with-http_ssl_module \
      --with-threads \
      --with-file-aio \
      --with-http_v2_module \
      --add-module=/tmp/nginx-rtmp-module && \
    make && make install

# create www dir for static html and hls
RUN mkdir -p /var/www/html /var/www/hls /var/log/nginx && \
    chown -R root:root /var/www

# cleanup build deps to keep image smaller
RUN apk del build-base wget git autoconf automake libtool && \
    rm -rf /tmp/* /var/cache/apk/*

# copy your nginx.conf (we mount it in docker-compose, but keep fallback)
COPY nginx.conf /etc/nginx/nginx.conf

# expose RTMP and HTTP (HLS)
EXPOSE 1935 8080

VOLUME ["/var/www/hls"]

CMD ["nginx", "-g", "daemon off;"]