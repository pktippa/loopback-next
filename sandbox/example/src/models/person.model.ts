import {model, property} from '@loopback/repository';
import {AUser} from '.';

@model()
export class Person extends AUser {
  @property({
    type: 'string',
    required: true,
  })
  address: string;


  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
