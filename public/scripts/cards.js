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
        //kevin changed addClickHandler a little bit up here for button functionality
        addClickHandler(fn) {
            this.$element.on('click', 'input', function (event) {
                var input_total = event.target.value;
                console.log(input_total);
                var indentifier = input_total.substring(0, 1);
                console.log(indentifier);
                var id = input_total.substring(1);
                if (indentifier === "0") {
                    console.log("add")
                    fn(id)
                        .then(function () {
                            this.appendRow(id);
                        }.bind(this));
                }
                else if (indentifier === "1") {
                    alert("delete")
                    // removeRow does not work here
                    // fn(username)
                    //     .then(function () {
                    //         this.removeRow(username);
                    //     }.bind(this));
                }
            }.bind(this));
        }
        addEntry(playdate) {
            // this.removeRow(playdate.username);
            var entryElement = new Entry(playdate, this.selector, this.email);
            this.$element.append(entryElement.$element);
        }
        removeRow(id) {
            // removeRow does not work here
            this.$element
                .find('[value="' + id + '"]')
                .find('[value="' + id + '"]')
                .closest('[create-playdate="cards"]')
                .remove();
        }
        appendRow(id) {
            this.$element
                .find('[value="' + id + '"]')
                .closest('[create-playdate="cards"]')
                location.reload();
        }
    }

    class Entry {
        constructor(playdate, selector, email) {
            var $colHolder = $('<div class="col-6 my-1"></div>', {
                // 'class': 'col- my-1'
            });

            // in the joined dates, check if logged in user is in the joined group, or the only other person who joined. 
            if (selector == '[joined-playdate="cards"]' && ($.inArray(email, playdate.joined) > -1 || playdate.joined == email)) {
                
                var $cardHolder = $('<div></div>', {
                    'joined-playdate': 'cards',
                    'class': 'card'
                });

                var $centerHolder = $('<div></div>', {
                    'class': ''
                });

                // var $centerHolder = $('<div></div>', {
                //     'class': 'd-flex justify-content-center'
                // });

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
            } else if (selector == '[create-playdate="cards"]' && playdate.joined == '') {
                var $cardHolder = $('<div></div>', {
                    'create-playdate': 'cards',
                    'class': 'card bg-light text-center'
                });

                

                // var $centerHolder = $('<div></div>', {
                //     'class': ''
                // });

                // var $centerHolder = $('<div></div>', {
                //     'class': 'd-flex justify-content-center'
                // });

                // var $label = $('<label></label>');

                var $cardPicture = $('<img>', {
                    src: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
                    'class': 'card-img-top rounded-circle'
                });
                var $ch = $('<h5 class="card-header"></h5>');

                $ch.append(playdate.title);


                var $cb1 = $('<div class="card-body"></div>');
                var $cl = $('<ul></ul>', {
                    'class': 'list-group list-group-flush'
                });

                // var $pDate = $('<li class="list-group-item list-group-item-secondary"></li>');
                var $pDate = $('<li class="list-group-item"></li>');
                var $pTime = $('<li class="list-group-item"></li>');
                var $pLocation = $('<li class="list-group-item"></li>');
                var $pAnimal = $('<li class="list-group-item"></li>');
                var $pDescription = $('<li class="list-group-item"></li>');
                
                $pDate.append('<h5 class="mb-1">Date</h5>');
                $pDate.append(playdate.date);
                
                $pTime.append('<h5 class="mb-1">Time</h5>');
                $pTime.append(playdate.time);

                $pLocation.append('<h5 class="mb-1">Location</h5>');
                $pLocation.append(playdate.location);

                $pAnimal.append('<h5 class="mb-1">Animal</h5>');
                $pAnimal.append(playdate.animal);

                $pDescription.append('<h5 class="mb-1">Description</h5>');
                $pDescription.append(playdate.description);


                
                $cl.append($pDate);
                $cl.append($pTime);
                $cl.append($pLocation);
                $cl.append($pAnimal);
                $cl.append($pDescription);




                
                var $cb2 = $('<div class="card-body"></div>');

                var $addButton = $('<input></input>', {
                    type: 'checkbox',
                    value: "0" + playdate.id,
                    id: "flexCheckDefault"
                });

                // var $addSupportButton = $('<label>Join Playdate</label>', {
                //     class: "form-check-label",
                //     for: "flexCheckDefault"
                // });


                $cb2.append("Join Playdate: ");
                $cb2.append($addButton);

                $cb1.append($cardPicture);
                $cardHolder.append($ch);
                $cardHolder.append($cb1);
                $cardHolder.append($cl);
                $cardHolder.append($cb2);
                // $cardHolder.append($addSupportButton);
                
                $colHolder.append($cardHolder);
                
                


                // $colHolder.append($cardHolder);

                

                this.$element = $colHolder;

                

                // var $addButton = $('<input></input>', {
                //     type: 'button',
                //     class: "invisible btn btn-outline-info btn-light btn-md",
                //     value: "0" + playdate.username,
                // }, );

                // var $addSupportButton = $('<div><i class="fa fa-plus-square"></div>', {
                //     class: "btn btn-outline-info btn-light btn-md"
                // });

                // var $deleteButton = $('<input></input>', {
                //     type: 'button',
                //     class: "invisible btn btn-outline-info btn-light btn-md",
                //     value: "1" + playdate.username,
                // }, );

                // var $deleteSupportButton = $('<div><i class="fa fa-trash"></div>', {
                //     class: "btn btn-outline-info btn-light btn-md"
                // });

                // var info = 'Date: ' + playdate.date + '<br>';
                // info += 'Time: ' + playdate.time + '<br>';
                // info += 'Location: ' + playdate.location + '<br>';
                // info += 'Animal: ' + playdate.animal + '<br>';
                // info += 'Description: ' + playdate.description + '<br>';

                // $label.append(info);
                // $addSupportButton.append($addButton);
                // $deleteSupportButton.append($deleteButton);
                // $label.append($addSupportButton);
                // $label.append($deleteSupportButton);
                // $centerHolder.append($label);
                // $colHolder.append($cardHolder);
                // $cardHolder.append($centerHolder);
                // $cardHolder.append($cb1);
                // $cardHolder.append($cl);

                // this.$element = $colHolder;
            }
        }
    }

    App.Cards = Cards;
    window.App = App;
})(window);