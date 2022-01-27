import { DataTypes, Model } from 'sequelize';
import connection from '../index';
import ContactsModel from './contacts';
import EventModel from './event';

interface EventInstance extends Model {
  id_Event: string;
  id_Contacts: string,
}
const EventContactsModel = connection.define<EventInstance>('Event_Contacts', {
  id_Event: {
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

EventModel.hasMany(EventContactsModel, { foreignKey: "id_Event" });
EventContactsModel.belongsTo(EventModel, { foreignKey: "id_Event" });

ContactsModel.hasMany(EventContactsModel, { foreignKey: "id_Contacts" });
EventContactsModel.belongsTo(ContactsModel, { foreignKey: "id_Contacts" });

export default EventContactsModel