$(function() {
    'user strict';

    window.Validator = function(val, rule) {      
        this.is_valid = function(newVal) {
            if (newVal !== undefined)
                val = newVal
            var key;
            // 如果不是必填项且用户未填写任何内容，直接判定为合法
            if (!rule.required && !val) 
                return true;

            for (key in rule) {
                // 防止重复检查
                if (key === 'required')
                    continue;
                // 调用rule中相对应的方法
                var r = this['validate_' + key]();
                if (!r) return false;
            }
            return true;
        };
 
        /* 验证数字大小 */
        this.validate_max = function() {
            pre_max_or_min();
             return val <= rule.max;
        };
        this.validate_min = function() {
            pre_max_or_min();
            return val >= rule.min;
        };

        /* 验证字符串长度 */
        this.validate_maxlength = function() {
            pre_length();
            return val.length <= rule.maxlength;
        };
        this.validate_minlength = function() {
            pre_length();
            return val.length >= rule.minlength;
        };

        /* 验证是否为数字 */
        this.validate_numeric = function() {
            return $.isNumeric(val);
        };

        /* 验证是否必填项 */
        this.validate_required = function() {
            var real = $.trim(val);
            if (!real && real !== 0)
                return false;
            return true;
        };

        /* 正则匹配验证 */
        this.validate_pattern = function() {
            var reg = new RegExp(rule.pattern);
            return reg.test(val);
        }

        //  用于 this.validate_max 或 this.validate_min 的前置工作
        function pre_max_or_min() {
            val = parseFloat(val);
        }

        //  用于 this.validate_maxlength 或 this.validate_minlength 的前置工作
        function pre_length() {
            val = val.toString();
        }
    };
});