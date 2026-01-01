import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum CloudTaskRunStatus {
    Start = "Start",
    Inprocess = "Inprocess",
}

export enum YesNo {
    Yes = "Y",
    No = "N",
}

@Entity("v_clientmaster")
export class ClientMasterEntity {
    @PrimaryGeneratedColumn({ type: "int", unsigned: true })
    ClientID!: number;

    @Column({ type: "varchar", length: 255, default: "Free" })
    ClientType!: string;

    @Column({ type: "varchar", length: 255, default: "Free" })
    PrevClientType!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    ClientName!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    OrgID!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    oid!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    Email!: string;

    @Column({ type: "varchar", length: 255, default: "N" })
    ClientStatus!: string;

    @Column({ type: "char", length: 5, default: "N" })
    SendAlertMail!: string;

    @Column({ type: "tinyint", default: 1 })
    IsActiveClient!: boolean;

    @Column({ type: "varchar", length: 5, default: "Y" })
    FreeUserRun!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    Router!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    QuickRouter!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    LeadProcessing!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    ReAssignmentRouter!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    AccountRouter!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    QuickContactRouter!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    PartnerRouter!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    OpportunityRouter!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    ApiRouter!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    ContactApiRouter!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    AccountApiRouter!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    OpportunityApiRouter!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    OtsRouter!: string;

    @Column({ type: "varchar", length: 5, nullable: true })
    UserProcessing!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    RouterEdition!: string;

    @Column({ type: "datetime", nullable: true })
    SubscriptionStateDate?: Date;

    @Column({ type: "datetime", nullable: true })
    SubscriptionEndDate?: Date;

    @Column({ type: "datetime", nullable: true })
    ContractExpirationDate?: Date;

    @Column({ type: "varchar", length: 5, default: "N" })
    Segmentation!: string;

    @Column({ type: "datetime", nullable: true })
    SubscriptionCancellationDate?: Date;

    @Column({ type: "varchar", length: 25, nullable: true })
    SubscriptionValidStatus!: string;

    @Column({ type: "varchar", length: 25, nullable: true })
    PlanStatus!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    Attribution!: string;

    @Column({ type: "varchar", length: 5, default: "N" })
    DataAppend!: string;

    @Column({ type: "int", default: 0 })
    FreeRoutingLimit!: number;

    @Column({ type: "int", default: 1, nullable: true })
    AssignmentBlockLimit!: number;

    @Column({ type: "int", default: 0 })
    CalendarUserLimit!: number;

    @Column({ type: "int", default: 1 })
    ActiveLeadProcessingRunCount!: number;

    @Column({ type: "int", default: 1 })
    MaximumActiveLeadProcessing!: number;

    @Column({ type: "int", default: 360 })
    QuickRouterRunTimeInterval!: number;

    @Column({ type: "int", default: 6 })
    RouterTimeInterval!: number;

    @Column({ type: "int", default: 2 })
    LeadProcessingTimeInterval!: number;

    @Column({ type: "int", default: 5 })
    ReAssignmentRouterTimeInterval!: number;

    @Column({ type: "int", default: 5 })
    AccountRouterTimeInterval!: number;

    @Column({ type: "int", default: 5 })
    OpportunityRouterTimeInterval!: number;

    @Column({ type: "int", default: 3 })
    ParterRouterTimeInterval!: number;

    @Column({ type: "int", default: 10080 })
    FreeUserRunTimeInterval!: number;

    @Column({ type: "int", default: 65 })
    SegmentationTimeInterval!: number;

    @Column({ type: "int", default: 4 })
    QuickContactRouterTimeInterval!: number;

    @Column({ type: "int", default: 2 })
    ApiRouterTimeInterval!: number;

    @Column({ type: "int", default: 2 })
    ContactApiRouterTimeInterval!: number;

    @Column({ type: "int", default: 2 })
    AccountApiRouterTimeInterval!: number;

    @Column({ type: "int", default: 2 })
    OpportunityApiRouterTimeInterval!: number;

    @Column({ type: "int", default: 2 })
    OtsRouterTimeInterval!: number;

    @Column({ type: "int", default: 30 })
    UserProcessingTimeInterval!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextQuickRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextLeadProcessingRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextQuickContactRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextReAssignmentRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextAccountRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextOpportunityRouterRunTs?: Date;

    @Column({ type: "int", default: 1 })
    ActiveAccountRouterRunCount!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextPartnerRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextFreeUserRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextSegmentationRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextApiRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextContactApiRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextAccountApiRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextOpportunityApiRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextOtsRouterRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextUserProcessingRunTs?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextUpdateSystemAttributeRunTs?: Date;

    @Column({ type: "tinyint", default: 0 })
    UpdateSystemAttributeRunningStatus!: number;

    @Column({ type: "int", default: 60 })
    UpdateSystemAttributeTimeInterval!: number;

    @Column({ type: "tinyint", default: 0 })
    DropUnusedFieldRunningStatus!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    LastDedupeAccountRunTime?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    LastLeadProcessingRunTs?: Date;

    @Column({ type: "varchar", length: 20, default: "Start" })
    DedupeAccountRunStatus!: string;

    @Column({ type: "varchar", length: 20, default: "Start" })
    EmailAlertSchedulerRunStatus!: string;

    @Column({ type: "varchar", length: 20, default: "Start" })
    CRMJobUploadStatusRunStatus!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    CRMJobUploadStatusLastRun?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    EmailAlertSchedulerLastRun?: Date;

    @Column({ type: "tinyint", default: 0 })
    LeadangelCloudTask!: number;

    @Column({
        type: "enum",
        enum: CloudTaskRunStatus,
        default: CloudTaskRunStatus.Start,
    })
    LeadangelCloudTaskRunStatus!: CloudTaskRunStatus;

    @Column({ type: "tinyint", default: 0 })
    isDeleted!: number;

    @Column({ type: "tinyint", default: 0 })
    IsTestOrg!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    Createdts?: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    Modifiedts?: Date;

    @Column({ type: "varchar", length: 200, nullable: true })
    CreatedBy!: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    ModifiedBy!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    UpdateAccountCustomDomainStatus!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    OpportunityRouterRunStatus!: string;

    @Column({ type: "timestamp", nullable: true })
    UpdateAccountCustomDomainRefreshTs?: Date;

    @Column({ type: "varchar", length: 200 })
    leadangelActivationKey!: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    SubscriptionId!: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    stripecustomerId!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    Phone!: string;

    @Column({ type: "timestamp", nullable: true })
    NextLeadUploadToCRMRunTs?: Date;

    @Column({ type: "enum", enum: YesNo, default: YesNo.No })
    WaterfallRouter!: YesNo;

    @Column({ type: "enum", enum: YesNo, default: YesNo.No })
    ContactWaterfallRouter!: YesNo;

    @Column({ type: "enum", enum: YesNo, default: YesNo.No })
    AccountWaterfallRouter!: YesNo;

    @Column({ type: "enum", enum: YesNo, default: YesNo.No })
    OpportunityWaterfallRouter!: YesNo;

    @Column({ type: "enum", enum: YesNo, default: YesNo.No })
    LeadProcessingWaterfallRouter!: YesNo;

    @Column({ type: "enum", enum: YesNo, default: YesNo.No })
    EscalationWaterfallRouter!: YesNo;

    @Column({ type: "enum", enum: YesNo, default: YesNo.No })
    ContactProcessingWaterfallRouter!: YesNo;

    @Column({ type: "tinyint", default: 1 })
    SchemaCreated!: number;

    @Column({ type: "varchar", length: 200, nullable: true })
    CRM_Username!: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    CRM_UserEmail!: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    CRM_InstanceUrl!: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    CRM_Hashsalt!: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    CRM_Configuration_1?: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    CRM_Configuration_2?: string;

    @Column({ type: "text", nullable: true })
    CRM_Configuration_3?: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    CRM_Configuration_4?: string;

    @Column({ type: "text", nullable: true })
    CRM_Configuration_5?: string;

    @Column({ type: "text", nullable: true })
    CRM_Configuration?: string;

    @Column({ type: "varchar", length: 100, default: "Vyakar", nullable: true })
    NamespacePrefix!: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    DefaultUserID!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    OrgType!: string;

    @Column({ type: "varchar", length: 50, default: "Draft" })
    ClientSchemaRunningStatus!: string;

    @Column({ type: "tinyint", default: 1 })
    PoweredBy!: number;

    @Column({ type: "int", default: 5 })
    AccountBoostLimit!: number;

    @Column({ type: "tinyint", default: 0 })
    CalendarSchedulerRun!: boolean;

    @Column({ type: "varbinary", length: 512, nullable: true })
    SlackOauthToken!: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    SlackFieldMapping?: string;

    @Column({ type: "tinyint", default: 0 })
    SlackNotifyPublicPrivateChannel!: number;

    @Column({ type: "varbinary", length: 250, nullable: true })
    TwilioOauthToken!: string;

    @Column({ type: "varbinary", length: 250, nullable: true })
    TwilioAccountSID!: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    TwilioPhoneNo!: string;

    @Column({ type: "varchar", length: 200, nullable: true })
    ExternalCRMSystem!: string;

    @Column({ type: "int", nullable: true })
    TotalCRMAccounts!: number;

    @Column({ type: "int", nullable: true })
    TotalCRMLeads!: number;

    @Column({ type: "int", nullable: true })
    TotalCRMContacts!: number;

    @Column({ type: "int", nullable: true })
    TotalCRMOpportunity!: number;

    @Column({ type: "int", nullable: true })
    TotalCRMUsers!: number;

    @Column({ type: "int", nullable: true })
    TotalCRMRoutingLeads!: number;

    @Column({ type: "int", nullable: true })
    TotalCRMUsersInQueue!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextCountUpdateTime?: Date;

    @Column({ type: "timestamp", nullable: true })
    NextDropUnusedFieldsRunTs?: Date;

    @Column({ type: "timestamp", nullable: true })
    NextTwelveHourSyncTs?: Date;

    @Column({ type: "tinyint", default: 0 })
    TwoFactorAuthentication!: number;

    @Column({ type: "varchar", length: 5, default: "N" })
    ContactProcessing!: string;

    @Column({ type: "int", default: 1 })
    ActiveContactProcessingRunCount!: number;

    @Column({ type: "int", default: 3 })
    MaximumActiveContactProcessing!: number;

    @Column({ type: "int", default: 2 })
    ContactProcessingTimeInterval!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    NextContactProcessingRunTs?: Date;

    @Column({ type: "timestamp", nullable: true })
    LastContactProcessingRunTs?: Date;

    @Column({ type: "varchar", length: 255, nullable: true })
    ClarityId!: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    SlackBotUserId!: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    SlackTeamId!: string;
}
