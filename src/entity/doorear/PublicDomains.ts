import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("vkr_public_domains")
export class PubliceDomainEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id?: number;

    @Column({ type: "varchar" })
    domain?: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    Createdts!: Date;
}
