import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({
       where: { id: user_id }, 
       relations: ['games'] 
    });
    return user;
    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(`
      SELECT * FROM USERS ORDER BY FIRST_NAME
    `); 
    // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`
      SELECT * FROM USERS WHERE FIRST_NAME ILIKE '${first_name}' AND LAST_NAME ILIKE '${last_name}'
    `); 
    // Complete usando raw query
  }
}
