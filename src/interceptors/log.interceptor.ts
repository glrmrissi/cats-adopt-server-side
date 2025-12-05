import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const methodColors: Record<string, string> = {
            GET: "\x1b[35m",    // roxo
            POST: "\x1b[32m",   // verde
            PUT: "\x1b[33m",    // amarelo
            PATCH: "\x1b[38;5;208m", // laranja
            DEFAULT: "\x1b[37m" // branco
        };

        const request = context.switchToHttp().getRequest();

        const dt = Date.now();

        return next.handle().pipe(tap(() => {
            console.log(
                `\x1b[36m[Application]\x1b[0m - ${methodColors[request.method] || methodColors.DEFAULT}[${request.method}]\x1b[0m - \x1b[32mURL:\x1b[0m ${request.url}    Execução levou: \x1b[33m${Date.now() - dt}ms\x1b[0m.`
            );
        }))
    }
}