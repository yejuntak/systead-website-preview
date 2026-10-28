import CandidateDocument from '@/components/CandidateDocument';
import {getPage} from '@/lib/pages';

export default function NotFound() {
  return <CandidateDocument page={getPage('/404/')!} />;
}
