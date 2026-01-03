import {
  Column,
  Entity,
  Index,
  // PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "client_detail" })
class ClientDetailsEntity {
  // @PrimaryColumn()
  @Index("client_id")
  @PrimaryGeneratedColumn({ type: "int" })
  client_id!: number;

  @Column({ type: "varchar", length: 512, nullable: true })
  full_name!: string | null;

  @Column({ type: "varchar", length: 512, nullable: true })
  email_address!: string | null;

  @Column({ type: "varchar", length: 1000, nullable: true })
  password!: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  password_reset_link!: string | null;

  @Column({ type: "text", nullable: false })
  role_name!: string;

  @Column({ type: "text", nullable: true })
  token!: string | null;

  @Column({ type: "int", default: 0, nullable: false })
  sso_enabled!: boolean;

  @Column({ type: "timestamp", nullable: false })
  created_on!: Date;

  @Column({ type: "varchar", length: 150, nullable: true })
  updated_by!: string | null;

  @Column({ type: "timestamp", nullable: true })
  reset_password_date!: Date | null;

  @Column({ type: "varchar", length: 250, nullable: true })
  profile_picture!: string | null;

  @Column({ type: "varchar", length: 256, nullable: true })
  salt!: string | null;

  @Column({ type: "varchar", length: 512, nullable: true })
  time_zone!: string | null;

  @Column({ type: "int", default: 0, nullable: true })
  forget_password_count!: number | null;

  @Column({ type: "timestamp", nullable: true })
  otp_generated_date_time!: Date | null;

  @Column({ type: "varchar", length: 50, nullable: true })
  otp_code!: string | null;

  @Column({ type: "timestamp", nullable: true })
  resent_otp_date_time!: Date | null;

  @Column({ type: "int", nullable: true })
  resent_otp_count!: number | null;

  @Column({ type: "int", default: 0, nullable: true })
  rate_limit_count!: number | null;

  @Column({ type: "timestamp", nullable: true })
  rate_limit_attempt_date_time!: Date | null;

  @Column({ name: "device_detail", type: "text", nullable: true })
  device_detail!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  last_login_date!: string | null;
}

export default ClientDetailsEntity;
