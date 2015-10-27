(function(){
	angular
		.module('typer')
		.factory('results',resultsService);

	resultsService.$inject = ['levenshtein', 'typeTimer'];
			
	function resultsService(levenshtein, typeTimer){
		var service = {
			getResults: getResults
		}
		
		return service;
		
		function getResults(prompt, typed) {
			var distance = levenshtein.distance(prompt, typed);
			var size = Math.max(prompt.length, typed.length);
			var accuracy = (size - distance) / size * 100;
			var wordCount = typed.length / 5;
			var seconds = typeTimer.getSeconds();
			var wpm = (wordCount / seconds) * 60;
			
			return {
				accuracy: accuracy,
				wpm: wpm
			}
		}
	}
})();