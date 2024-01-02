import { OsmIntegrationService } from './osm-integration.service';

describe('OsmIntegrationService', () => {
  let service: OsmIntegrationService;

  beforeEach(async () => {
    service = new OsmIntegrationService();
  });

  it('should return correct amount of nodes', async () => {
    // define test data
    const lat = 49.84193;
    const lon = 24.03159;
    const radius = 5000;
    const objectType = ['cafe', 'fast_food'];
    const objectName = 'Lviv Croissants';

    // call service
    const result = await service.getNearbyPlaces(
      lat,
      lon,
      radius,
      objectType,
      objectName,
    );

    // check results
    expect(result).toBeDefined();
    expect(result.elements.length).toBe(23);
  });

  it('should return correct amount of nodes', async () => {
    // define test data
    const lat = 49.83515;
    const lon = 24.00646;
    const radius = 100;
    const objectType = ['shop'];

    // call service
    const result = await service.getNearbyPlaces(lat, lon, radius, objectType);

    // check results
    expect(result).toBeDefined();
    expect(result.elements.length).toBe(25);
  });

  it('should return correct amount of nodes', async () => {
    // define test data
    const lat = 49.84193;
    const lon = 24.03159;
    const radius = 5000;
    const objectType = ['cinema'];

    // call service
    const result = await service.getNearbyPlaces(lat, lon, radius, objectType);

    // check results
    expect(result).toBeDefined();
    expect(result.elements.length).toBe(9);
  });
});
