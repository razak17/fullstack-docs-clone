import { Navbar } from './navbar';
import { TemplatesGallery } from './templates-gallery';
import { useQuery } from 'convex/react';

const Home = () => {
	const documents = useQuery(
		api.documents.get,
		{ paginationOpts: { numItems: 5, cursor: '' } }
	);
	return (
		<div className='flex min-h-screen flex-col'>
			<div className='fixed left-0 right-0 top-0 z-10 h-16 bg-white p-4'>
				<Navbar />
			</div>
			<div className='mt-16'>
				<TemplatesGallery />
        {documents?.map((doc) => (
          <div key={doc._id}>{doc._id}</div>
        ))}
			</div>
		</div>
	);
};

export default Home;
