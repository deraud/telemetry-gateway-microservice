import "dotenv/config";
import { createHttpServer } from "./server/http";

const PORT = process.env.PORT || 3000;

// HTTP server
const app = createHttpServer();

// Main
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
