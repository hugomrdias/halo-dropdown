'use strict';

var Dropdown = window.Dropdown;

var drop1 = new Dropdown({
    toggle: '#toggle',
    autoClose: false,
    id: 'one'
})

var drop2 = new Dropdown({
    toggle: '#toggle2',
    id: 'two'
})

document.querySelector('#destroy').addEventListener('click', function(e) {
    drop1.destroy();
})

document.querySelector('#remove').addEventListener('click', function(e) {
    document.querySelector('#container').remove()
})

// window.addEventListener('click', function(e) {
//     console.log(e.target)
//     var dropdown;

//     if (e.target.classList.contains('Toggle')) {
//         var dropdown = new Dropdown({
//             toggle: e.target,
//             id: e.target.id,
//             onClose: function(dropdown) {
//                 console.log('yoo')
//                 dropdown.destroy();
//             }
//         });
//         dropdown.open();

//     }
// })
