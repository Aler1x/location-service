import { Test, TestingModule } from '@nestjs/testing';
import { OsmIntegrationService } from './osm-integration.service';

describe('OsmIntegrationService', () => {
  let service: OsmIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OsmIntegrationService],
    }).compile();

    service = module.get<OsmIntegrationService>(OsmIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
