import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { Subscription } from "./subscription.entity";

@Controller("subscriptions")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async findAll(): Promise<Subscription[]> {
    return this.subscriptionService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<Subscription> {
    return this.subscriptionService.findOne(id);
  }

  @Post()
  async create(@Body() subscription: Subscription): Promise<Subscription> {
    return this.subscriptionService.create(subscription);
  }
}
