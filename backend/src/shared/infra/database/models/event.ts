import { DataTypes, Model } from 'sequelize';
import connection from '../index';

interface EventInstance extends Model {
  id: number;
  name: string,
}
const EventModel = connection.define<EventInstance>('Events', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  appointment: {
    type: DataTypes.DATE,
  }
}, {
  freezeTableName: true,
});

export default EventModel;