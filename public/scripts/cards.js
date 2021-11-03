(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    class Cards {
        constructor(selector, auth) {
            if (!selector) {
                throw new Error('No selector provided');
            }
            this.$element = $(selector);
            if (this.$element.length === 0) {
                throw new Error('Could not find element with selector: ' + selector);
            }
            this.selector = selector;
            this.email = auth;
        }
        addClickHandler(fn) {
            this.$element.on('click', 'input', function (event) {
                var username = event.target.value;
                fn(username)
                    .then(function () {
                        this.appendRow(username);
                    }.bind(this));
            }.bind(this));
        }
        addEntry(playdate) {
            // this.removeRow(playdate.username);
            var entryElement = new Entry(playdate, this.selector, this.email);
            this.$element.append(entryElement.$element);
        }
        // removeRow(username) {
        //     this.$element
        //         .find('[value="' + username + '"]')
        //         .closest('[create-playdate="cards"]')
        //         .remove();
        // }
        appendRow(username) {
            console.log("linz: " + this.email)
            this.$element
                .find('[value="' + username + '"]')
                .closest('[create-playdate="cards"]')
                location.reload();
        }
    }

    class Entry {
        constructor(playdate, selector, email) {
            var $colHolder = $('<div class="col-12 my-1"></div>', {
                // 'class': 'col- my-1'
            });

            // in the joined dates, check if logged in user is in the joined group, or the only other person who joined. 
            if (selector == '[joined-playdate="cards"]' && ($.inArray(email, playdate.joined) > -1 || playdate.joined == email)) {
                
                var $cardHolder = $('<div></div>', {
                    'joined-playdate': 'cards',
                    'class': 'card'
                });

                var $centerHolder = $('<div></div>', {
                    'class': 'd-flex justify-content-center'
                });

                var $label = $('<label></label>');

                

                var info = 'Date: ' + playdate.date + '<br>';
                info += 'Time: ' + playdate.time + '<br>';
                info += 'Location: ' + playdate.location + '<br>';
                info += 'Animal: ' + playdate.animal + '<br>';
                info += 'Description: ' + playdate.description + '<br>';
                info += 'Joined: ' + playdate.joined + '<br>';

                
                $label.append(info);
                $centerHolder.append($label);
                $colHolder.append($cardHolder);
                $cardHolder.append($centerHolder);

                this.$element = $colHolder;
            } else if (selector == '[create-playdate="cards"]') {
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
                    class: "invisible btn btn-outline-info btn-light btn-md",
                    value: playdate.username,
                }, );

                var $addButton = $('<div><i class="fa fa-trash"></div>', {
                    class: "btn btn-outline-info btn-light btn-md"
                });

                var info = 'Date: ' + playdate.date + '<br>';
                info += 'Time: ' + playdate.time + '<br>';
                info += 'Location: ' + playdate.location + '<br>';
                info += 'Animal: ' + playdate.animal + '<br>';
                info += 'Description: ' + playdate.description + '<br>';

                $label.append(info);
                $addButton.append($deleteButton);
                $label.append($addButton);
                $centerHolder.append($label);
                $colHolder.append($cardHolder);
                $cardHolder.append($centerHolder);

                this.$element = $colHolder;
            }
        }
    }

    App.Cards = Cards;
    window.App = App;
})(window);