module.exports=function(data, options) {
	var star="*";

	if (options.star)
		star=options.star;

	global.testPreprocessorCallCount++;

	for (className in data.classes) {
		classData=data.classes[className];

		classData.customtagPlusStar=classData.customtag+star;
	}
}
