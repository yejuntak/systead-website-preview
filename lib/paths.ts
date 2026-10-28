import assets from '@/PUBLIC_ASSET_MANIFEST.json';

export const basePath = process.env.SITE_BASE_PATH || '';
export function localPath(path: string): string {
  return path.startsWith('/') && !path.startsWith('//') ? basePath + path : path;
}
export function pageMarkup(html: string): string {
  if (!basePath) return html;
  return html.replace(/\b(href|src|poster)=(['"])\/(?!\/)/g, '$1=$2' + basePath + '/')
    .replace(/(srcset=['"])([^'"]+)(['"])/g, (_match, start: string, set: string, end: string) =>
      start + set.replace(/(^|,\s*)\/(?!\/)/g, '$1' + basePath + '/') + end);
}

/** Version authored runtime assets by their source bytes, so a Pages update does
 * not combine new markup with a browser-cached older CSS or interaction file. */
const assetVersions = new Map(assets.map(asset => [
  '/' + asset.path.replace(/^public\//, ''), asset.sha256.slice(0, 16)
] as const));
export function versionedAsset(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const url = new URL(path, 'https://systead.invalid');
  if (!/\.(css|js)$/.test(url.pathname)) return path;
  const version = assetVersions.get(url.pathname);
  if (!version) return path;
  url.searchParams.set('v', version);
  return url.pathname + url.search + url.hash;
}
