type configInterface = {
  endpoint: string;
  key: string;
  databaseId: string;
  containerId: string;
  partitionKey: { kind: string; paths: string[] };
};

const config: configInterface = {
  endpoint: process.env.COSMOSDB_ENDPOINT ?? "",
  key: process.env.COSMOSDB_KEY ?? "",
  databaseId: "user",
  containerId: "user",
  partitionKey: { kind: "Hash", paths: ["/category"] },
};

export default config;
