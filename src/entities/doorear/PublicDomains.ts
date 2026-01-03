import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("public_domains")
export class PubliceDomainEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  domain_id?: number;

  @Column({ type: "varchar" })
  domain_name?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_ts!: Date;
}
