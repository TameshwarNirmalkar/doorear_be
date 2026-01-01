import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "c_domain_url" })
class ClientDomainUrlEntity {
  @PrimaryGeneratedColumn({ name: "domain_url_id", type: "int" })
  domain_url_id!: number;

  @Column({
    name: "domain_url",
    type: "text", // Maps to the TEXT type in MySQL
    nullable: false, // TEXT columns are often nullable by default in TypeORM
  })
  domain_url!: string;
}

export default ClientDomainUrlEntity;
