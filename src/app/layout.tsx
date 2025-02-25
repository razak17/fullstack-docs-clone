import { ConvexClientProvider } from '@/components/convex-client-provider';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import '@liveblocks/react-ui/styles.css';
import '@liveblocks/react-tiptap/styles.css';
import './globals.css';

const inter = Inter({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Docs',
	description: 'Full stack text editor',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className}`}>
				<NuqsAdapter>
					<ConvexClientProvider>
						<Toaster />
						{children}
					</ConvexClientProvider>
				</NuqsAdapter>
			</body>
		</html>
	);
}
