import { RequestValidator } from "../../middleware/RequestValidator";
import { UserController } from "./user.controller";

export class UserRoute implements AppRoutes {
  path = '/v1';
  base = '/users';

  constructor(
    public router: Router,
    private validator: RequestValidator,
    private controller: UserController
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /v1/users:
     *   get:
     *     summary: Get all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: List of users
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     */
    this.router.get(`${this.base}`, this.controller.getUsers);

    /**
     * @swagger
     * /v1/users/{userId}:
     *   get:
     *     summary: Get a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: integer
     *         required: true
     *         description: The user ID
     *     responses:
     *       200:
     *         description: User details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: User not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    this.router.get(
      `${this.base}/:userId`,
      this.validator.validateParams('userId'),
      this.controller.getUser
    );

    /**
     * @swagger
     * /v1/users:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserInput'
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Invalid input
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    this.router.post(
      `${this.base}`,
      this.validator.validateBody('user'),
      this.controller.createUser
    );

    /**
     * @swagger
     * /v1/users/{userId}:
     *   put:
     *     summary: Update a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: integer
     *         required: true
     *         description: The user ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserInput'
     *     responses:
     *       200:
     *         description: User updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: User not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       400:
     *         description: Invalid input
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    this.router.put(
      `${this.base}/:userId`,
      this.validator.validateParams('userId'),
      this.validator.validateBody('user'),
      this.controller.updateUser
    );

    /**
     * @swagger
     * /v1/users/{userId}:
     *   delete:
     *     summary: Delete a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: integer
     *         required: true
     *         description: The user ID
     *     responses:
     *       204:
     *         description: User deleted successfully
     *       404:
     *         description: User not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    this.router.delete(
      `${this.base}/:userId`,
      this.validator.validateParams('userId'),
      this.controller.deleteUser
    );
  }
}