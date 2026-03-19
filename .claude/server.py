import os, sys
os.chdir("/Users/varshini/Documents/Varshini/Otesha/Website/WebsiteCC1")
from http.server import HTTPServer, SimpleHTTPRequestHandler
HTTPServer(("", 8080), SimpleHTTPRequestHandler).serve_forever()
