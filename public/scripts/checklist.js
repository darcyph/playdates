(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    class CheckList {
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
                        this.removeRow(email);
                    }.bind(this));
            }.bind(this));
        }
        addRow(playdate) {
            this.removeRow(playdate.username);
            var rowElement = new Row(playdate);
            this.$element.append(rowElement.$element);
        }
        removeRow(username) {
            this.$element
            .find('[value="' + username + '"]')
            .closest('[create-playdate="checkbox"]')
            .remove();
        }
    }

    class Row {
        constructor(playdate) {
            var $div = $('<div></div>', {
                'create-playdate': 'checkbox',
                'class': 'checkbox'
            });

            var $label = $('<label></label>');

            var $checkbox = $('<input></input>', {
                type: 'checkbox',
                value: playdate.username
            });

            var description = 'Date: ' + playdate.date + '<br>';
            description += 'Time: ' + playdate.time + '<br>';
            description += 'Location: ' + playdate.location + '<br>';
            description += 'Description: ' + playdate.description;

            $label.append($checkbox);
            $label.append(description);
            $div.append($label);

            this.$element = $div;
        }
    }

    App.CheckList = CheckList;
    window.App = App;
})(window);