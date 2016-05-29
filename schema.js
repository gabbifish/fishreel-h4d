

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
		analysisFields: [analysisFieldsSchema],
		tweetsOverTime: [double],
		mentionedUsers: [mentionedUserSchema]
	}
);

var analysisFieldsSchema = new mongoose.Schema(
	{
		label: String,
		description: String,
		rawValue: double,
		valueAsPercentile: double
	}
);

var mentionedUserSchema = new mongoose.Schema(
	{
		twitterHandle: String,
		frequency: int
	}
);
