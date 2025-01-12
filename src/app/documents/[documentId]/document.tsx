import { Editor } from './editor';

export const Document = () => {
	return (
		<div className='min-h-screen bg-[#FAFBFD]'>
			<div className='pt-[114px] print:pt-0'>
				<Editor />
			</div>
		</div>
	);
};
