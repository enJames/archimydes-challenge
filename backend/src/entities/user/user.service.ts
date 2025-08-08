export class UserService {
  models
  UserRole;

  constructor(private tools: Tools) {
    this.models = tools.database;
    this.UserRole = tools.enums.UserRole;
  }

  findAll = (): Promise<User[]> => {
    return this.models.User.findAll() as unknown as Promise<User[]>;
  }

  findById = (id: number): Promise<User | null> => {
    return this.models.User.findOne({ where: { id } }) as unknown as Promise<User | null>;
  }

  findByEmailAddress = (emailAddress: string): Promise<User | null> => {
    return this.models.User.findOne({ where: { emailAddress }}) as unknown as Promise<User | null>;
  }

  createUser(payload: BaseUser): Promise<[User, boolean]> {
    return this.models.User.findOrCreate({
      where: { emailAddress: payload.emailAddress },
      defaults: payload as any
    }) as unknown as Promise<[User, boolean]>;
  }

  updateUser(userId: number, payload: BaseUser): Promise<[number, Array<User>]> {
    return this.models.User.update(
      payload,
      { where: { id: userId }, returning: true }
    ) as unknown as Promise<[number, Array<User>]>;
  }
}