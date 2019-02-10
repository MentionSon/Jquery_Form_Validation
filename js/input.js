$(function() {
    'use strict';

    window.Input = function(selector) {
        var $ele,
            me = this,
            $error_message,
            rule = {
                required: true
            };

        this.load_validator = function() {
            var val = this.get_val();
            this.validator = new Validator(val, rule);
        };

        this.get_val = function() {
            return $ele.val();
        }

        function init() {
            find_ele();
            parse_rule();
            me.load_validator();
            get_error_message();
            eventListen();
        }

        function eventListen() {
            $ele.on('keyup', function() {
                var valid = me.validator.is_valid(me.get_val());
                if (valid) 
                    $error_message.css({
                        visibility: "hidden"
                    });
                else
                    $error_message.css({
                        visibility: "visible"
                    });
            });
        }

        /* 获取错误提示信息的元素 */
        function get_error_message() {
            $error_message = $(get_message_selector());
        }

        function get_message_selector() {
            return '#' + $ele.attr('name') + '-input-message';
        }

        function find_ele() {
            if(selector instanceof jQuery) {
                $ele = selector;
            } else {
                $ele = $(selector);
            }
        }

        /* 处理验证规则的数据 */
        function parse_rule() {
            var i;
            // 拿到元素节点上的验证规则 data-rule
            var rule_string = $ele.data('rule');
            if (!rule_string) return;

            // 将验证规则的字符串转换为数组，便利后依次推入 rule 对象中
            var rule_arr = rule_string.split('|');
            for (i=0; i<rule_arr.length; i++) {
                var item_str = rule_arr[i];
                var item_arr = item_str.split(':');
                rule[item_arr[0]] = JSON.parse(item_arr[1]);
            }
        }

        init();
    }
});