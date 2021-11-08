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
                    'create-playdate': 'cards',
                    'class': 'card text-center'
                });

                var playdateImage = "";
                switch (playdate.animal) {
                    case "Dog":
                        playdateImage = "images/dog.png";
                        break;
                    case "Cat":
                        playdateImage = "images/cat.png";
                        break;
                    case "Rabbit":
                        playdateImage = "images/rabbit.png";
                        break;
                    case "Guinea Pig":
                        playdateImage = "images/guinea-pig.png";
                        break;
                    case "Bird":
                        playdateImage = "images/bird.png";
                        break;
                    case "Monkey":
                        playdateImage = "images/monkey.png";
                        break;
                    default:
                        playdateImage = "images/dog.png";
                }

                var $cardPicture = $('<img>', {
                    src: playdateImage,
                    style: "max-width:50%;",
                    'class': 'card-img-top rounded-circle shadow-lg'
                });
                var $ch = $('<h5 class="card-header"></h5>');

                $ch.append(playdate.title);


                var $cb1 = $('<div class="card-body"></div>');
                var $cl = $('<ul></ul>', {
                    'class': 'list-group list-group-flush'
                });

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
                
                var $cb2 = $('<div></div>', {
                    'class': 'card-body bg-success'
                });

                var $joinedText = $('<h5 class="mb-1">Joined</h5>');

                $cb2.append($joinedText);

                $cb1.append($cardPicture);
                $cardHolder.append($ch);
                $cardHolder.append($cb1);
                $cardHolder.append($cl);
                $cardHolder.append($cb2);
                
                $colHolder.append($cardHolder);

                this.$element = $colHolder;
            } else if (selector == '[create-playdate="cards"]' && playdate.joined == '') {
                var $cardHolder = $('<div></div>', {
                    'create-playdate': 'cards',
                    'class': 'card bg-light text-center'
                });

                var playdateImage = "";
                switch (playdate.animal) {
                    case "Dog":
                        playdateImage = "images/dog.png";
                        break;
                    case "Cat":
                        playdateImage = "images/cat.png";
                        break;
                    case "Rabbit":
                        playdateImage = "images/rabbit.png";
                        break;
                    case "Guinea Pig":
                        playdateImage = "images/guinea-pig.png";
                        break;
                    case "Bird":
                        playdateImage = "images/bird.png";
                        break;
                    case "Monkey":
                        playdateImage = "images/monkey.png";
                        break;
                    default:
                        playdateImage = "images/dog.png";
                }

                var $cardPicture = $('<img>', {
                    src: playdateImage,
                    style: "max-width:50%;",
                    'class': 'card-img-top rounded-circle shadow-lg'
                });
                var $ch = $('<h5 class="card-header"></h5>');

                $ch.append(playdate.title);


                var $cb1 = $('<div class="card-body"></div>');
                var $cl = $('<ul></ul>', {
                    'class': 'list-group list-group-flush'
                });

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

                $cb2.append('<h5 class="mb-1">Join Playdate: </h5> ');
                $cb2.append($addButton);

                $cb1.append($cardPicture);
                $cardHolder.append($ch);
                $cardHolder.append($cb1);
                $cardHolder.append($cl);
                $cardHolder.append($cb2);
                
                $colHolder.append($cardHolder);

                this.$element = $colHolder;
            }
        }
    }

    App.Cards = Cards;
    window.App = App;
})(window);