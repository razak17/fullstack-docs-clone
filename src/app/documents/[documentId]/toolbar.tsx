'use client';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon
} from "lucide-react";

const ToolbarButton = ({
	onClick,
	isActive,
	icon: Icon,
}: {
	onClick?: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				'flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80',
				isActive && 'bg-neutral-200/80'
			)}
		>
			<Icon className='size-4' />
		</button>
	);
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
        },
      }
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log('comment'),
        isActive: editor?.isActive("liveblocksCommentMark")
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ]
  ];
	return (
		<div className='flex min-h-[40px] items-center gap-x-0.5 overflow-x-auto rounded-[24px] bg-[#F1F4F9] px-2.5 py-0.5'>
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: font family */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: heading */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: font size */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* TODO: text color */}
      {/* TODO: highlight color */}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {/* TODO: link */}
      {/* TODO: image */}
      {/* TODO: align */}
      {/* TODO: line height */}
      {/* TODO: list */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
		</div>
	);
};
