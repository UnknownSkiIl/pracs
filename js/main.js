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

    let deadline = '2019-03-15';

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

    function EzPopUp(btn, num = 0) {
        let mores = document.querySelectorAll(btn),
            more = mores[num],
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
    EzPopUp('.description-btn', 0);
    EzPopUp('.description-btn', 1);
    EzPopUp('.description-btn', 2);
    EzPopUp('.description-btn', 3);

    //Form 
    function ezAjaxForm(selector) {

        let messege = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы вам ответим!',
            failure: 'Что-то пошло не так :('
        };

        let form = document.querySelector(selector),
            input = form.getElementsByTagName('input'),
            statusMessege = document.createElement('div');
        
            statusMessege.classList.add('status');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            form.appendChild(statusMessege);
            let formData = new FormData(form);

            // Если отправляем данные в JSON
            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);
            
            function postData(data) {
                
                return new Promise(function(resolve, reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                    request.onreadystatechange = function() {
                        if (request.readyState < 4) {
                            resolve()
                        } else if(request.readyState === 4) {
                            if (request.status == 200 && request.status < 300) {
                                resolve()
                            }
                            else {
                                reject()
                            }                            
                        };
                    }
                    
                    request.send(data);
                })
            } //end postData

            function clearInputs() {           
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            // postData(formData)
            postData(json)
                .then(()=> statusMessege.innerHTML = messege.loading)
                .then(() => statusMessege.innerHTML = messege.success)
                .catch(()=> statusMessege.innerHTML = messege.failure)
                .then(clearInputs)
        });
    }

    ezAjaxForm('.main-form');
    ezAjaxForm('#form');

    //EzSlider 

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(n) {
        
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);         
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(e) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains('dot') && e.target == dots[i-1]) {
                currentSlide(i);
            } 
        } 
    });
    //EzCalc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function() {
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;

            if (persons.value == '' || restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function () {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if (persons.value == '' || restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function() {
            if (persons.value == '' || restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        })
});