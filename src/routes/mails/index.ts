import { Request, Response, Router } from "express";
import Mail from "../../controllers/mails";

const router: Router = Router();

router.post("/send/:receiver", (req: Request, res: Response) => Mail.send(req, res));

export default router;
