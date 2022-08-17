import { CosmosClient } from "@azure/cosmos";

/*
// This script ensures that the database is setup and populated correctly
*/

import config from "../config/config";

async function create(client: CosmosClient, databaseId: string, containerId: string) {
  const { partitionKey } = config;

  /**
   * Create the database if it does not exist
   */
  const { database } = await client.databases.createIfNotExists({
    id: databaseId,
  });

  /**
   * Create the container if it does not exist
   */
  const { container } = await client
    .database(databaseId)
    .containers.createIfNotExists({ id: containerId, partitionKey }, { offerThroughput: 400 });

  console.log("Role Database has been successfully connected.");
}

export default { create };
