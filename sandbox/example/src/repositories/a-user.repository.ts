import {DefaultCrudRepository} from '@loopback/repository';
import {AUser, AUserRelations} from '../models';
import {MemoryDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AUserRepository extends DefaultCrudRepository<
  AUser,
  typeof AUser.prototype.id,
  AUserRelations
> {
  constructor(
    @inject('datasources.memory') dataSource: MemoryDataSource,
  ) {
    super(AUser, dataSource);
  }
}
