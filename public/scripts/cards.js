(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  class Cards {
      constructor(selector) {
          if (!selector) {
              throw new Error('No selector provided');
          }
          this.$element = $(selector);
          if (this.$element.length === 0) {
              throw new Error('Could not find element with selector: ' + selector);
          }
      }
      addClickHandler(fn) {
          this.$element.on('click', 'input', function(event) {
              var email = event.target.value;
              fn(email)
                  .then(function() {
                      this.removeEntry(email);
                  }.bind(this));
          }.bind(this));
      }
      addEntry(playdate) {
          this.removeEntry(playdate.username);
          var entryElement = new Entry(playdate);
          this.$element.append(entryElement.$element);
      }
      removeEntry(username) {
          this.$element
          .find('[value="' + username + '"]')
          .closest('[create-playdate="cards"]')
          .remove();
      }
  }

  class Entry {
      constructor(playdate) {
          var $div = $('<div></div>', {
              'create-playdate': 'cards',
              'class': 'card'
          });

          var $label = $('<label></label>');

          var $cards = $('<input></input>', {
              type: 'button',
              class: "btn btn-outline-info btn-light btn-md",
              value: playdate.username
          });

          var description = 'Date: ' + playdate.date + '<br>';
          description += 'Time: ' + playdate.time + '<br>';
          description += 'Location: ' + playdate.location + '<br>';
          description += 'Animal: ' + playdate.animal + '<br>';
          description += 'Description: ' + playdate.description;

          $label.append($cards);
          $label.append(description);
          $div.append($label);

          this.$element = $div;
      }
  }

  App.Cards = Cards;
  window.App = App;
})(window);