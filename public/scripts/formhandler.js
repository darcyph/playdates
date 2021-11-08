(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    
    class FormHandler {
        constructor(selector) {
            if (!selector) { throw new Error('No selector provided'); }
            
            this.$formElement = $(selector);
            if (this.$formElement.length === 0) { 
                throw new Error('Could not find element with selector: ' + selector);
            }
        }
        
        addSubmitHandler(fn) { 
            this.$formElement.on('submit', function(event) { 
                event.preventDefault();
                
                var data = {};
                $(this).serializeArray().forEach(function(item) { 
                    data[item.name] = item.value;
                    console.log(item.name + ' is ' + item.value);
                })
                data['joined'] = '';
                
                console.log(data);
                fn(data)
                    .then(function() {
                        this.reset();
                        this.elements[0].focus();
                    }.bind(this));
            });
        }
    }
    
    App.FormHandler = FormHandler;
    window.App = App;
  })(window);