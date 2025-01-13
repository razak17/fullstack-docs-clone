'use client';

import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageResize from 'tiptap-extension-resize-image';

export const Editor = () => {
	const editor = useEditor({
		editorProps: {
			attributes: {
				style: 'padding-left: 56px; padding-right: 56px;',
				class:
					'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
			},
		},
		extensions: [
			StarterKit,
			TaskItem.configure({
				nested: true,
			}),
			TaskList,
			Table,
			TableCell,
			TableHeader,
			TableRow,
			Image,
			ImageResize,
		],
		content: 'Hello, world!',
	});
	return (
		<div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:overflow-visible print:bg-white print:p-0'>
			<div className='mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0'>
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};
