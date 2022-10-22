$( () => {
    // global values
    var audio1 = new Audio('audio/magic.mp3');
    var audio2 = new Audio('audio/piano.mp3');
    var audio3 = new Audio('audio/wind.mp3');
   
    var resizeTime;

     var howMatch = 0;
    var time;
    var timeIn = 5;
    var nTime;

    //volume panel select function

    $('.secondvolume').click(()=>{
        if($('.firstvolume').hasClass('active') || $('.thirdvolume').hasClass('active'))
        {
            $('.firstvolume').removeClass('active');
            $('.thirdvolume').removeClass('active');
            $('.secondvolume').addClass('active');
            audio2.play();
        }
        else 
        {
            audio2.play();
        }
    })
    $('.firstvolume').click(()=>{
        if($('.secondvolume').hasClass('active') || $('.thirdvolume').hasClass('active'))
        {
            $('.secondvolume').removeClass('active');
            $('.thirdvolume').removeClass('active');
            $('.firstvolume').addClass('active');
            audio1.play();
        }
        else 
        {
            audio1.play();
        }
    })
    $('.thirdvolume').click(()=>{
        if($('.secondvolume').hasClass('active') || $('.firstvolume').hasClass('active'))
        {
            $('.secondvolume').removeClass('active');
            $('.firstvolume').removeClass('active');
            $('.thirdvolume').addClass('active');
            audio3.play();
        }
        else 
        {
            audio3.play();
        }
    }) 



    $('.mini').click( () => 
    {
        if ($(this).hasClass('active')) 
        {
            $(this)
                .removeClass('active')
                .addClass('disabled');
            $('.img')
                .removeClass('active')
                .addClass('disabled');
        }

        setTimeout(() => {
            location.reload(true);
        }, 500);
        return false;
    });

    $(window).resize(() => 
    {
        resizeWindow();
    });
    
    //function when window resize take optimal size

    var resizeWindow = () =>
     {
        var heightOfWindow = window.innerHeight;

        if ($('.last').hasClass('active') || $('.exercise.first').hasClass('active')) 
        {
            $('#wrapper').css('padding-top', '');
            if ($('.exercise.first').hasClass('active') && heightOfWindow < 540)
            {
                $('.navi_block').addClass('stopped');
            } else 
            {
                $('.navi_block').removeClass('stopped');
            }
        } 
        else 
        {
            clearTimeout(resizeTime);

            var padding = heightOfWindow / 2 - 205;

            if (padding < 1) 
            {
                padding = 0;
            }
            resizeTime = setTimeout( () => 
            {
                $('#wrapper').css(
                    {
                    'padding-top': padding
                });

            }, 200);

        }
    }

    $('#start').click( () => 
    {
        $('.img, .mini').removeClass('disabled');
        changeBlock();
        timeExecice();
        $('.social-button').css('display', 'none');
        $('.timer, .img, .mini').addClass('active');
    });

    $('.continue').click( () => 
    {
        clearInterval(time);
        changeBlock();
        timeExecice();
        $('.instruction_block').css('display', 'none').removeClass('exercise');

        return false;
    });


    var changeBlock = () => 
    {
        $('.exercise.active')
            .next()
            .addClass('active')
            .prev()
            .removeClass('active');
        $('.timer').html(parseInt($('.exercise.active').attr('data-time')));

        resizeWindow();
    }

    var timeExecice = () =>
     {
        timeIn = parseInt($('.exercise.active').attr('data-time'));
        time = setInterval( () => 
        {
            timeIn--;
            if (timeIn == 0) {
                
                if($('.firstvolume').hasClass('active'))
                {
                    audio1.play();
                } else if ($('.secondvolume').hasClass('active'))
                {
                    audio2.play();
                } else if ($('.thirdvolume').hasClass('active'))
                {
                    audio3.play();
                }
                clearInterval(time);
                changeBlock();
                howMatch++;
                if (howMatch < parseInt($('.exercise').size()) - 1) 
                {
                    timeExecice();
                } else {
                    $('#wrapper').css('padding-top', '0');
                

                    $('.exercise').removeClass('active');
                    $('.last').addClass('active');
                    setTimeout( () => {
                        $('.exercise.first')
                            .addClass('active');
                        $('.last').removeClass('active');

                    }, 10000);

                    clearInterval(nTime);
                    $('.timer, .img, .mini').removeClass('active');
                    $('.mini').addClass('disabled');
                    $('.img').hide();
                    setTimeout( () => {
                        $('.img').show().addClass('disabled');
                    }, 1000);
                    $('.social-button').css('display', 'block');
                    resizeWindow();
                }
            }

            $('.timer').html(timeIn < 10 ? "0" + timeIn : timeIn);
        }, 1000);
    }
});