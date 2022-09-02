# gRPC Tracing using OpenTelemetry in Azure ApplicationInsights with Node Typescript
This sample application shows how to implement distributed tracing using OpenTelemetry in Node Typescript.

## Architecure

### client

This is the entrypoint of the application. This is a simple REST API client app that act as the gRPC client and communicate with the gRPC server.

### user-service

Typescript gRPC server returning the user's name and role given userId.

### role-service

Typescript gRPC server returning the role's description given role name.

## Running

This sample application is using Azure CosmoDb Jaeger Exporter. You will need to configure your CosmoDb 
and Jaeger Exporter accordingly.

## How to Run Jaeger in Docker

You will need to run the following command in your terminal.

```docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.37
  ```

Once you have run the container, you can then navigate to `http://localhost:16686`


### List of env variable for user and role

```
COSMOSDB_ENDPOINT
COSMOSDB_KEY
```

You don't need any environment files for the client.

### user

```bash
cd user-service
yarn install
yarn start
```

### role

```bash
cd role-service
yarn install
yarn start
```

### client

```bash
cd client
yarn install
yarn start
```
