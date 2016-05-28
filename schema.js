

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
		fieldName: String,
		rawData: double
	}
);
