import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { trace } from "@opentelemetry/api";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { GrpcInstrumentation } from "@opentelemetry/instrumentation-grpc";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { Resource } from "@opentelemetry/resources";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import * as dotenv from "dotenv";

dotenv.config();


// Optionally register automatic instrumentation libraries
registerInstrumentations({
    instrumentations: [new GrpcInstrumentation(), new HttpInstrumentation()],
});

const resource = Resource.default().merge(
    new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "client",
        [SemanticResourceAttributes.SERVICE_VERSION]: "1.0",
    }),
);

const provider = new NodeTracerProvider({
    resource,
});

const exporter = new JaegerExporter();


// All tracings are exported and stored in Azure SDK
const processor = new SimpleSpanProcessor(exporter);
provider.addSpanProcessor(processor);
provider.register();

const tracer = trace.getTracer("sample-grpc-tracer", "1.0");
export default tracer;
