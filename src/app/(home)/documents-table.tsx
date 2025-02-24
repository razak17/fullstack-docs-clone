import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { PaginationStatus } from 'convex/react';
import { LoaderIcon } from 'lucide-react';

import { Doc } from '../../../convex/_generated/dataModel';
import { DocumentRow } from './document-row';

type DocumentsTableProps = {
	documents: Doc<'documents'>[] | undefined;
	loadMore: (numItems: number) => void;
	status: PaginationStatus;
};

export const DocumentsTable = ({
	documents,
	loadMore,
	status,
}: DocumentsTableProps) => {
	return (
		<div className='mx-auto flex max-w-screen-xl flex-col gap-5 px-16 py-6'>
			{documents === undefined ? (
				<div className='flex h-24 items-center justify-center'>
					<LoaderIcon className='size-5 animate-spin text-muted-foreground' />
				</div>
			) : (
				<Table>
					<TableHeader>
						<TableRow className='border-none hover:bg-transparent'>
							<TableHead>Name</TableHead>
							<TableHead>&nbsp;</TableHead>
							<TableHead className='hidden md:table-cell'>Shared</TableHead>
							<TableHead className='hidden md:table-cell'>Created at</TableHead>
						</TableRow>
					</TableHeader>
					{documents.length === 0 ? (
						<TableBody>
							<TableRow className='hover:bg-transparent'>
								<TableCell
									colSpan={4}
									className='h-24 text-center text-muted-foreground'
								>
									No documents found
								</TableCell>
							</TableRow>
						</TableBody>
					) : (
						<TableBody>
							{documents.map((document) => (
								<DocumentRow key={document._id} document={document} />
							))}
						</TableBody>
					)}
				</Table>
			)}
			<div className='flex items-center justify-center'>
				<Button
					variant='ghost'
					size='sm'
					onClick={() => loadMore(5)}
					disabled={status !== 'CanLoadMore'}
				>
					{status === 'CanLoadMore' ? 'Load more' : 'End of results'}
				</Button>
			</div>
		</div>
	);
};
