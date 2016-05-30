#!/usr/bin/python
import sys
import json
from piplapis.search import SearchAPIRequest
from piplapis.search import SearchAPIError

#api_key=u'COMMUNITY-s20idwagbdiijrrjsmzhq320', username=unicode(query_username)

def query(query_username):
	request = SearchAPIRequest(api_key=u'COMMUNITY-s20idwagbdiijrrjsmzhq320', username=unicode(query_username))
	try:
		response = request.send()
		print response.to_dict()
	except SearchAPIError as e:
		print e

query(sys.argv[1])