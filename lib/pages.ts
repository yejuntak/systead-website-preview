import records from '@/content/pages.json';

export type CandidatePage = {
  route: string;
  title: string;
  description: string;
  styles: string[];
  scripts: string[];
  bodyClass: string;
  bodyAttributes: Record<string, string | undefined>;
  html: string;
};

export const pages: CandidatePage[] = records;
export function getPage(route: string): CandidatePage | undefined {
  return pages.find(page => page.route === route);
}
