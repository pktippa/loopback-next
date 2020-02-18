import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Person} from '../models';
import {PersonRepository} from '../repositories';

export class PersonController {
  constructor(
    @repository(PersonRepository)
    public personRepository : PersonRepository,
  ) {}

  @post('/people', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Person)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {
            title: 'NewPerson',
            exclude: ['id'],
          }),
        },
      },
    })
    person: Omit<Person, 'id'>,
  ): Promise<Person> {
    return this.personRepository.create(person);
  }

  @get('/people/count', {
    responses: {
      '200': {
        description: 'Person model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.personRepository.count(where);
  }

  @get('/people', {
    responses: {
      '200': {
        description: 'Array of Person model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Person, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Person)) filter?: Filter<Person>,
  ): Promise<Person[]> {
    return this.personRepository.find(filter);
  }

  @patch('/people', {
    responses: {
      '200': {
        description: 'Person PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Person,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.personRepository.updateAll(person, where);
  }

  @get('/people/{id}', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Person, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Person)) filter?: Filter<Person>
  ): Promise<Person> {
    return this.personRepository.findById(id, filter);
  }

  @patch('/people/{id}', {
    responses: {
      '204': {
        description: 'Person PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Person,
  ): Promise<void> {
    await this.personRepository.updateById(id, person);
  }

  @put('/people/{id}', {
    responses: {
      '204': {
        description: 'Person PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() person: Person,
  ): Promise<void> {
    await this.personRepository.replaceById(id, person);
  }

  @del('/people/{id}', {
    responses: {
      '204': {
        description: 'Person DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.personRepository.deleteById(id);
  }
}
