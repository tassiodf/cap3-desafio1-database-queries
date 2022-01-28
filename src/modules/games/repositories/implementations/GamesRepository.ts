import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const titles = await this.repository
      .createQueryBuilder("games")
      .where("games.title ILIKE :title", { title: `%${param}%` })
      .getMany();
      return titles;
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`
      SELECT COUNT(*) FROM GAMES
    `); 
    // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = this.repository
      .createQueryBuilder("game")
      .select("user.email, user.first_name, user.last_name")
      .innerJoinAndSelect("game.users", "user")
      .where(`game.id = :id`, { id: id })
      .getRawMany();
      return users;
      // Complete usando query builder
  }
}
