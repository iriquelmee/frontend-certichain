export interface DocumentRequest {
    id: string | null;
    requesterID: string;
    issuerID: string;
    date: string;
    documentTypeID: string;
    state: string;
}
