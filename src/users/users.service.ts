import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    // If we have some validation logic in the user's entity, the create()
    // Method would first create an instance of it, then run the validation
    // And then save() actually makes an entry into the database, in our case
    // Since we have a pipe for the validation, this is not needed and we can instantly
    // just save the user, also if just save(), hooks will not be called inside the entity.

    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  async remove(id: string) {
    const user = await this.repo.findOne({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundException(`User with id: ${id} is not found`);
    }

    return this.repo.remove(user);
  }
}

// findOne(id: number) {
//   return this.repo.findOneBy({ id });
// }

// find(email: string) {
//   return this.repo.find({ where: { email } });
// }
