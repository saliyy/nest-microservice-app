import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const userId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()?.user;
})