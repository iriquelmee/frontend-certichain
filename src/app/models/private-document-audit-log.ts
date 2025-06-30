export interface PrivateDocumentAuditLog {
    txID: string;
    documentId: string;
    institution: string;
    userId: string;
    operation: string;
    oldState: string;
    newState: string;
    timestamp: string;
}
