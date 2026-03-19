require 'webrick'

dir = '/Users/varshini/Documents/Varshini/Otesha/Website/WebsiteCC1'

server = WEBrick::HTTPServer.new(
  Port: 8080,
  DocumentRoot: dir
)

trap('INT') { server.shutdown }
trap('TERM') { server.shutdown }

server.start
