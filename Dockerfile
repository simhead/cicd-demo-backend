FROM node:10-alpine

# By default, the Docker Node image includes a non-root node user that you can use to avoid running
# your application container as root. It is a recommended security practice to avoid running
# containers as root and to restrict capabilities within the container to only those required to run
# its processes. We will therefore use the node user’s home directory as the working directory for our
# application and set them as our user inside the container. For more information about best practices
#when working with the Docker Node image, see this best practices guide.
#
# To fine-tune the permissions on our application code in the container,
# let’s create the node_modules subdirectory in /home/node along with the app directory.
# Creating these directories will ensure that they have the permissions we want, which will be
# important when we create local node modules in the container with npm install.
# In addition to creating these directories, we will set ownership on them to our node user:
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Next, set the working directory of the application to /home/node/app:
# If a WORKDIR isn’t set, Docker will create one by default, so it’s a good idea to set it explicitly.
WORKDIR /home/node/app

# Next, copy the package.json and package-lock.json (for npm 5+) files:
COPY package*.json ./

# To ensure that all of the application files are owned by the non-root node user, including the
# contents of the node_modules directory, switch the user to node before running npm install:
USER node

# After copying the project dependencies and switching our user, we can run npm install:
RUN npm install

# Next, copy your application code with the appropriate permissions to the application
# directory on the container:
COPY --chown=node:node . .
# This will ensure that the application files are owned by the non-root node user.

# Finally, expose port 8080 on the container and start the application:
EXPOSE 8080
# EXPOSE does not publish the port, but instead functions as a way of documenting which ports on the container
# will be published at runtime. CMD runs the command to start the application — in this case, node app.js.
# Note that there should only be one CMD instruction in each Dockerfile.
# If you include more than one, only the last will take effect.
# for more info: https://docs.docker.com/engine/reference/builder/

CMD [ "node", "./bin/www" ]