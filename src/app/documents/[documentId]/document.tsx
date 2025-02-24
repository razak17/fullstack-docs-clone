'use client';

import { Editor } from './editor';
import { Navbar } from './navbar';
import { Room } from './room';
import { Toolbar } from './toolbar';

export const Document = () => {
	return (
		<Room>
			<div className='min-h-screen bg-[#FAFBFD]'>
				<div className='fixed inset-x-0 top-0 z-10 flex flex-col gap-y-2 bg-[#FAFBFD] px-4 pt-2 print:hidden'>
					<Navbar />
					<Toolbar />
				</div>
				<div className='pt-[114px] print:pt-0'>
					<Editor />
				</div>
			</div>
		</Room>
	);
};
