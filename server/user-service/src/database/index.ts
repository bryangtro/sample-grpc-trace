import * as CosmosClient from "@azure/cosmos";
import config from "./config/config";
import dbContext from "./utils/databaseContext";

const { endpoint, key, databaseId, containerId } = config;
const client = new CosmosClient.CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

// Make sure Tasks database is already setup. If not, create it.
dbContext.create(client, databaseId, containerId);

// Data by default are stored in container (COSMOS DB). Hence, we export it to be utilised for queries.
export default container;
