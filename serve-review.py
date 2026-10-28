from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
import argparse
parser=argparse.ArgumentParser(description='Serve the private Systead static review on loopback only.')
parser.add_argument('--port',type=int,default=4320)
args=parser.parse_args()
ROOT=Path('out').resolve()
if not (ROOT/'index.html').is_file():parser.error('out/index.html is missing; run npm run build first')
class H(SimpleHTTPRequestHandler):
 def __init__(self,*a,**k):super().__init__(*a,directory=str(ROOT),**k)
 def log_message(self,*a):pass
 def end_headers(self):self.send_header('X-Robots-Tag','noindex, nofollow');super().end_headers()
 def send_error(self,code,message=None,explain=None):
  page=ROOT/'404.html'
  if code==404 and page.is_file():
   body=page.read_bytes();self.send_response(404);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Content-Length',str(len(body)));self.end_headers()
   if self.command!='HEAD':self.wfile.write(body)
  else:super().send_error(code,message,explain)
 def list_directory(self,p):self.send_error(404);return None
print(f'Private loopback review on http://127.0.0.1:{args.port}',flush=True)
ThreadingHTTPServer(('127.0.0.1',args.port),H).serve_forever()
