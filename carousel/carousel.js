$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.$imgs = this.$el.find('.items img');
  this.$imgs.eq(this.activeIdx).addClass('active');
  this.transitioning = false;
  this.$el.find('.slide-right').on('click', this.slide.bind(this, -1));
  this.$el.find('.slide-left').on('click', this.slide.bind(this, 1));
};

$.Carousel.prototype.slide = function (dir, event) {
  if (this.transitioning)
    return;
  this.transitioning = true;

  var oldImg = this.$imgs.eq(this.activeIdx);
  this.activeIdx = (this.activeIdx + dir) % (this.$imgs.length);
  var activeImg = this.$imgs.eq(this.activeIdx);

  console.log(this.activeIdx);
  (dir === 1) ? oldImg.addClass('right') : oldImg.addClass('left');
  oldImg.one('transitionend', function() {
    oldImg.removeClass('active left right');
    this.transitioning = false;
  }.bind(this));

  (dir === 1) ? activeImg.addClass('left') : activeImg.addClass('right');
  activeImg.addClass('active');
  setTimeout(function(){
    activeImg.removeClass('left right');
  }, 0);

};


$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
