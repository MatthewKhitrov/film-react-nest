import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Film {
  @Prop({ unique: true })
  id: string;
  @Prop({ required: true })
  rating: number;
  @Prop({ required: true })
  director: string;
  @Prop({ required: true })
  tags: [];
  @Prop({ required: true })
  Image: string;
  @Prop({ required: true })
  cover: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  about: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  schedule: {
    id: string;
    daytime: string;
    hall: number;
    rows: number;
    seats: number;
    price: number;
    taken: string[];
  }[];
  schedules: any;
}

export const FilmsSchema = SchemaFactory.createForClass(Film);
