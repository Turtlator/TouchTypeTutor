(function () {
	angular
		.module('typer')
		.controller('shell', shell);

	shell.$inject = ['$rootScope', 'typeTimer', 'results', '$timeout', 'prompt', 'focus'];

	function shell($rootScope, typeTimer, resultService, $timeout, prompt, focus) {
		var vm = this;

		vm.typed = "";
		vm.prompt = "";
		vm.showTyper = false;
		vm.timer = 0
		vm.cheat = false;
		vm.accuracy = "";
		vm.wpm = "";
		vm.completed = [];
		
		vm.start = start;
		
		function start() {
			vm.prompt = prompt.nextLine();
			vm.typed = "";
			vm.timer = 0;
			vm.accuracy = "";
			vm.wpm = "";
			vm.cheat = false;

			typeTimer.reset();
			showNext(true);
			
			vm.showTyper = true;
			focus('typed');
		}
		
		$rootScope.$on('updateTimer', function(event, seconds){
			vm.timer = seconds;
		});
		
		$rootScope.$on('keyDown', function (event, char) {
			showNext();
		});

		$rootScope.$on('finish', function() {
			var results = resultService.getResults(vm.prompt, vm.typed);
			
			vm.accuracy = results.accuracy;
			vm.wpm = results.wpm;
			
			vm.completed.unshift({
				prompt: vm.prompt,
				typed: vm.typed,
				accuracy : vm.accuracy,
				wpm: vm.wpm,
				timer: vm.timer
			});
			
			start();
		});
		
		var showNext = function (first) {
			if (first) {
				vm.nextChar = vm.prompt.charAt(0);
				return;
			}
			
			if (vm.prompt.length <= vm.typed.length + 1){
				vm.nextChar = "<enter>";
				return;
			}
			
			var next = vm.prompt.charAt(vm.typed.length + 1);

			if (next === " ")
				vm.nextChar = "<space>";
			else
				vm.nextChar = next;
		}
		
		function cheater(){
			vm.cheat = true;
			
			$timeout(function(){
				vm.cheat = false;
			}, 1000);
		};
		
		vm.keyDown = function (event) {
			//Backspace is cheating!
			if (event.keyCode === 8) {
				event.preventDefault();
				cheater();
				return;
			}
				
			//Ignore shift
			if (event.keyCode === 16)
				return;

			if (event.keyCode === 13){
				$rootScope.$broadcast("finish");
				return;
			}
				
			$rootScope.$broadcast("keyDown", event.keyCode);
		};

	}
})();