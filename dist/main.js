"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const typeorm_transactional_1 = require("typeorm-transactional");
(async () => {
    const port = process.env.PORT ?? 8000;
    (0, typeorm_transactional_1.initializeTransactionalContext)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new common_1.ConsoleLogger({
            colors: true,
            prefix: 'Mood Insight',
            timestamp: true,
        }),
    });
    app.enableCors({
        origin: ['*'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,PATCH',
        credentials: true,
    });
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen(port);
    common_1.Logger.log(`🚀 Application listening on http://localhost:${port}`);
})();
//# sourceMappingURL=main.js.map