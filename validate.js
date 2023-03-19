// Validate form
function Validator(options) {
    var formElement = document.querySelector(options.form)
    var selectorRules = {}

    // Hàm lấy ra phần tử cha 
    function getParent(element, selector) {
        while(element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)

        var tests = selectorRules[rule.selector]

        for (var i = 0; i < tests.length; i++) {
            errorMessage = tests[i](inputElement.value)
            if (errorMessage) break; 
        }

        if(errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerText = ''
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }

        return !errorMessage
    }

    // Lọc ra các rule 
    if (formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;
            // Lặp qua từng rule và validate 
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule); 
                if (!isValid) {
                    isFormValid = false;
                }
            });
        }
        // Lặp qua mỗi rule và xử lý yêu cầu
        options.rules.forEach(function(rule) {
            // Lưu lại các rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            // Xử lý các sự kiện blur, input,...
            var inputElements = formElement.querySelectorAll(rule.selector)
            Array.from(inputElements).forEach(function(inputElement) {
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }
                inputElement.oninput= function() {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
                    errorElement.innerText = ' '
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                }
            })
        })
    }
    
}

Validator.isRequired = function(selector) {
    return {
        selector : selector,
        test : function(value) {
            return value ? undefined : 'This field is required'
        }
    }
}

Validator.isNumber = function(selector) {
    return {
        selector : selector,
        test : function(value) {
            var regex = /^\d+$/
            return regex.test(value) ? undefined : 'This field must be a number'
        }
    }
}

