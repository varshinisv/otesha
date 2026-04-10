import os, http.server, socketserver

os.chdir("/Users/varshini/Documents/Varshini/Otesha/Website/WebsiteCC1")

handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", 8080), handler) as httpd:
    print("Serving on port 8080")
    httpd.serve_forever()
