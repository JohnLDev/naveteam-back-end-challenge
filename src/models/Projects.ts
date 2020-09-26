import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm'
import { Naver } from './Naver'
import { User } from './User'

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user_id: User

  @ManyToMany(() => Naver, navers => navers.projects)
  navers: Naver[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
