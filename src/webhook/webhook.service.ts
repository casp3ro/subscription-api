import { Injectable } from "@nestjs/common";
import { SubscriptionService } from "../subscription/subscription.service";
import { SubscriptionStatus } from "subscription/subscription.entity";

@Injectable()
export class WebhookService {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  public async handleSubscriptionActivated(subscriptionId: number) {
    await this.subscriptionService.updateStatus(
      subscriptionId,
      SubscriptionStatus.ACTIVE
    );
  }

  public async handleSubscriptionCancelled(subscriptionId: number) {
    await this.subscriptionService.updateStatus(
      subscriptionId,
      SubscriptionStatus.CANCELED
    );
  }

  public async handleSubscriptionInactivated(subscriptionId: number) {
    await this.subscriptionService.updateStatus(
      subscriptionId,
      SubscriptionStatus.INACTIVE
    );
  }
}
