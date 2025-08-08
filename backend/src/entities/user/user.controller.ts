import { UserService } from "./user.service";

export class UserController {
  private StatusCode;
  private users: User[] = [];

  constructor(private tools: Tools, private userService: UserService) {
    this.StatusCode = tools.enums.StatusCode;
  }

  getUsers = async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const users = await this.userService.findAll();

      return this.tools.res.send(res, this.StatusCode.SUCCESS, users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return this.tools.res.send(res, this.StatusCode.INTERNAL_ERROR, {
        message: 'An error occurred while fetching users.'
      });
    }
  }

  getUser = async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const user = await this.userService.findById(+req.params.userId);
      if (!user) {
        return this.tools.res.send(res, this.StatusCode.NOT_FOUND, {
          message: 'User not found.'
        });
      }
      return this.tools.res.send(res, this.StatusCode.SUCCESS, user);
    } catch (error) {
      return this.tools.res.send(res, this.StatusCode.INTERNAL_ERROR, {
        message: 'An error occurred while fetching user details.'
      });
    }
  }

  createUser = async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const [user, created] = await this.userService.createUser(req.body);
      console.log('User created:', user);
      const status = !created ? this.StatusCode.CONFLICT : this.StatusCode.SUCCESS;
      return this.tools.res.send(res, status, user);
    } catch (error) {
      console.error('Error creating user:', error);
      return this.tools.res.send(res, this.StatusCode.INTERNAL_ERROR, {
        message: 'An error occurred while creating the user.'
      });
    }
  }

  updateUser = async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const userId = +req.params.userId;
      const [user] = await this.userService.updateUser(userId, req.body);
      return this.tools.res.send(res, this.StatusCode.SUCCESS, user);
    } catch (error) {
      return this.tools.res.send(res, this.StatusCode.INTERNAL_ERROR, {
        message: 'An error occurred while updating the user.'
      });
    }
  }

  deleteUser = async (req: ExpressRequest, res: ExpressResponse) => {
    try {
      const userId = +req.params.userId;
      const user = await this.userService.findById(userId);
      if (!user) {
        return this.tools.res.send(res, this.StatusCode.NOT_FOUND, {
          message: 'User not found.'
        });
      }
      await this.userService.models.User.destroy({ where: { id: user.id } });
      return this.tools.res.send(res, this.StatusCode.NO_CONTENT, { message: 'User deleted successfully.' });
    } catch (error) {
      return this.tools.res.send(res, this.StatusCode.INTERNAL_ERROR, {
        message: 'An error occurred while deleting the user.'
      });
    }
  }
}