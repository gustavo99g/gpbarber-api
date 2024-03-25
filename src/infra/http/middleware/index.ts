import { jwtService } from "../../JWT/jwt";
import { Middleware } from "./middleware";

const middleware = new Middleware(jwtService)

export { middleware }