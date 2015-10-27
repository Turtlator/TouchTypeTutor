(function () {
	angular
		.module('typer')
		.factory('typeTimer', typeTimer);

	typeTimer.$inject = ['$rootScope', '$interval'];

	function typeTimer($rootScope, $interval) {

		return service();

		function service() {
			$rootScope.$on('keyDown', function (keyCode) {
				if (started) return;

				start();
			});

			$rootScope.$on('finish', function () {
				stop();
			})
			
			return {
				start: start,
				stop: stop,
				reset: reset,
				getSeconds: getSeconds
			};
		}

		var started;
		var finished;
		var interval;
		
		function startInterval() {
			interval = $interval(function(){
				var seconds = getSeconds();
				$rootScope.$broadcast('updateTimer', seconds);
			}, 100);
		}
		
		function stopInterval() {
			if(!interval) return;
			
			$interval.cancel(interval);
			interval = null;
		}

		function start() {
			started = new Date();
			startInterval();
			finished = null;
		}

		function stop() {
			finished = new Date();
			stopInterval();
		}

		function reset() {
			started = null;
			finished = null;
			stopInterval();
		}

		function getSeconds() {
			if (!started) return 0;

			if (!finished)
				return (new Date() - started) / 1000;

			return (finished - started) / 1000;
		}

	}
})();