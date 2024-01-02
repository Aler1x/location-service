import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { Location, LocationDocument } from './location.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('LocationService', () => {
  let service: LocationService;
  let model: Model<LocationDocument>;

  beforeEach(async () => {
    const mockModel = {
      new: jest.fn().mockResolvedValue(Location),
      constructor: jest.fn().mockResolvedValue(Location),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getModelToken(Location.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    model = module.get<Model<LocationDocument>>(getModelToken(Location.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new location', async () => {
      const createLocationDto = {
        name: 'New Location',
        coordinates: [0, 0],
        type: 'Type',
      };
      const model = function () {};
      model.prototype.save = jest.fn().mockResolvedValue(createLocationDto);

      service = new LocationService(model as any);

      const result = await service.create(createLocationDto);

      expect(model.prototype.save).toHaveBeenCalled();
      expect(result).toEqual(createLocationDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of locations', async () => {
      const resultArray = [{ name: 'Location 1' }, { name: 'Location 2' }];
      (model.find as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(resultArray),
      });

      const result = await service.findAll();

      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual(resultArray);
    });
  });

  describe('findOne', () => {
    it('should return a single location', async () => {
      const singleLocation = { name: 'Single Location' };
      (model.findById as jest.Mock).mockResolvedValue(singleLocation);

      const result = await service.findOne('1');

      expect(model.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(singleLocation);
    });

    it('should throw an error if location not found', async () => {
      (model.findById as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(
        'Location #1 not found',
      );
    });
  });

  describe('update', () => {
    it('should update and return the location', async () => {
      const updateLocationDto = { id: '1', name: 'Updated Location' };
      const updatedLocation = { id: '1', name: 'Updated Location' };

      (model.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedLocation);

      const result = await service.update('1', updateLocationDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        updateLocationDto,
        { new: true },
      );
      expect(result).toEqual(updatedLocation);
    });

    it('should throw an error if location to update not found', async () => {
      (model.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(service.update('1', { id: '1' })).rejects.toThrow(
        'Location #1 not found',
      );
    });
  });

  describe('delete', () => {
    it('should delete the location', async () => {
      const idToDelete = '1';
      (model.findByIdAndDelete as jest.Mock).mockResolvedValue({
        id: idToDelete,
      });

      const result = await service.delete(idToDelete);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(idToDelete);
      expect(result).toEqual({ id: idToDelete });
    });
  });
});
