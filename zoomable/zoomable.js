
$.Zoomable = function (el) {
  this.$el = $(el);
  this.boxSize = 35;
  this.$el.on('mouseenter', this.showFocusBox.bind(this));
  this.$el.on('mouseleave', this.removeFocusBox.bind(this));
  this.$img = this.$el.find('img');
  var original = new Image();
  original.src = this.$original.attr('src');
  original.onload = function() {
    this.imgWidth = original.width;
  }.bind(this);
};

$.Zoomable.prototype.showFocusBox = function (event) {
  console.log('in');
  this.$focusBox = $('<div/>', {class: 'focus-box'});
  this.$focusBox.css('width', this.boxSize);
  this.$focusBox.css('height', this.boxSize);
  this.$el.append(this.$focusBox);


  this.$el.mousemove(function(event) {

    var xPos = event.clientX - this.boxSize/2;
    var yPos = event.clientY - this.boxSize/2;
    xPos = Math.max(Math.min(xPos, this.$img.width() - this.boxSize), 0);
    yPos = Math.max(Math.min(yPos, this.$img.height() - this.boxSize), 0);
    this.$focusBox.css('left', xPos);
    this.$focusBox.css('top', yPos);

    this.removeZoom();
    this.showZoom(xPos * this.scaleFactor(), yPos * this.scaleFactor());
  }.bind(this));
};

$.Zoomable.prototype.scaleFactor = function () {
  return this.imgWidth / this.$img.width();
};

$.Zoomable.prototype.removeFocusBox = function (event) {
  this.$focusBox.remove();
  this.removeZoom();
  this.$el.off('mousemove');
};

$.Zoomable.prototype.showZoom = function (xDiff, yDiff) {
  var $zoomedImg = $('<img/>', { class: 'zoomed-image' });

  $('body').append($zoomedImg);

  var size = this.scaleFactor() * this.boxSize;
  var backgroundPos = -Math.floor(xDiff) + "px "+ -Math.floor(yDiff) + "px";
  $zoomedImg.css('background-image', "url('"+this.$img.attr('src')+"')");
  $zoomedImg.css('height', size);
  $zoomedImg.css('width', size);
  $zoomedImg.css('background-position', backgroundPos);
};

$.Zoomable.prototype.removeZoom = function () {
  $('.zoomed-image').remove();
};

$.fn.zoomable = function(){
  return this.each(function () {
    new $.Zoomable(this);
  });
};
