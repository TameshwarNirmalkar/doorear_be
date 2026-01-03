import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("emailtemplate")
export class EmailTemplateEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  EmailTemplateId?: number;

  @Column({ type: "text", nullable: false })
  NotificationType?: string;

  @Column({ type: "text", nullable: false })
  EmailSubject?: string;

  @Column({ type: "text", nullable: false })
  EmailBody?: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  Emails?: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  EmailFrom?: string;

  @Column({ type: "text", nullable: true })
  LeadDefaultMessage?: string;

  @Column({ type: "text", nullable: true })
  ContactDefaultMessage?: string;

  @Column({ type: "varchar" })
  CreatedBy?: string;

  @Column({ type: "timestamp", nullable: false })
  CreatedOn?: Date;
}
