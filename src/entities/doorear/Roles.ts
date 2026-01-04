import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RoleEnum {
  ADMIN = "ADMIN",
  VIEWER = "VIEWER",
  EDITOR = "EDITOR",
  STANDARD = "STANDARD",
  ENTERPRISES = "ENTERPRISES",
}

@Entity("roles")
export class RolesEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  role_id!: number;

  @Column({ type: "enum", enum: RoleEnum, default: RoleEnum.ADMIN })
  role_name?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_ts!: Date;
}
