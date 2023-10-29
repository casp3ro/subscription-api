import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscription, SubscriptionStatus } from "./subscription.entity";

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>
  ) {}

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionRepository.find({ relations: ["users"] });
  }

  async findOne(id: number): Promise<Subscription> {
    return this.subscriptionRepository.findOne({
      where: {
        id,
      },
      relations: ["users"],
    });
  }

  async create(subscription: Subscription): Promise<Subscription> {
    return this.subscriptionRepository.save(subscription);
  }

  async update(id: number, subscription: Subscription): Promise<Subscription> {
    await this.subscriptionRepository.update(id, subscription);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }

  public async updateStatus(
    subscriptionId: number,
    status: SubscriptionStatus
  ): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        id: subscriptionId,
      },
    });
    subscription.status = status;
    const subscriptionUpdated = await this.update(
      subscription.id,
      subscription
    );
    return subscriptionUpdated;
  }
}
