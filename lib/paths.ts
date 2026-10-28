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
