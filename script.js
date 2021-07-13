if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/sw.js', {
			scope: ''
		}).then(function(registration) {
			// Registration was successful
			log('Service worker registration successful with scope: ' + registration.scope);

			// Update
			document.getElementById('updatesw').onclick = function() {
				registration.update();
				log('Attempting service worker update, you may need to reload the page.')
			}
		}, function(err) {
			// Registration failed
			log('Service worker registration failed: ' + err);
		});
	});
}

function log(message) {
	document.getElementById('log').innerHTML += message + '<br />';
}

// Sample posts
var posts = ['example', 'hello', 'rickroll'];

posts.forEach(function(post) {
	let node = document.createElement('li');
	let textnode = document.createTextNode(post);

	let a = document.createElement('a');
	a.href = '/posts/' + post + '.html';
	a.appendChild(textnode);

	node.appendChild(a);
	document.getElementById('posts').appendChild(node);
});