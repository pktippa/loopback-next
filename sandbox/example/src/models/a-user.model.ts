import {Entity, model, property} from '@loopback/repository';

@model()
export class AUser extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<AUser>) {
    super(data);
  }
}

export interface AUserRelations {
  // describe navigational properties here
}

export type AUserWithRelations = AUser & AUserRelations;
