

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
		description: String, // this is supposed to be for units?
		rawValue: double,
		// reconsider valueAsPercentile, slightly larger impl lift than I expected
		valueAsPercentile: double
	}
);

var mentionedUserSchema = new mongoose.Schema(
	{
		twitterHandle: String,
		frequency: int
	}
);
