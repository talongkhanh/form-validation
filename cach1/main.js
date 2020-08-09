const Validator = (options) => {
    // Hàm xử lý lối
    let validate = (inputElement, rule) => {

        let errorElement = inputElement.parentElement.querySelector(options.errSelector)
        let errorMessage = rule.test(inputElement.value)

        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    let formElement = document.querySelector(options.form)

    if (formElement) {
        options.rules.forEach((rule) => {
            let inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {
                // xử lý trường hợp blur ra ngoài ô input
                inputElement.onblur = () => {
                    validate(inputElement, rule)

                }
                // xử lý trường hợp khi người dùng nhập vào input
                inputElement.oninput = () => {
                    let errorElement = inputElement.parentElement.querySelector(options.errSelector)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}
//rules
// err -> err message

Validator.isRequired = (selector) => {
    return {
        selector,
        test(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này!'
        }
    }
}

Validator.isEmail = (selector) => {
    return {
        selector,
        test(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email!'
        }
    }
}
