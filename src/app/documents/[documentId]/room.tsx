'use client';

import { FullscreenLoader } from '@/components/fullscreen-loader';
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';
import {
	ClientSideSuspense,
	LiveblocksProvider,
	RoomProvider,
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Id } from '../../../../convex/_generated/dataModel';

type User = { id: string; name: string; avatar: string; color: string };

export function Room({ children }: { children: ReactNode }) {
	const params = useParams();

	return (
		<LiveblocksProvider
			publicApiKey={
				'pk_dev_AhEnUROWF5mCWzi3E3KrnTt4xa1US4Fk6RLUk7j9jC0UdNdgDlt3svVxl6h2COf4'
			}
		>
			<RoomProvider
				id={params.documentId as string}
				initialStorage={{
					leftMargin: LEFT_MARGIN_DEFAULT,
					rightMargin: RIGHT_MARGIN_DEFAULT,
				}}
			>
				<ClientSideSuspense
					fallback={<FullscreenLoader label='Room loading...' />}
				>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}
