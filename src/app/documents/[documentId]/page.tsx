import { Document } from './document';

const DocumentPage = async ({
	params,
}: {
	params: Promise<{ documentId: string }>;
}) => {
	return <Document />;
};

export default DocumentPage;
