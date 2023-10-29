import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";

export enum SubscriptionStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  CANCELED = "canceled",
  PENDING = "pending",
}

@Entity({ name: "subscription" })
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: SubscriptionStatus,
    default: SubscriptionStatus.PENDING,
  })
  status: SubscriptionStatus;

  @OneToMany(() => User, (user) => user.subscription)
  @JoinColumn()
  users: User[];
}
