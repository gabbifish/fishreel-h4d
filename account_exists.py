# keys for Twitter API connection
from TwitterAPI import TwitterAPI
import json
import numpy as np
import datetime
import sys

def main():
	""" Given a Twitter handle, checks if a given twitter user exists"""
	api = TwitterAPI("D7moPjDYBt2js6KoASfBw9lPD", "h3jFuIxgtwd0NCIZtpKm2rEWf7pJO0qmYvKyLk3mOdeVGqMeQV", "392486664-PhilvAQafk5pG4GzBtAeck2zezABYYwWBs2BF57I", "EfLburVhhDaC5h70H42Atr3DseLYouoqm847HMyBgpilA") #strings

	name = sys.argv[1]
	if len(name) == 0:
		print "null"
	name = name.strip()
	# GET USER PROFILE DATA
	u = api.request('users/lookup', {'screen_name':name})
	for user_json in u.get_iterator():
		print(u)

if __name__ == "__main__":
	main()