
$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$gutterImages = this.$el.find('.gutter-images');
  this.gutterIdx = 0;
  this.$images = this.$gutterImages.find('img');
  this.$activeImg = this.$images.eq(0);
  this.activate(this.$activeImg);

  this.fillGutterImages();

  this.$gutterImages.on('click', 'img', function(event) {
    this.$activeImg = $(event.currentTarget);
    this.activate(this.$activeImg);
  }.bind(this));

  this.$gutterImages.on('mouseenter', 'img', function(event) {
    var $img = $(event.currentTarget);
    this.activate($img);
  }.bind(this));

  this.$gutterImages.on('mouseleave', 'img', function(event) {
    this.activate(this.$activeImg);
  }.bind(this));

  this.$el.find('.nav-left').on('click', function(event) {
    this.gutterIdx = Math.max(this.gutterIdx - 1, 0);
    this.fillGutterImages();
  }.bind(this));

  this.$el.find('.nav-right').on('click', function(event) {
    this.gutterIdx = Math.min(this.gutterIdx + 1, this.$images.length - 5);
    this.fillGutterImages();
  }.bind(this));

};

$.Thumbnails.prototype.activate = function ($img) {
  var clone = $img.clone();
  $('.active').html(clone);
};

$.Thumbnails.prototype.fillGutterImages = function ($img) {
  var $viewed = this.$images.slice(this.gutterIdx, this.gutterIdx + 5);
  this.$gutterImages.html($viewed);
};


$.fn.thumbnails = function(){
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
