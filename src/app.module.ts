import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionModule } from "./subscription/subscription.module";
import { UserModule } from "./user/user.module";
import { WebhookModule } from "./webhook/webhook.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import typeorm from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get("typeorm"),
    }),
    SubscriptionModule,
    UserModule,
    WebhookModule,
  ],
})
export class AppModule {}
