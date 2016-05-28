# keys for Twitter API connection
from TwitterAPI import TwitterAPI
import json
import numpy as np
import datetime
import fileinput

# Initialize globally used values 
curr_epoch = int(datetime.datetime.now().strftime("%s"))

def getProfileData(api, name):
	name = name.strip()
	user_data = {} #empty map for storing results
	# GET USER PROFILE DATA
	u = api.request('users/lookup', {'screen_name':name})
	for user_json in u.get_iterator():

		# create vector to represent this tweet
		tweet_array = np.empty([1, 6], dtype=int)

		# 0th element: number of followers
		user_data['followers_count'] = user_json['followers_count']

		# 1st element: number of people following ('friends')
		user_data['friends_count'] = user_json['friends_count']

		# 2nd element: age of account
		acct_creation_timestamp = user_json['created_at']
		datetime_creation = datetime.datetime.strptime(acct_creation_timestamp, "%a %b %d %H:%M:%S +0000 %Y")

		# get epoch time of current time and account creation time
		create_epoch = int(datetime_creation.strftime("%s"))

		# difference between current epoch time and creation time is added to vector--larger the difference, older the account
		epoch_diff = curr_epoch - create_epoch
		# convert epoch time into more understandable month unit.
		epoch_diff = epoch_diff / (60*60*24*30) # assuming avg of 30 days a month.
		user_data['acct_age'] = epoch_diff

		# 3rd and 4th element: extent of account customization. 
		user_data['default profile'] = user_json['default_profile']

		user_data['default_profile_image'] = user_json['default_profile_image']

		# 5th element: number of statuses
		user_data['statuses_count'] = user_json['statuses_count']

		# language data:
		user_data['lang'] = user_json['lang']

		# acct creation data
		user_data['acct_created_at'] = user_json['created_at']

		# location, if provided. compare timezone to location to verify
		user_data['location'] = user_json['location']
		user_data['timezone'] = user_json['time_zone']
	return user_data

def getTweetData(api, name):
	# ITERATE OVER USER'S TWEETS
	tweet_data = {} # dict to store user's aggregate tweet data
	t = api.request('statuses/user_timeline', {'screen_name':name, 'trim_user':'true', 'include_rts':'false', 'exclude_replies':'true'})
	tweet_count = 0;

	urls_per_tweet_count = 0.0
	tweets_w_urls_count = 0.0

	mentioned_users = {}
	mentions_per_tweet_count = 0.0
	tweets_w_mentions_count = 0.0

	tweet_data['tweet_timestamps'] = []

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
		tweet_data['tweet_timestamps'].append(tweet_timestamp)

	urls_per_tweet_count = urls_per_tweet_count/tweets_w_urls_count # calculate avg number of URLs in tweets that include URLs
	mentions_per_tweet_count = 	mentions_per_tweet_count/tweets_w_mentions_count # calculate avg number of menetions in tweets that include mentions

	tweet_data['tweets_w_urls_ct'] = tweets_w_urls_count
	tweet_data['tweets_w_mentions_ct'] = tweets_w_mentions_count
	tweet_data['mentioned_users'] = mentioned_users

	return tweet_data

def main():
	""" Given a Twitter handle, gathers information about a Twitter user (and their content) 
	relevant to heuristics used to capture social engineering attempts. """
	api = TwitterAPI("h40ja5iFqGxoFQkKBNRSw4uGR", "bAwqCcJLgSzsvsz2jHDEh3n0mJ8DqVu8BlL7XFw5OJ6U9X92T8", "392486664-w6aPezJUbQvT3Qd7fMd1WVIfrUROQe2EZEZnzaMp", "TRNWsKQwLd2VNqaZmpg7NeaxhMxPjjjdoPaifp1zFIkyI") #strings

	for name in fileinput.input():
		profileData = getProfileData(api, name)
		tweetData = getTweetData(api, name)

		# add tweetData to profileData
		profileData.update(tweetData)

		print profileData

if __name__ == "__main__":
	main()