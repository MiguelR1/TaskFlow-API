import express from "express";

import authRoute from "../src/modules/auth/auth.routes";
import { authMiddleware } from "./middlewares/authMiddleware";
// import { userRoute } from "../src/modules/users/user.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/login", authMiddleware.verificarToken, (req, res) => {
  res.status(200).json({ message: "Token válido. Acceso permitido." });
});
    

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtaWd1ZWwxIiwiaWF0IjoxNzgzNTY5NjkzLCJleHAiOjE3ODM1NzMyOTN9.68bJacyjyYsFx-_0UjjSsRLm84QxjNRIjpVVmOf9XSI