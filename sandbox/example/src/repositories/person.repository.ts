import {DefaultCrudRepository} from '@loopback/repository';
import {Person, PersonRelations} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {
  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource,
  ) {
    super(Person, dataSource);
  }
}
