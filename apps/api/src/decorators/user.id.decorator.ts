import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()?.user;
})

export default UserId
