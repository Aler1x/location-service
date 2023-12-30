import { Module } from '@nestjs/common';
import { OsmIntegrationService } from './osm-integration.service';

@Module({
  providers: [OsmIntegrationService],
  exports: [OsmIntegrationService],
})
export class OsmIntegrationModule {}
