import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeOrmModuleOptions } from './config/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRootAsync(TypeOrmModuleOptions),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: Number('3307'),
      username: 'root',
      database: 'commerce',
      password: 'password',
      entities: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
