export interface PublicDocumentAuditLog {
    txID: string;
    documentId: string;
    institution: string;
    userId: string;
    operation: string;
    timestamp: string;
}
