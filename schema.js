

var userProfileSchema = new mongoose.Schema(
	{
		twitterHandle: String,
		userID: mongoose.Schema.Types.ObjectId,
		name: String,
		description: String,
		location: String,
		timezone: String,
		website: String,
		creationDate: Date,
		profileImage: String,
		language: String,
		defaultProfile: boolean,
		defaultAvatar: boolean,
		analysisFields: [analysisFieldsSchema]
	}
);

var analysisFieldsSchema = new mongoose.Schema(
	{
		followersCount: double,
		followingCount: double,
		accountAge: double,
		statusCount: double,
		tweetsWithURLsCount: double,
		avgURLCountPerTweet: double,
		tweetsWithMentionsCount: double,
		avgMentionCountPerTweet: double,
		mentionedUsers: [mentionedUserSchema],
		tweeetsOverTime: [double]
	}
);

var mentionedUserSchema = new mongoose.Schema(
	{
		twitterHandle: String,
		frequency: int
	}
);
