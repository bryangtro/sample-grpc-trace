import * as appInsight from "applicationinsights";
import * as dotenv from "dotenv";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import routes from "./routes/index";

dotenv.config();


appInsight
    .setup(process.env.APPLICATION_INSIGHTS_CONNECTION_STRING)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectConsole(true, true)
    .setSendLiveMetrics(true)
    .setDistributedTracingMode(appInsight.DistributedTracingModes.AI_AND_W3C)
    .start();

const app = new Koa();
const PORT = 3000;

app.proxy = true;

app.use(bodyParser());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Client is running on port ${PORT}`);
});
