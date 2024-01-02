import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocationModule } from './location/location.module';
import { OsmIntegrationModule } from 'y/osm-integration'; // y is a symlink to libs/osm-integration

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    LocationModule,
    OsmIntegrationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
