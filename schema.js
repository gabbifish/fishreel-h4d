

var userProfileSchema = new mongoose.Schema(
	{
		twitterHandle: String,
		userID: mongoose.Schema.Types.ObjectId,
		firstName: String,
		lastName: String,
		description: String,
		location: String,
		website: String,
		creationDate: Date,
		profileImage: String,
		analysisFields: [analysisFieldsSchema]
	}
);

var analysisFieldsSchema = new mongoose.Schema(
	{
		fieldName: String,
		fieldExplanation: String,
		chartType: String,
		rawData: 
	}
);


var analysisFieldsSchema = new mongoose.Schema(
	{
		fieldName: String,
		fieldExplanation: String,
		chartType: String,
		rawData: 
	}
);