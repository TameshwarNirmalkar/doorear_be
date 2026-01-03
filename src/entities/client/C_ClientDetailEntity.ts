import {
  Column,
  Entity,
  Index,
  // PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "c_clientdetail" })
class ClientDetailsEntity {
  // @PrimaryColumn()
  @Index("client_id")
  @PrimaryGeneratedColumn({ name: "client_id", type: "int" })
  client_id!: number;

  @Column({
    name: "full_name",
    type: "varchar",
    length: 512,
    nullable: true,
  })
  full_name!: string | null;

  @Column({
    name: "email_address",
    type: "varchar",
    length: 512,
    nullable: true,
  })
  email_address!: string | null;

  @Column({
    name: "password",
    type: "varchar",
    length: 1000,
    nullable: true,
  })
  password!: string | null;

  @Column({
    name: "password_reset_link",
    type: "varchar",
    length: 500,
    nullable: true,
  })
  password_reset_link!: string | null;

  // TypeORM usually maps 'TEXT' to 'string' in TS
  @Column({ name: "role_name", type: "text", nullable: false })
  role_name!: string;

  @Column({ name: "token", type: "text", nullable: true })
  token!: string | null;

  @Column({
    name: "sso_enabled",
    type: "int",
    default: 0,
    nullable: false,
  })
  sso_enabled!: boolean;

  @Column({
    name: "created_on",
    type: "datetime",
    nullable: false,
  })
  createdOn!: Date;

  @Column({
    name: "updated_by",
    type: "varchar",
    length: 512,
    nullable: true,
  })
  updatedBy!: string | null;

  @Column({ name: "reset_rassword_date", type: "datetime", nullable: true })
  reset_rassword_date!: Date | null;

  @Column({
    name: "profile_picture",
    type: "varchar",
    length: 250,
    nullable: true,
  })
  profile_picture!: string | null;

  @Column({ name: "salt", type: "varchar", length: 256, nullable: true })
  salt!: string | null;

  @Column({
    name: "time_zone",
    type: "varchar",
    length: 512,
    nullable: true,
  })
  time_zone!: string | null;

  @Column({
    name: "forget_password_count",
    type: "int",
    default: 0,
    nullable: true,
  })
  forget_password_count!: number | null;

  @Column({
    name: "otp_generated_date_time",
    type: "datetime",
    nullable: true,
  })
  otp_generated_date_time!: Date | null;

  @Column({
    name: "otp_code",
    type: "varchar",
    length: 50,
    nullable: true,
  })
  otp_code!: string | null;

  @Column({ name: "resent_otp_date_time", type: "datetime", nullable: true })
  resent_otp_date_time!: Date | null;

  @Column({ name: "resent_otp_count", type: "int", nullable: true })
  resent_otp_count!: number | null;

  @Column({
    name: "rate_limit_count",
    type: "int",
    default: 0,
    nullable: true,
  })
  rate_limit_count!: number | null;

  @Column({
    name: "rate_limit_attempt_date_time",
    type: "datetime",
    nullable: true,
  })
  rate_limit_attempt_date_time!: Date | null;

  @Column({ name: "device_detail", type: "text", nullable: true })
  device_detail!: string | null;

  @Column({
    name: "last_login_date",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  last_login_date!: string | null;
}

export default ClientDetailsEntity;
