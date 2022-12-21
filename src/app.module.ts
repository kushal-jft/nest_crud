import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [UsersModule, AuthModule, AdminModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'kushalsng',
    password: '@Kushalthe1.',
    database: 'db1',
    entities: [User],
    synchronize: true
  }), AuthModule],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
