function fadeIn(element, duration, callback) {
  fade('in',element, duration, callback);
}

function fadeOut(element, duration, callback) {
  fade('out',element, duration, callback);
}

function fade(direction, element, duration, callback) {
  duration ||= 1000;
  duration = duration < 20 ? 20 : duration;
  direction = (direction == 'in') ? 'in' : 'out';
  var opacityInterval = 0.05;
  var stepInterval = Math.ceil(duration / 20);
  var op = (direction == 'in') ? 0 : 1;  // initial opacity
  
  element.style.display = 'block';

  var timer = setInterval(function () {
    
    if ((direction == 'in' && op >= 1) || (direction == 'out' && op <= 0)) {
      clearInterval(timer);
      executeCallback(callback, element);
    }

    element.style.opacity = op;
    // element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op = (direction == 'in') ? (op + opacityInterval) : (op - opacityInterval);

  }, stepInterval);
}



// DOM

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}


function generateElement(name, classes) {
  var el = document.createElement(name);
  if (typeof classes == 'string') {
    classes = [ classes ];
  }
  if (classes) {
    classes.forEach(function(c) { el.classList.add(c) });
  }
  return el;
}


// Media

function playPause(element) {
  if (element) {
    if (element.classList.contains('paused')) {
      element.play();
      element.classList.remove('paused');
    }
    else {
      element.pause();
      element.classList.add('paused');
    }
  }
}


function play(element) {
  if (element) {
    element.play();
    if (element.classList.contains('paused')) {
      element.classList.remove('paused');
    }
  }
}


function pause(element) {
  if (element) {
    element.pause();
    if (!element.classList.contains('paused')) {
      element.classList.add('paused');
    }
  }
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function executeCallback(callback) {
  if (typeof callback !== 'undefined') {
    callback();
  }
}

function increment(value,max) {
  return (value >= max) ? 0 : (value + 1);
}
