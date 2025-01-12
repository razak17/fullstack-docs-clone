import { Document } from './document';

type DocumentPageProps = {
	params: Promise<{ documentId: string }>;
};

const DocumentPage = async ({ params }: DocumentPageProps) => {
	return <Document />;
};

export default DocumentPage;
