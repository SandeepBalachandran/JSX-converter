
const lightMode = {
    '--primary': '#03bcfc',
    '--background': '#ffffff',
    ' --body-bg': '#ecf0f3',
    '--field-color': '#000'
};

const darkMode = {
    '--primary': 'red',
    '--background': '#3f495e',
    ' --body-bg': '#242933',
    '--field-color': '#ffff'
};

const FormatString = (code) => {
    const result = code.replace(/class/gi, 'className').replace(/for/gi, 'htmlFor').replace(/tabindex/gi, 'tabIndex').replace(/selected/gi, 'value=" "');
    return result
}
const onFocusOut = (value) => {
    const formattedString = FormatString(value)
    output.value = formattedString
}

const saveToStorage = (status) => {
    chrome.storage.sync.set({ 'darktheme': status }, function () {
        console.log('Value is set to ' + status);
    });
}

const toggleTheme = (darkthemeEnabled) => {
    darkthemeEnabled ? makeStrcture(darkMode) : makeStrcture(lightMode)
    saveToStorage(darkthemeEnabled)
}

const makeStrcture = (rootVariables) => {
    let temp = ''
    Object.entries(rootVariables).forEach(variable => {
        temp += `${variable[0]} : ${variable[1]}; `
    });
    const body = `:root {${temp}}`
    insertToDom(body)
}

const insertToDom = (content) => {
    const existingVariables = document.getElementById('theme-variables')
    if (existingVariables) {
        existingVariables.remove()
    }
    const ele = document.createElement('style');
    ele.id = "theme-variables"
    ele.textContent = content;
    document.head.appendChild(ele);
}

const input = document.getElementById('input')
const output = document.getElementById('output')
const copy = document.getElementById('copy')
const themeToggler = document.getElementById('themeSlider')


input && input.addEventListener('focusout', ($event) => onFocusOut($event.target.value))



copy && copy.addEventListener('click', () => {
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


themeToggler && themeToggler.addEventListener('change', ($event) => {
    toggleTheme($event.currentTarget.checked)
})

const onFunctionNeed = (event) => {
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

(() => {
    chrome.storage.sync.get(['darktheme'], function (result) {
        if (result.darktheme) {
            makeStrcture(darkMode)
            themeToggler.checked = true;
        } else {
            makeStrcture(lightMode);
            themeToggler.checked = false
        }
    });
})()


const functionCheck = document.getElementById('functionCheck')
functionCheck?.addEventListener('change', onFunctionNeed)


