const FormatString = (code) => {
    const result = code.replace(/class/gi, 'className').replace(/for/gi, 'htmlFor').replace(/tabindex/gi, 'tabIndex').replace(/selected/gi, 'value=" "');
    return result
}
const onFocusOut = (value) => {
    const formattedString = FormatString(value)
    output.value = formattedString
}

const input = document.getElementById('input')
input.addEventListener('focusout', ($event) => onFocusOut($event.target.value))

const output = document.getElementById('output')

const copy = document.getElementById('copy')
copy.addEventListener('click', () => {
    output.select();
    document.execCommand("copy");
    output.blur()
    copy.innerText = "Copied!"
    copy.style.backgroundColor = '#07df07'
    setTimeout(() => {
        copy.innerText = 'Copy to clipboard'
        copy.style.removeProperty('background-color')
    }, 1000);
})


const onFunctionNeed = (event) => {
    console.log(input.value)
    if (event.currentTarget.checked && input.value !== '') {
        const functionTemplate = `import React from 'react'

const functionName = () => {
    return (
        <React.Fragment>
            ${FormatString(input.value)}
        </React.Fragment>
    )
}

export default functionName`;
        output.value = functionTemplate
    } else {
        output.value = FormatString(input.value);
    }
}


const functionCheck = document.getElementById('functionCheck')
functionCheck.addEventListener('change', onFunctionNeed)


