import { logger } from "./config/observability";
import { createApp } from "./app";

const main = async () => {
  const port = process.env.PORT || 3100;
  const app = await createApp();

  app.listen(port, () => {
    logger.info(`Started listening on port ${port}`);
  });
};

main();
