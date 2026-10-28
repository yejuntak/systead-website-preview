import type {Metadata} from 'next';
import CandidateDocument from '@/components/CandidateDocument';
import {getPage} from '@/lib/pages';

const page = getPage('/')!;
export const metadata: Metadata = {title: page.title, description: page.description};
export default function HomePage() { return <CandidateDocument page={page} />; }
