import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("email_template")
export class EmailTemplateEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  email_template_id?: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  notification_type?: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email_subject?: string;

  @Column({ type: "text", nullable: false })
  email_body?: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  emails?: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email_from?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  default_message?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  created_by?: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: true })
  created_on?: Date;
}
