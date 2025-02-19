import { useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { RIGHT_MARGIN_DEFAULT, LEFT_MARGIN_DEFAULT } from '@/constants/margins';

type MarkerProps = {
	position: number;
	isLeft: boolean;
	isDragging: boolean;
	onMouseDown: () => void;
	onDoubleClick: () => void;
};

const Marker = ({
	position,
	isLeft,
	isDragging,
	onMouseDown,
	onDoubleClick,
}: MarkerProps) => {
	return (
		<div
			className='group absolute top-0 z-[5] -ml-2 h-full w-4 cursor-ew-resize'
			style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
			onMouseDown={onMouseDown}
			onDoubleClick={onDoubleClick}
		>
			<FaCaretDown className='absolute left-1/2 top-0 h-full -translate-x-1/2 fill-blue-500' />
			<div
				className='absolute left-1/2 top-4 -translate-x-1/2'
				style={{
					height: '100vh',
					width: '1px',
					transform: 'scaleX(0.5)',
					backgroundColor: '#3b72f6',
					display: isDragging ? 'block' : 'none',
				}}
			/>
		</div>
	);
};

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
	const [leftMargin, setLeftMargin] = useState(LEFT_MARGIN_DEFAULT);

	const [rightMargin, setRightMargin] = useState(RIGHT_MARGIN_DEFAULT);

	const [isDraggingLeft, setIsDraggingLeft] = useState(false);
	const [isDraggingRight, setIsDraggingRight] = useState(false);
	const rulerRef = useRef<HTMLDivElement>(null);

	const handleLeftMouseDown = () => {
		setIsDraggingLeft(true);
	};

	const handleRightMouseDown = () => {
		setIsDraggingRight(true);
	};

	const handleMouseUp = () => {
		setIsDraggingLeft(false);
		setIsDraggingRight(false);
	};

	const handleLeftDoubleClick = () => {
		setLeftMargin(LEFT_MARGIN_DEFAULT);
	};

	const handleRightDoubleClick = () => {
		setRightMargin(RIGHT_MARGIN_DEFAULT);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		const PAGE_WIDTH = 816;
		const MINIMUM_SPACE = 100;

		if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
			const container = rulerRef.current.querySelector('#ruler-container');
			if (container) {
				const containerRect = container.getBoundingClientRect();
				const relativeX = e.clientX - containerRect.left;
				const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

				if (isDraggingLeft) {
					const maxLeftPosition = PAGE_WIDTH - rightMargin - MINIMUM_SPACE;
					const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
					setLeftMargin(newLeftPosition);
				} else if (isDraggingRight) {
					const maxRightPosition = PAGE_WIDTH - (leftMargin + MINIMUM_SPACE);
					const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);
					const constrainedRightPosition = Math.min(
						newRightPosition,
						maxRightPosition
					);
					setRightMargin(constrainedRightPosition);
				}
			}
		}
	};

	return (
		<div
			ref={rulerRef}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			className='relative mx-auto flex h-6 w-[816px] select-none items-end border-b border-gray-300 print:hidden'
		>
			<div id='ruler-container' className='relative size-full'>
				<Marker
					position={leftMargin}
					isLeft={true}
					isDragging={isDraggingLeft}
					onMouseDown={handleLeftMouseDown}
					onDoubleClick={handleLeftDoubleClick}
				/>
				<Marker
					position={rightMargin}
					isLeft={false}
					isDragging={isDraggingRight}
					onMouseDown={handleRightMouseDown}
					onDoubleClick={handleRightDoubleClick}
				/>
				<div className='absolute inset-x-0 bottom-0 h-full'>
					<div className='relative h-full w-[816px]'>
						{markers.map((marker) => {
							const position = (marker * 816) / 82;

							return (
								<div
									key={marker}
									className='absolute bottom-0'
									style={{ left: `${position}px` }}
								>
									{marker % 10 === 0 && (
										<>
											<div className='absolute bottom-0 h-2 w-px bg-neutral-500' />
											<span className='absolute bottom-2 -translate-x-1/2 text-[10px] text-neutral-500'>
												{marker / 10 + 1}
											</span>
										</>
									)}
									{marker % 5 === 0 && marker % 10 !== 0 && (
										<div className='absolute bottom-0 h-1.5 w-px bg-neutral-500' />
									)}
									{marker % 5 !== 0 && (
										<div className='absolute bottom-0 h-1 w-px bg-neutral-500' />
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
