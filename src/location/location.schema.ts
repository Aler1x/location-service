import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<Location>;

@Schema()
export class Location {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  coordinates: number[];

  @Prop({ required: true })
  type: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
