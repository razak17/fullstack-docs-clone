'use client';

import { usePaginatedQuery } from 'convex/react';
import { LoaderIcon } from 'lucide-react';
import { api } from '../../../convex/_generated/api';
import { DocumentsTable } from './documents-table';
import { Navbar } from './navbar';
import { TemplatesGallery } from './templates-gallery';

const Home = () => {
	const { results, status, isLoading, loadMore } = usePaginatedQuery(
		api.documents.get,
		{},
		{ initialNumItems: 5 }
	);
	return (
		<div className='flex min-h-screen flex-col'>
			<div className='fixed left-0 right-0 top-0 z-10 h-16 bg-white p-4'>
				<Navbar />
			</div>
			<div className='mt-16'>
				<TemplatesGallery />
				{isLoading && results?.length === 0 ? (
					<div className='mt-12 flex justify-center gap-2'>
						<LoaderIcon className='size-6 animate-spin text-muted-foreground' />
						<p className='text-sm text-muted-foreground'>Loading...</p>
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
