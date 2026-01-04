import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ClientStatus {
  START = "START",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  CANCELLED = "CANCELLED",
}

@Entity("registration")
export class ClientSignUpEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  full_name!: string;

  @Column({ type: "varchar", length: 100 })
  email!: string;

  @Column({ type: "bigint" })
  phone!: number;

  @Column({ type: "enum", enum: ClientStatus, default: ClientStatus.START })
  status!: ClientStatus;

  @Column({ type: "int" })
  db_created!: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true })
  created_at?: Date;
}
