# keys for Twitter API connection
from TwitterAPI import TwitterAPI
import json
import numpy as np
import datetime
import sys

import urllib3

# Initialize globally used values 
curr_epoch = int(datetime.datetime.now().strftime("%s"))

def getProfileData(api, name):
	name = name.strip()
	profile_data = {} #empty map for storing profile data
	activity_data = [] #empty map for storing twitter behavior data
	# GET USER PROFILE DATA
	u = api.request('users/lookup', {'screen_name':name})
	for user_json in u.get_iterator():
		profile_data['twitterHandle'] = user_json['screen_name']
		profile_data['name'] = user_json['name']

		# language data:
		profile_data['language'] = user_json['lang']

		# acct creation data
		profile_data['creationDate'] = user_json['created_at']

		# location, if provided. compare timezone to location to verify
		profile_data['location'] = user_json['location']
		profile_data['timezone'] = user_json['time_zone']

		# extent of account customization. 
		profile_data['defaultProfileBool'] = user_json['default_profile']
		profile_data['defaultAvatarBool'] = user_json['default_profile_image']

		# user image
		profile_data['profileImage'] = user_json['profile_image_url']

		# user description, personal homepage link
		profile_data['description'] = user_json['description']
		profile_data['website'] = user_json['url']

		# number of followers
		activity_data.append({
			'label': 'followersCount',
			'rawValue': user_json['followers_count']
		})
		# activity_data['followers_count'] = user_json['followers_count']

		# number of people following ('friends')
		# activity_data['friends_count'] = user_json['friends_count']
		activity_data.append({
			'label': 'friendsCount',
			'rawValue': user_json['friends_count']
		})


		# age of account
		acct_creation_timestamp = user_json['created_at']
		datetime_creation = datetime.datetime.strptime(acct_creation_timestamp, "%a %b %d %H:%M:%S +0000 %Y")

		# get epoch time of current time and account creation time
		create_epoch = int(datetime_creation.strftime("%s"))

		# difference between current epoch time and creation time is added to vector--larger the difference, older the account
		epoch_diff = curr_epoch - create_epoch
		# convert epoch time into more understandable month unit.
		epoch_diff = epoch_diff / (60*60*24*30) # assuming avg of 30 days a month.
		#activity_data['acct_age'] = epoch_diff
		activity_data.append({
			'label': 'accountAge',
			'rawValue': epoch_diff
		})

		# number of statuses
		#activity_data['statuses_count'] = user_json['statuses_count']
		activity_data.append({
			'label': 'statusesCount',
			'rawValue': user_json['statuses_count']
		})


		# Add activity_data as a field of user profile data.
		profile_data['activity_data'] = activity_data

	return profile_data

def getTweetData(api, name):
	# ITERATE OVER USER'S TWEETS
	tweet_data = [] # dict to store user's aggregate tweet data
	t = api.request('statuses/user_timeline', {'screen_name':name, 'trim_user':'true', 'include_rts':'false', 'exclude_replies':'true'})
	tweet_count = 0;

	urls_per_tweet_count = 0.0
	tweets_w_urls_count = 0.0

	mentioned_users = {}
	mentions_per_tweet_count = 0.0
	tweets_w_mentions_count = 0.0

	tweet_timestamps = []

	for item in t.get_iterator():
		tweet_count += 1
		tweet_json = json.dumps(item)
		tweet_json = json.loads(tweet_json)

		# counting number of URLS in tweet
		num_urls = len(tweet_json['entities']['urls'])
		if num_urls > 0:
			tweets_w_urls_count += 1
			urls_per_tweet_count += num_urls

		# counting user mentions, storing mentioned users 
		num_mentions = len(tweet_json['entities']['user_mentions'])
		if num_mentions > 0:
			for mention in tweet_json['entities']['user_mentions']:
				if mention['screen_name'] not in mentioned_users:
					mentioned_users[mention['screen_name']] = 0 
				mentioned_users[mention['screen_name']] += 1
			tweets_w_mentions_count += 1 
			mentions_per_tweet_count += num_mentions
		
		# store timestamp
		tweet_timestamp = tweet_json['created_at']
		tweet_datetime = datetime.datetime.strptime(tweet_timestamp, "%a %b %d %H:%M:%S +0000 %Y")

		# get epoch time of current time and account creation time
		tweet_epoch = int(tweet_datetime.strftime("%s"))

		tweet_timestamps.append(tweet_epoch)

	tweet_data.append({
		'label': 'tweet_timestamps',
		'rawValue': tweet_timestamps
	})
	tweet_data.append({
		'label': 'urls_per_tweet_count',
		'rawValue': urls_per_tweet_count/tweets_w_urls_count if tweets_w_urls_count > 0 else 0
	})

	# urls_per_tweet_count/tweets_w_urls_count # calculate avg number of URLs in tweets that include URLs
	# profileData['activity_data'].append({
	# 	'label': 'urls_per_tweet_count',
	# 	'rawValue': urls_per_tweet_count/tweets_w_urls_count
	# })

	tweet_data.append({
		'label': 'mentions_per_tweet_count',
		'rawValue': mentions_per_tweet_count/tweets_w_mentions_count if tweets_w_mentions_count > 0 else 0
	})
	# mentions_per_tweet_count/tweets_w_mentions_count # calculate avg number of menetions in tweets that include mentions
	# profileData['activity_data'].append({
	# 	'label': 'mentions_per_tweet_count',
	# 	'rawValue': mentions_per_tweet_count/tweets_w_mentions_count
	# })

	tweet_data.append({
		'label': 'tweets_w_urls_ct',
		'rawValue': tweets_w_urls_count
	})
	# tweets_w_urls_count
	# profileData['activity_data'].append({
	# 	'label': 'tweets_w_urls_ct',
	# 	'rawValue': tweets_w_urls_count
	# })

	tweet_data.append({
		'label': 'tweets_w_mentions_ct',
		'rawValue': tweets_w_mentions_count
	})

	#tweets_w_mentions_count
	# profileData['activity_data'].append({
	# 	'label': 'tweets_w_mentions_ct',
	# 	'rawValue': tweets_w_mentions_count
	# })

	tweet_data.append({
		'label': 'mentioned_users',
		'rawValue': mentioned_users
	})


	return tweet_data

def main():
	urllib3.disable_warnings()
	""" Given a Twitter handle, gathers information about a Twitter user (and their content) 
	relevant to heuristics used to capture social engineering attempts. """
	api = TwitterAPI("h40ja5iFqGxoFQkKBNRSw4uGR", "bAwqCcJLgSzsvsz2jHDEh3n0mJ8DqVu8BlL7XFw5OJ6U9X92T8", "392486664-w6aPezJUbQvT3Qd7fMd1WVIfrUROQe2EZEZnzaMp", "TRNWsKQwLd2VNqaZmpg7NeaxhMxPjjjdoPaifp1zFIkyI") #strings

	name = sys.argv[1]
	if len(name) == 0:
		print "null"
	profileData = getProfileData(api, name)
	tweetData = getTweetData(api, name)


	# add tweetData to profileData
	# profileData['activity_data'].append(tweetData)
	
	for item in tweetData:
		if item['label'] == 'tweet_timestamps':
			profileData['tweet_timestamps']= item['rawValue']
		elif item['label'] == 'mentioned_users':
			profileData['mentioned_users']= item['rawValue']
		else: 
		# print item
			profileData['activity_data'].append(item)


	print json.dumps(profileData)
	#return json.dumps(profileData)

if __name__ == "__main__":
	main()