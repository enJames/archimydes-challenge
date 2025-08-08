import database from './database';
import sampleUsers from './sampleUsers';

export default async () => {
  try {
    await database.connection.sync({ force: true });

    await database.User.bulkCreate(sampleUsers);
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
}