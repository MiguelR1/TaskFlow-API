import express from "express";

import authRoute from "../src/modules/auth/auth.routes";
// import { userRoute } from "../src/modules/users/user.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoute);

// app.use("/api/users/", userRoute);
    

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;