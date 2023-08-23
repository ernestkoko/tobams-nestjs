import { BeforeInsert, Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('user')
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  uuid: string;

  @Column()
  email: string;

  @Column({
    select: false
  })
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @BeforeInsert()
  insertUUID(){
      this.uuid = uuidv4();
  }
}