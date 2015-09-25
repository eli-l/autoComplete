(function($){

    var showSearchResults  = function(result){
        var locale = $('body').data('locale');

        function listItem(elem){
            var item = $('<li></li>');
            item.text(elem.name);
            item.val(elem.id);
            return item;
        }

        var parent = $('<ul>');
        parent.addClass('search_result');
        for (var i= 0, length = result.length; i<length; i++){
            listItem(result[i]).appendTo(parent);
        }

        var old = $(this).parent().find('ul');
        if (old.length){
            old.replaceWith(parent);
        } else {
            parent.insertAfter($(this));
        }

        parent.on('click', 'li', function(){
            goToEvent($(this).val());
        });
    };
    //basic request settings
    var settings = {
        timer: 300,
        reqUrl: "",
        reqType: "GET",
        respType : "JSON",
        callback: {
            success: showSearchResults
        }
    };

    /*
    Helper function for delay while printing.
    Withuout it every single change will pull a request from server
    which may cause overload or slow performance.
    */
    var timer = (function(){
        var interval;
        return function(func, params){
            clearTimeout(interval);
            interval = setTimeout(function(){
                func(params);
            }, settings.timer);
            return interval;
        }
    })();

    /*
    Run only when typing.
    Remove list when input is empty.
    */

    function inputFilter(e){
        var current = $(this);

        switch (e.keyCode){
            case 37: //arrow left
            case 38: //arrow up
            case 39: //arrow right
            case 40: //arrow down
            case 27: //escape key
                $(document).trigger('click');
                break;
            case 13: //enter key
            case 91: //cmd
            case 18: //alt
            case 17: //ctrl
            case 16:
                break;
            case 8: //backspace
                if (current.val() == ""){
                    $(current.parent().find('ul')).remove();
                    break;
                }
            default:
                if (current.val() != ""){
                    timer(sendRequest, this);
                }
                break;
        }
    }

    /*
    DO NOT make new request if current string is in list so far.
     */
    function alreadyGotResult(list, input){
        var result = false;

        var options = list.children('li');
        var regexp = new RegExp(input.string, 'i');
        var length = options.length;

        if (length > 1 ){
            for (var i = 0; i<length; i++){
                var current =  $(options[i]);
                if ( regexp.test(current.text()) ){
                    result = true;
                } else {
                    $(current).remove();
                }
            }
        }
        return result;
    }


    /*
    AJAX wrapper with some filters.
    Allow "." to list ALL possible entries.
     */
    var sendRequest = function(elem){
        var elem = $(elem);
        var input = {
            name : elem.data('name'),
            string : elem.val(),
            limit: 10
        };

        var list = elem.parent().find('ul');
        if (!alreadyGotResult(list, input)  ){
            if (input.string === '.'){
                delete input.limit;
            }
            $.extend(input, settings.customObj);
            $.ajax({
                url: settings.reqUrl,
                type: settings.reqType,
                async: true,
                dataType: settings.respType,
                data: input,
                beforeSend: function(){
                    //console.log('request');
                },
                success: function(resp){
                    settings.callback.success.apply(elem, [resp]);
                    //console.log('response');
                },
                error: function(err){
                    if (settings.callback.error){
                        settings.callback.error.apply(elem, [err]);
                    }
                    console.log(err);
                }
            });
        }
    };

    /*
    Show server response as UL.
    Append ID to input data.
     */

    function restoreOnBlur(){
        var input = $(this).find('input[type=text]');
        var list = $(this).find('ul');
        if (list.length){
            list.hide();
        }
    }

    function clearOnClick(){
        $(this).data('old', $(this).val());
        $(this).val('');
    }

    /*
    Function to initialize a script.
    Provide a jQuery object or array of jQuery objects as a first parameter.
    Second parameter is optional if defaultSettings was set and you don't need to change it.
     */
    var putListener = function(){
        var elems = this;

        function listen(elem){
            $(elem).on('keyup', 'input[type=text]', function(e){
                inputFilter.apply(this, [e]);
            });
            $(elem).on('click', function(e){
               if ($(this).find('ul').length){
                   $(this).find('ul').show();
               }
            });
        }

        //append listeners
        for (var i = 0, length = this.length; i<length; i++){
            listen(this[i]);
        }

        //hide completion list when inactive
        $(document).on('click', function(e){
            var target = $(e.target);
            if (!target.is("input") && !target.is('li') ){
                for(var i = 0, length = elems.length; i< length; i++){
                    restoreOnBlur.apply(elems[i]);
                }
            }
        });
    };

    $.fn.ajaxSearch = function(userSettings, callback){
        userSettings.callback = callback || userSettings.callback;
        settings = $.extend(settings, userSettings);
        putListener.apply(this);
    };
})(jQuery);



