import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("emailtemplate")
export class EmailTemplateEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  email_template_id?: number;

  @Column({ type: "text", nullable: false })
  notification_type?: string;

  @Column({ type: "text", nullable: false })
  email_subject?: string;

  @Column({ type: "text", nullable: false })
  email_body?: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  emails?: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email_from?: string;

  @Column({ type: "text", nullable: true })
  lead_default_message?: string;

  @Column({ type: "text", nullable: true })
  contact_default_message?: string;

  @Column({ type: "varchar" })
  created_by?: string;

  @Column({ type: "timestamp", nullable: false })
  created_on?: Date;
}
