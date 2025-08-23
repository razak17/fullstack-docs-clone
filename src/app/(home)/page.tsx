"use client";

import { usePaginatedQuery } from "convex/react";
import { LoaderIcon } from "lucide-react";

import { DocumentsTable } from "./documents-table";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { useSearchParam } from "@/hooks/use-search-param";
import { api } from "../../../convex/_generated/api";

const Home = () => {
  const [search] = useSearchParam();
  const { results, status, isLoading, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 },
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed top-0 right-0 left-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        {isLoading && results?.length === 0 ? (
          <div className="mt-12 flex justify-center gap-2">
            <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Loading...</p>
          </div>
        ) : (
          <DocumentsTable
            documents={results}
            loadMore={loadMore}
            status={status}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
