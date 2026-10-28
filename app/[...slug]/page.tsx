import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import CandidateDocument from '@/components/CandidateDocument';
import {getPage, pages} from '@/lib/pages';

type Props = {params: Promise<{slug: string[]}>};
export const dynamicParams = false;
export function generateStaticParams() {
  return pages.filter(page => page.route !== '/').map(page => ({slug: page.route.split('/').filter(Boolean)}));
}
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const page = getPage('/' + slug.join('/') + '/');
  return page ? {title: page.title, description: page.description} : {};
}
export default async function Page({params}: Props) {
  const {slug} = await params;
  const page = getPage('/' + slug.join('/') + '/');
  if (!page) notFound();
  return <CandidateDocument page={page} />;
}
