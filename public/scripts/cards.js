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
        var $colHolder = $('<div class="col-6 my-1"></div>', {
          // 'class': 'col- my-1'
        });

          var $cardHolder = $('<div></div>', {
              'create-playdate': 'cards',
              'class': 'card'
          });

          var $centerHolder = $('<div></div>', {
            'class': 'd-flex justify-content-center'
        });

          var $label = $('<label></label>');

          var $deleteButton = $('<input></input>', {
              type: 'button',
              class: "btn btn-outline-info btn-light btn-md",
              value: playdate.username,
          });

          var info = 'Date: ' + playdate.date + '<br>';
          info += 'Time: ' + playdate.time + '<br>';
          info += 'Location: ' + playdate.location + '<br>';
          info += 'Animal: ' + playdate.animal + '<br>';
          info += 'Description: ' + playdate.description + '<br>';

          $label.append(info);
          $label.append($deleteButton);
          $centerHolder.append($label);
          $colHolder.append($cardHolder);
          $cardHolder.append($centerHolder);

          this.$element = $colHolder;
      }
  }

  App.Cards = Cards;
  window.App = App;
})(window);