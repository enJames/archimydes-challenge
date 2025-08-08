import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { swaggerUi, specs } from './swagger.config';

export class App {
  public app = express();
  public env = String(process.env['NODE_ENV']);
  public port = Number(process.env['PORT']) || 3000;

  constructor(private appRoutes: AppRoutes[]) {
    this.initializeMiddleware();
    this.initializeRoutes(this.appRoutes);
  }

  get server() {
    return this.app;
  }

  initializeMiddleware() {
    this.app.disable('x-powered-by');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('combined'));
    this.app.use(helmet());
    this.app.use(cors({ origin: ['http://localhost:8080'], credentials: true }));

    // Swagger UI
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  initializeRoutes(routes: AppRoutes[]) {
    routes.forEach((route) => this.app.use(route.path, route.router));
    this.app.use((req, res) => res.status(404).send('Unrecongnised path'));
  }

  listen() {
    this.app.listen(this.port, () => console.log(`Live at ${this.port}`));
  }
}
