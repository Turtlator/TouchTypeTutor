(function () {
	angular
		.module('typer')
		.factory('prompt', prompt);

	function prompt() {
		var service = function () {
			setLines();
			current = 0;
			return {
				nextLine: nextLine
			}
		}

		return service();

		var current = 0;
		var lines = [];

		function nextLine() {
			//I know you could get to the end of the lines and hit an error, 
			//but good luck typing all of "the cat in the hat" for a typing challenge
			var response = lines[current];

			current++;

			return response;
		}

		function setLines() {
			lines = [
				'The sun did not shine. It was too wet to play.',
				'So we sat in the house all that cold, cold, wet day.',
				'I sat there with Sally. We sat there, we two.',
				'And I said, “How I wish we had something to do!”',
				'Too wet to go out and too cold to play ball.',
				'So we sat in the house. We did nothing at all.',
				'So all we could do was to: Sit! Sit! Sit! Sit!',
				'And we did not like it. Not one little bit.',
				'And then something went BUMP!',
				'How that bump made us jump!',
				'We looked! Then we saw him step in on the mat!',
				'We looked! And we saw him! The Cat in the Hat!',
				'And he said to us, “Why do you sit there like that?”',
				'“I know it is wet and the sun is not sunny.',
				'But we can have lots of good fun that is funny!” ',
				'“I know some good games we could play,” Said the cat.',
				'“I know some new tricks,” Said the Cat in the Hat. ',
				'“A lot of good tricks. I will show them to you.',
				'Your mother will not mind at all if I do.”',
				'Then Sally and I did not know what to say.',
				'Our mother was out of the house for the day.',
				'But our fish said, “No! No! Make that cat go away!',
				'Tell that Cat in the Hat you do NOT want to play.',
				'He should not be here. He should not be about.',
				'He should not be here when your mother is out!”',
				'“Now! Now! Have no fear. Have no fear!” said the cat.',
				'“My tricks are not bad,” Said the Cat in the Hat.',
				'“Why, we can have lots of good fun, if you wish,',
				'With a game that I call UP-UP-UP with a fish!”',
				'“Put me down!” said the fish. “This is no fun at all!"',
				'"Put me down!” said the fish. “I do NOT wish to fall!”',
				'“Have no fear!” said the cat. “I will not let you fall.',
				'I will hold you up high as I stand on a ball.',
				'With a book on one hand! And a cup on my hat!',
				'But that is not ALL I can do!’ Said the cat.'
			];
		}
	}
})();