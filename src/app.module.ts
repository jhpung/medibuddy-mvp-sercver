import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicinesModule } from './medicines/medicines.module';
import { PharmaciesModule } from './pharmacies/pharmacies.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { AdminModule } from './admin/admin.module';
import { MulterModule } from '@nestjs/platform-express';
import { Pharmacy } from './models/entities/pharmacy.entity';
import { Medicine } from './models/entities/medicine.entity';
import { Treatment } from './models/entities/treatment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.development'] }),
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Pharmacy, Medicine, Treatment],
        synchronize: configService.get<boolean>('DB_SYNC'),
      }),
    }),
    MedicinesModule,
    PharmaciesModule,
    TreatmentsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
