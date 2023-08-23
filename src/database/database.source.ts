import {DataSource, DataSourceOptions} from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();     
  export const  datasourceOptions: DataSourceOptions ={
    type: 'mongodb',
    url:process.env.DB_HOST,
    database: "test",
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    useNewUrlParser: true,
    logging: true,
  }

const  dataSource = new DataSource(datasourceOptions);
export default dataSource;