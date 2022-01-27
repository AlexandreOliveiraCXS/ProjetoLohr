import { DataTypes, Model } from 'sequelize';
import connection from '../index';

interface GroupInstance extends Model {
  id: number;
  name: string,
}
const GroupModel = connection.define<GroupInstance>('Groups', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  freezeTableName: true,
});

export default GroupModel