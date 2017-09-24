angular.module('app')
    .controller('AppController', function () {

        let self = this;

        self.init = function () {
            Handlebars.registerHelper('if_eq', function(a, b, opts) {
                if(a == b)
                    return opts.fn(this);
                else
                    return opts.inverse(this);
            });

            let data = {};
            data['cards'] = cards;
            let templateScript = $('#cards').html();
            let template = Handlebars.compile(templateScript);
            $('.cards-list').append(template(data));
        };

        self.clickListener = function (e) {
            let target = e.target;
            let card;

            while (!target.classList.contains('cards-list')){
                if ((target.classList.contains('card')) || (target.classList.contains('card--wide'))) {
                    card = target;
                    break;
                }
                target = target.parentNode;
            }
            if (!card) return;

            if (e.shiftKey && e.altKey) {
                console.log('add wide');

                let newCard = {};
                newCard.type = 'wide';
                cards.push(newCard);

                let templateScript = $('#new-card').html();
                let template = Handlebars.compile(templateScript);
                $('.cards-list').append(template(newCard));
            } else if (e.shiftKey) {
                console.log('add narrow');

                let newCard = {};
                newCard.type = 'narrow';
                cards.push(newCard);

                let templateScript = $('#new-card').html();
                let template = Handlebars.compile(templateScript);
                $('.cards-list').append(template(newCard));

            } else {
                console.log('remove');
            }

        };

    });