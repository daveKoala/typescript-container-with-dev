ARG VARIANT=18-bullseye

ARG USERNAME=node
ARG NPM_GLOBAL=/usr/local/share/npm-global

FROM node:${VARIANT} AS base

# Add NPM global to PATH.
ENV PATH=${NPM_GLOBAL}/bin:${PATH}

#  RUN \
#     # Configure global npm install location, use group to adapt to UID/GID changes
#     if ! cat /etc/group | grep -e "^npm:" > /dev/null 2>&1; then groupadd -r npm; fi \
#     && usermod -a -G npm ${USERNAME} \
#     && umask 0002 \
#     && mkdir -p ${NPM_GLOBAL} \
#     && touch /usr/local/etc/npmrc \
#     && chown ${USERNAME}:npm ${NPM_GLOBAL} /usr/local/etc/npmrc \
#     && chmod g+s ${NPM_GLOBAL} \
#     && npm config -g set prefix ${NPM_GLOBAL} \
#     && su ${USERNAME} -c "npm config -g set prefix ${NPM_GLOBAL}" \
#     # Install eslint
#     && su ${USERNAME} -c "umask 0002 && npm install -g eslint" \
#     && npm cache clean --force > /dev/null 2>&1

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .

FROM base as production

ENV NODE_PATH=./build

USER node

RUN npm run build