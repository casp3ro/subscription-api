import { Subscription } from "../subscription/subscription.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Subscription, (subscription) => subscription.users)
  subscription: Subscription;
}
