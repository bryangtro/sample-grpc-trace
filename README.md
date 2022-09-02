# gRPC Tracing using OpenTelemetry in Azure ApplicationInsights with Node Typescript
This sample application shows how to implement distributed tracing using OpenTelemetry in Node Typescript.

## Architecture

### client

This is the entrypoint of the application. This is a simple REST API client app that act as the gRPC client and communicate with the gRPC server.

### user-service

Typescript gRPC server returning the user's name and role given userId.

### role-service

Typescript gRPC server returning the role's description given role name.

## Running

This sample application is using Azure CosmoDb and Application Insights. You will need to configure your CosmoDb 
and Application Insights accordingly.

### List of env variable for user and role

```
APPLICATION_INSIGHTS_CONNECTION_STRING
COSMOSDB_ENDPOINT
COSMOSDB_KEY
```

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
