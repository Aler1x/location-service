import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location, LocationDocument } from './location.schema';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<string> {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
  ) {}

  async transform(value: string): Promise<string> {
    const isValid = await this.locationModel.findById(value).exec();
    if (!isValid) {
      throw new NotFoundException(`Location with ID ${value} not found`);
    }
    return value;
  }
}
