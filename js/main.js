window.addEventListener('DOMContentLoaded', function () {
    
    'use strict';
    
    //Tab Swiper
    
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hidetabContent(a) {
        for (let i = a; i< tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hidetabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i< tab.length; i++) {
                if (target == tab[i]) {
                    hidetabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2019-03-10';

    function getTimeRamaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
            // hours = Math.floor((t /1000/60/60) % 24), 
            // days = Math.floor((t / (1000*60*60*24)));

        return {
            'total' : t,
            // 'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
        // days = timer.querySelector('.days'),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRamaining(endtime),
                // d = getNumLength(t.days),
                a = getNumLength(t.hours),
                b = getNumLength(t.minutes),
                c = getNumLength(t.seconds);
            
            function getNumLength(number) {
                return number.toString().length;
            }
            
            if (a == 2) {
                hours.textContent = t.hours;
            }  else {
                hours.textContent = '0' + t.hours;
            }

            if (b == 2) {
                minutes.textContent = t.minutes;
            } else {
                minutes.textContent = '0' + t.minutes;
            }

            if (c == 2) {
                seconds.textContent = t.seconds;
            } else {
                seconds.textContent = '0' + t.seconds;
            }
            
            // if (d == 2) {
            //     days.textContent = t.days;
            // } else {
            //     days.textContent = '0' + t.days;
            // }

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('timer', deadline);

    //Modal 

    function EzPopUp(btn) {
        let more = document.querySelector(btn),
            overlay = document.querySelector('.overlay'),
            close = document.querySelector('.popup-close');

        more.addEventListener('click', function () {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', function () {
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';
        });
    };

    EzPopUp('.more');
    EzPopUp('.description-btn');
});