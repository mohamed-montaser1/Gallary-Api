import { Request, Response, Router } from "express";
import Auth from "../../controllers/auth";

const router: Router = Router();

router.post("/login", (req: Request, res: Response) => Auth.login(req, res));
router.post("/register", (req: Request, res: Response) =>
  Auth.register(req, res)
);
router.get("/me", (req: Request, res: Response) => Auth.me(req, res));

export default router;
