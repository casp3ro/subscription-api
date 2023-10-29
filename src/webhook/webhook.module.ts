import { Module } from "@nestjs/common";
import { WebhookController } from "./webhook.controller";
import { WebhookService } from "./webhook.service";
import { UserModule } from "user/user.module";
import { SubscriptionModule } from "subscription/subscription.module";

@Module({
  imports: [UserModule, SubscriptionModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
