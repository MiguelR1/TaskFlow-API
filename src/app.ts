import express from "express";

import authRoute from "../src/modules/auth/auth.routes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
