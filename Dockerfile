FROM pritunl/archlinux:latest

WORKDIR /interceptor

RUN pacman -Syyu \
  systemd \
  nodejs \
  npm \
  mongodb \
  --noconfirm

ADD . /interceptor
RUN npm install
RUN mkdir -p /data/db
RUN systemctl start mongodb

CMD ["node","app.js"]
