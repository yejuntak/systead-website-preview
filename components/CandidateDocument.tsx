import type {CandidatePage} from '@/lib/pages';
import Bootstrap from './Bootstrap';
import {localPath, pageMarkup, versionedAsset} from '@/lib/paths';

/** Build-time, locally authored and hash-recorded HTML; never remote/user input. */
export default function CandidateDocument({page}: {page: CandidatePage}) {
  return <>
    {page.styles.map((href, index) => <link key={href} rel="stylesheet" href={localPath(versionedAsset(href))} precedence={'candidate-' + index} />)}
    <div className="candidate-document" dangerouslySetInnerHTML={{__html: pageMarkup(page.html)}} />
    <Bootstrap sources={page.scripts.map(source => localPath(versionedAsset(source)))} bodyClass={page.bodyClass} bodyAttributes={page.bodyAttributes} />
  </>;
}
