$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        // code to be implemented

        var todo_item_list = [];

        function appendItemToToDoList(todo_item){
            var li = $('<li></li>');
            li.attr('id', todo_item.id);
            li.attr('class', '');
            var checkbox = $('<input>');
            checkbox.attr('name', 'done-todo');
            checkbox.attr('type', 'checkbox');
            checkbox.attr('class', 'done-todo');
            var span = $('<span></span');
            span.html(" " + todo_item.name);
            var input = $('<input>');
            input.addClass('edit-input');
            input.val(todo_item.name);
            input.focusout(function(){
                updateItemName(this);
            });
            input.hide();
            li.append(checkbox);
            li.append(span);
            li.append(input);
            li.dblclick(function(){
                enableEditItemName(this);
            })
            $('ol').append(li);
            initlaizeCheckbox();
        }

        function createToDoItem(){
            var item_name = $("input[name=ListItem]").val();
            var id = generateUUID();
            var checked = false;
            var todo_item = {id: id, name: item_name, checked: checked};
            todo_item_list[id] = checked;
            appendItemToToDoList(todo_item);
        }

        function toggleCheckbox(checkbox){
            var checked = $(checkbox).prop("checked");
            var parent_li = $('#' + $(checkbox).parent()[0].id);
            if (checked) {
                parent_li.addClass('checked');
            } else {
                parent_li.removeClass('checked');
            }
            todo_item_list[$(checkbox).parent()[0].id] = checked;
        }

        function updateItemName(inputElement){
            var new_name = $(inputElement).val();
            var display_span = $(inputElement).prev();
            display_span.html(" " + new_name);
            display_span.show();
            $(inputElement).hide();
        }

        function enableEditItemName(rowELement){
            $(rowELement).find('span').hide();
            $(rowELement).find('.edit-input').show();
        }

        function changeSelectFilter(filterElement){
            $('a').removeClass('selected');
            $(filterElement).addClass('selected');
        }

        function filterBy(action){
            if (action == 'all') {
                $('ol > li').show();
            } else if (action == 'active') {
                $('ol > li').each(function() {
                    if (todo_item_list[$(this).attr('id')]) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
            } else {
                $('ol > li').each(function() {
                    if (!todo_item_list[$(this).attr('id')]) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
            }
        }

        function clearupToDoList(){
            $('ol').html('');
        }

        function initlaizeCheckbox(){
            $('.done-todo').click(function(){
                toggleCheckbox(this);
            });
        }

        function initlaizeAddFunction(){
            $('#button').click(function(){
                createToDoItem();
                $("input[name=ListItem]").val("");
            });
            $('input[name=ListItem]').keydown(function (event){
                var keypressed = event.keyCode || event.which;
                if (keypressed == 13) {
                    createToDoItem();
                    $("input[name=ListItem]").val("");
                }
            });
        }

        function initialFilterFunction(){
            $('a').click(function(){
                changeSelectFilter(this);
                filterBy($(this).attr('data-filter'));
            });
        }

        clearupToDoList();
        initlaizeCheckbox();
        initlaizeAddFunction();
        initialFilterFunction();
    });