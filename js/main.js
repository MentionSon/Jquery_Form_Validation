// 选中页面所有的input[data-rule]

// 解析每一个input的验证规则

// 验证

$(function() {
    var $inputs = $('[data-rule]'),
        $form = $('#signup'),
        inputs = [];

    $inputs.each(function(index, node) {
        inputs.push(new Input(node));
    });

    /* 最终校验 */
    $form.on('submit', function(e) {
        // 让所有输入框出发事件
        $inputs.trigger('keyup');
        e.preventDefault();

        for (let i of inputs) {
            var r = i.validator.is_valid();
            if (!r) {
                alert('请正确填写信息');
                return;
            } 
        }

        alert('注册通过');
    });
    // var test = new Validator('AB', {
    //     pattern: "^[A-Z]+$"
    // });

    // var r = test.validate_pattern();
    // console.log(r);
    // var a = /^[A-Z]+$/
    // console.log(a.test('AB'));
});

