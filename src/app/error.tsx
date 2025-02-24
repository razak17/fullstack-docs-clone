'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangleIcon } from 'lucide-react';
import Link from 'next/link';

const ErrorPage = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center space-y-6'>
			<div className='space-y-4 text-center'>
				<div className='flex justify-center'>
					<div className='rounded-full bg-rose-100 p-3'>
						<AlertTriangleIcon className='size-10 text-rose-600' />
					</div>
				</div>
				<div className='space-y-2'>
					<h2 className='text-xl font-semibold text-gray-900'>
						Something went wrong
					</h2>
					<p>{error.message}</p>
				</div>
			</div>
			<div className='flex items-center gap-x-3'>
				<Button onClick={reset} className='px-6 font-medium'>
					Try again
				</Button>
				<Button asChild variant='ghost' className='font-medium'>
					<Link href='/'>Go back</Link>
				</Button>
			</div>
		</div>
	);
};

export default ErrorPage;
