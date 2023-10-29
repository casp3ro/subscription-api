import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { WebhookService } from "./webhook.service";
import { WebhookEvent } from "./webhook.const";
import { IsEnum, ValidateNested, IsNumber } from "class-validator";
import { Type } from "class-transformer";

class WebhookData {
  @IsNumber()
  subscription_id: number;
}

class WebhookPayload {
  @IsEnum(WebhookEvent)
  event: WebhookEvent;

  @ValidateNested()
  @Type(() => WebhookData)
  data: WebhookData;
}

@Controller("webhook")
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handleWebhookEvent(
    @Body(new ValidationPipe()) payload: WebhookPayload
  ) {
    const { event, data } = payload;

    switch (event) {
      case WebhookEvent.SubscriptionActivated:
        await this.webhookService.handleSubscriptionActivated(
          data.subscription_id
        );
        break;
      case WebhookEvent.SubscriptionCancelled:
        await this.webhookService.handleSubscriptionCancelled(
          data.subscription_id
        );
        break;
      case WebhookEvent.SubscriptionInactivated:
        await this.webhookService.handleSubscriptionInactivated(
          data.subscription_id
        );
        break;
      default:
        throw new Error(`Unsupported event type: ${event}`);
    }
  }
}
