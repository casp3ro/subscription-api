import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.userService.delete(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() user: Partial<User>
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }
}
