FROM nginx
EXPOSE 80

ENV NODE_VERSION=23.3.0
LABEL org.opencontainers.image.source=https://github.com/oceansofcode/oceansofcode.github.io

RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

WORKDIR portfolio

RUN mkdir dist

COPY . .

RUN npm i
RUN npm run build

RUN mv index.html /usr/share/nginx/html
RUN mv dist /usr/share/nginx/html
