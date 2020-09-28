import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import Project from './Projects'
import User from './User'

@Entity('navers')
class Naver {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  birthdate: Date

  @Column()
  admission_date: Date

  @Column()
  job_role: string

  @Column()
  user_id: string

  @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToMany(() => Project, Project => Project.navers)
  @JoinTable()
  projects: Project[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
export default Naver
