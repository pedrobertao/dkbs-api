import "dotenv/config";
import app from "./app";
import { APP_NAME, APP_STAGE, PORT } from "./services/env";

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`[${APP_NAME}] is running in ${APP_STAGE} at port: ${PORT}`);
});
