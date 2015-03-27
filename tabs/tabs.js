$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data("content-tabs"));
  this.$activeTab = this.$contentTabs.find('.active');
  this.$el.on('click', 'a', this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function(event) {
  event.preventDefault();

  var $link = $(event.currentTarget);
  this.$el.find('a').removeClass('active');
  $link.addClass('active');

  this.$activeTab.removeClass('active').addClass('transitioning');
  this.$activeTab.one('transitionend', function(){
    this.$activeTab.removeClass('transitioning');
    this.$activeTab = this.$contentTabs.find($link.attr('href'));
    this.$activeTab.addClass('active transitioning');
    setTimeout(function(){
      this.$activeTab.removeClass('transitioning');
    }.bind(this), 0);
  }.bind(this));
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
