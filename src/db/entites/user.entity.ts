import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

   
  @Column({ type: 'varchar'})
  name: string;

  @Column({ type: 'varchar', name: 'username_github'})
  usernameGitHub: string;

  @Column({ type: 'varchar'})
  email: string;

  @Column({ type: 'varchar', name: 'password_hash'})
  passwordHash: string;
}