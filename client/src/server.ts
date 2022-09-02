import * as appInsight from "applicationinsights";
import * as dotenv from "dotenv";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import routes from "./routes/index";

dotenv.config();


const app = new Koa();
const PORT = 3000;

app.proxy = true;

app.use(bodyParser());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Client is running on port ${PORT}`);
});
