# INSTALL NODE JS LTS
FROM collinestes/docker-node-oracle:6

MAINTAINER tolya.pechkin@gmail.com

# IF not in DockerCache Install Dependencies and Cache node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
# Create app directory and copy node_modules
RUN mkdir -p /usr/src/oraexp && cp -a /tmp/node_modules /usr/src/oraexp/
# Bundle app source
WORKDIR /usr/src/oraexp
COPY . /usr/src/oraexp
RUN cd /usr/src/oraexp
EXPOSE 1337
CMD [ "npm", "start" ]
