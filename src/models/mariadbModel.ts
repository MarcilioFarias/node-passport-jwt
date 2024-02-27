import { Model, DataTypes } from "Sequelize";
import { sequelize } from "../instances/connection";

export interface modelInterface extends Model{
    id:number;
    email:string;
    password:string;
}

export const modelData = sequelize.define<modelInterface>('user',{
    id: {
        primaryKey:true,
        autoIncrement:true,
        type: DataTypes.NUMBER
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type:DataTypes.STRING
    }
},
{
    tableName: 'data-user',
    timestamps: false
});


