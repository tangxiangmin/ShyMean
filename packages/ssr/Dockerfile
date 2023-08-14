FROM node:16.13.0-alpine

WORKDIR /projects

COPY ./pnpm-lock.yaml ./

RUN npm install -g pnpm@7 \
    && pnpm fetch

COPY . .

RUN pnpm install -r --offline

VOLUME ["/projects/node_modules/", "/projects/packages/ssr/node_modules/","/projects/.pnpm-store/"]

CMD cd packages/ssr && npm run build && npm run start
