import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location, LocationDocument } from './location.schema';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<LocationDocument>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    const location = new this.locationModel(createLocationDto);
    return location.save();
  }

  async findAll() {
    return this.locationModel.find().exec();
  }

  async findOne(id: string) {
    const location = await this.locationModel.findById(id);
    return location;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const existingLocation = await this.locationModel.findByIdAndUpdate(
      id,
      updateLocationDto,
      { new: true },
    );
    return existingLocation;
  }

  async delete(id: string): Promise<void> {
    this.locationModel.findByIdAndDelete(id);
  }
}
