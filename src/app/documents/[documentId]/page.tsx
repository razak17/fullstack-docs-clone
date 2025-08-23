import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

import { Document } from "./document";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

type DocumentPageProps = {
  params: Promise<{ documentId: Id<"documents"> }>;
};

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { documentId } = await params;

  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;
  console.log("DEBUGPRINT[417]: page.tsx:15: token=", token);

  // if (!token) {
  // 	throw new Error('Unauthorized');
  // }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token },
  );

  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentPage;
