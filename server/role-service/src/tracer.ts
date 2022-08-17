import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { trace } from "@opentelemetry/api";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { GrpcInstrumentation } from "@opentelemetry/instrumentation-grpc";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { Resource } from "@opentelemetry/resources";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import * as dotenv from "dotenv";

dotenv.config();

const CONNECTION_STRING = process.env.APPLICATION_INSIGHTS_CONNECTION_STRING ?? "";

// Optionally register automatic instrumentation libraries
registerInstrumentations({
    instrumentations: [new GrpcInstrumentation(), new HttpInstrumentation()],
});

const resource = Resource.default().merge(
    new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "service-name",
        [SemanticResourceAttributes.SERVICE_VERSION]: "service-version",
    }),
);

const provider = new NodeTracerProvider({
    resource,
});

const exporter = new AzureMonitorTraceExporter({
    connectionString: CONNECTION_STRING,
});

// All tracings are exported and stored in Azure SDK
const processor = new SimpleSpanProcessor(exporter);
provider.addSpanProcessor(processor);
provider.register();
console.log("tracer file ran")
const tracer = trace.getTracer("global-tracer-name", "tracer-version");
export default tracer;