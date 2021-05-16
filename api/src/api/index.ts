import { Router } from "express";
import question from "./routes/question";

export default () => {
	const app = Router();
	question(app);

	return app;
};