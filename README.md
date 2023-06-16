# Core service

This is a demo and stripped out basic API service. A version of this is the boiler plate for a microservice architecture that has been running since 2019.

Once up and running go to [api docs]

## Set up

There are a few options to set up and run.

The best way is to develop within a self contained Docker Container. This will install required dependencies including versions of Node.js and NPM

**_You will need [Docker Desktop] installed and running_**

```
cd ./app
make up
```

The api docs can be found at: [api docs]

## Makefile

`make help`

## Where is the .env file?

Well there isn't one. For this demo the environment values are in teh Docker-compose files for no other reason is that it is easier to read.

Running this project in production you would pipe in environment variables when the container starts. They would be stored securely in a key vault and not exposed to the public/ other developers.

[Docker Desktop]: https://www.docker.com/products/docker-desktop/
[api docs]: http://localhost:8080/docs
