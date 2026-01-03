import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ClientStatus {
  START = "START",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  CANCELLED = "CANCELLED",
}

@Entity("client_signup")
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

  @Column({ type: "timestamp" })
  created_at!: Date;
}
