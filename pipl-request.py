#!/usr/bin/python
import sys
from piplapis.search import SearchAPIRequest
from piplapis.search import SearchAPIError

# def main():
query_username = sys.argv[1]
print query_username
request = SearchAPIRequest(api_key=u'CONTACT-DEMO-dxdgqz8atsyeoah3xmxbdd9l', username=unicode(query_username))
print request
try:
    response = request.send()
    print response.person
    # return response
except SearchAPIError as e:
	print e.http_status_code, e
    # return e.http_status_code, e