import "dotenv/config";
import express from "express";
import cors from "cors";
import bfhlRoutes from "./routes/bfhl.routes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "BFHL API is running" });
});

app.use("/bfhl", bfhlRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server on port ${PORT}`));
}

export default app;
