import { DocumentRequest } from "./document-request";
import { PrivateDocument } from "./private-document";

export interface SearchDocumentRequestInfo {
    documentRequest: DocumentRequest;
    privateDocument: PrivateDocument;
}
