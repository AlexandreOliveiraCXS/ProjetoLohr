import { DataTypes, Model } from 'sequelize';
import connection from '../index';
import ContactsModel from './contacts';
import GroupModel from './groups';

interface EventInstance extends Model {
  id_Event: string;
  id_Contacts: string,
}

const GroupContactsModel = connection.define<EventInstance>('Group_Contacts', {
  id_Group: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_Contacts: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  freezeTableName: true,
});

GroupModel.hasMany(GroupContactsModel, { foreignKey: "id_Group" });
GroupContactsModel.belongsTo(GroupModel, { foreignKey: "id_Group" });

ContactsModel.hasMany(GroupContactsModel, { foreignKey: "id_Contacts" });
GroupContactsModel.belongsTo(ContactsModel, { foreignKey: "id_Contacts" });

export default GroupContactsModel