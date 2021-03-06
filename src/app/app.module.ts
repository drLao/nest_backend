import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../posts/posts.module';
import { FilesModule } from '../files/files.module';

import { User } from '../users/users.model';
import { Role } from '../roles/roles.model';
import { UserPost } from '../posts/posts.model';

import { UserRoles } from '../shared-models/user-roles.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserPost, UserRoles],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}
