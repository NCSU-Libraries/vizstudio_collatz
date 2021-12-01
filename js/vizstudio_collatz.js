function VizStudioCollatz(options) {
  options ||= {};
  this.root = document.querySelector('#vizstudio');
  this.zoneWrapper = this.root.querySelector('.zone-wrapper');
  this.interval = options['interval'] || 800;
  this.zones = this.zoneWrapper.querySelectorAll('.zone');
  this.keys = Array.from({length: this.zones.length}, (x, i) => i);
  this.images = [];
  this.oddImages = ['blue1.png','blue2.png','blue3.png'];
  this.evenImages = ['pink3.png','pink2.png','pink1.png'];
  this.oddImageKey = 0;
  this.evenImageKey = 0;
  this.snakeLength = this.images.length
  this.imageKey = 0;  
  this.nextInKey = 1;
  this.nextOutKey = 2;
  this.lastInKey = this.keys.length - 1;
  this.count = 0;
  this.collatzRoot = 1;
  this.collatzNum = 1;
  this.prevCollatzNum = 1;
  this.i = 0;
  this.started = false;
  this.initializeAudio();
  this.initialize();
  this.enableKeyboardConrol();
}

VizStudioCollatz.prototype.initialize = function() {
  for (i=0; i < this.zones.length; i++) {
    var zone = this.zones[i];
    removeAllChildNodes(zone);
    var wrapper = generateElement('div',['wrapper','to-fade-in']);
    zone.appendChild(wrapper);
  }
  this.zoneWrapper.style.opacity = 1;
}

VizStudioCollatz.prototype.initializeAudio = function() {
  this.audioStart = document.querySelector('audio#audio-start');
  this.audioUp = document.querySelector('audio#audio-up');
  this.audioDown = document.querySelector('audio#audio-down');
  this.audio4 = document.querySelector('audio#audio-4');
  this.audio2 = document.querySelector('audio#audio-2');
  this.audio1 = document.querySelector('audio#audio-1');
}

VizStudioCollatz.prototype.incrementKeys = function() {
  this.setNextInKey();
  this.setImageKey();
  this.setNextOutKey();
  this.count++;
  this.i++;
}

VizStudioCollatz.prototype.setNextInKey = function() {
  this.nextInKey = (this.nextInKey + 1) % this.keys.length;
}

VizStudioCollatz.prototype.incrementOddImageKey = function() {
  this.oddImageKey = (this.oddImageKey + 1) % this.oddImages.length
}

VizStudioCollatz.prototype.incrementEvenImageKey = function() {
  this.evenImageKey = (this.evenImageKey + 1) % this.evenImages.length;
}

VizStudioCollatz.prototype.setNextOutKey = function() {
  this.nextOutKey = (this.nextOutKey + 1) % this.keys.length;
}

VizStudioCollatz.prototype.setImageKey = function() {
  this.imageKey = (this.imageKey + 1) % this.images.length;
}

VizStudioCollatz.prototype.setCollatzNum = function() {
  this.prevCollatzNum = this.collatzNum;
  if (this.collatzNum == 1) {
    this.collatzNum = 0;
  }
  if (this.collatzNum % 2 == 0) {
    this.collatzNum = this.collatzNum / 2;
  }
  else {
    this.collatzNum = (this.collatzNum * 3) + 1;
  }
}

VizStudioCollatz.prototype.collatzReset = function() {
  this.incrementCollatzRoot();
  this.i = 0;
  this.collatzNum = this.collatzRoot;
}


VizStudioCollatz.prototype.incrementCollatzRoot = function() {
  // this.collatzRoot = (this.collatzRoot >= 100) ? 1 : this.collatzRoot + 1;
  this.collatzRoot++;
}

VizStudioCollatz.prototype.advance = function() {
  console.log(this.collatzRoot);

  var _this = this;
  var nextIn = this.zones[this.nextInKey];
  var nextOut = this.zones[this.nextOutKey];
  var wrapperIn = nextIn.querySelector('.wrapper');
  var wrapperOut = nextOut.querySelector('.wrapper');

  if (this.collatzNum == 0) {
    return;
  }
  else {
    var image;
    if (this.collatzNum % 2 == 0) {
      image = this.evenImages[this.evenImageKey];
      this.incrementEvenImageKey();
    }
    else {
      image =  this.oddImages[this.oddImageKey];
      this.incrementOddImageKey()
    }

    var imageUrl = 'media/images/' + image;
    var labelText = 'n=' + this.collatzRoot + ', i=' + this.i;
    var label = htmlToElement('<div class="label">' + labelText + '</div>');

    wrapperIn.innerHTML = '<p>' + this.collatzNum + '</p>';
    wrapperIn.style.backgroundImage = "url('" + imageUrl + "')";
    wrapperIn.appendChild(label);

    this.playSound(this.prevCollatzNum);

    fadeOut(wrapperOut, Math.floor(this.interval * 0.5));
    fadeIn(wrapperIn, Math.floor(this.interval * 0.7));

    this.setCollatzNum();
    this.incrementKeys();
  }
}


VizStudioCollatz.prototype.playSound = function(collatzNum) {
  if (this.collatzNum == 4) {
    player = this.audio4;
  }
  else if (this.collatzNum == 2) {
    player = this.audio2;
  }
  else if (this.collatzNum == 1) {
    player = this.audio1;
  }
  else if (this.i == 0) {
    player = this.audioStart; 
  }
  else if (this.prevCollatzNum % 2 == 0) {
    player = this.audioDown;
  }
  else {
    player = this.audioUp;
  }
  player.currentTime = 0;
  player.play();
}


VizStudioCollatz.prototype.start = function() {
  var _this = this;
  this.nextInKey = 0;
  this.nextOutKey = 1;
  this.advance();

  var timer = setInterval(function () {
    if (_this.collatzNum == 0) {
      clearInterval(timer);
      _this.restart();
    }
    else {
      _this.advance();
    }
  }, this.interval);
  this.started = true;
}


VizStudioCollatz.prototype.restart = function() {
  var _this = this;
  var wrappers = document.querySelectorAll('.wrapper');
  var index_last = wrappers.length - 1;

  function visible(value) {
    element.style.opacity > 0;
  }

  function reset() {
    _this.initialize();
    _this.nextInKey = 0;
    _this.nextOutKey = 1;
    _this.collatzReset();
    _this.start();
  }

  function wipe(index,i) {
    i ||= 0;
    var wrapper = wrappers[index];
    var nextIndex = (index + 1) % (wrappers.length);

    if (wrapper.style.opacity < 0.1 && (index < index_last)) {
      i++;
      wipe(nextIndex,i);
    }
    else {
      fadeOut(wrapper,200,function() {
        if (i < wrappers.length - 1) {
          i++;
          wipe(nextIndex, i);
        }
        else {
          reset();
        }
      });
    }
  }

  setTimeout(function() {
    wipe(_this.nextInKey);
  }, 500);
}


VizStudioCollatz.prototype.enableKeyboardConrol = function() {
  var _this = this;
  document.addEventListener('keydown', function(event) {
    if (!_this.started) {
      _this.start();
    }
  });
}

