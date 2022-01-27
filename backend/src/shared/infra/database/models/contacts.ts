import { DataTypes, Model } from 'sequelize';
import connection from '../index';

interface ContactsInstance extends Model {
  id: number;
  name: string,
  last_Name: string,
  cel_Phone: string,
  email: string,

}
const ContactsModel = connection.define<ContactsInstance>('Contacts', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cel_Phone: DataTypes.STRING,
  email: DataTypes.STRING,
}, {
  freezeTableName: true,
});

export default ContactsModel