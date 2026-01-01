import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ClientStatus {
  Start = "Start",
  Active = "Active",
  Suspended = "Suspended",
  Cancelled = "Cancelled",
}

@Entity("v_clientsignup")
export class ClientSignUpEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  firstname!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  lastname!: string;

  @Column({ type: "varchar", length: 100 })
  email!: string;

  @Column({ type: "bigint" })
  phone!: number;

  @Column({ type: "enum", enum: ClientStatus, default: ClientStatus.Start })
  status!: ClientStatus;

  @Column({ type: "int" })
  db_created!: number;

  @Column({ type: "timestamp" })
  created_at!: Date;
}
