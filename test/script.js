'use strict';

var Dropdown = window.Dropdown;

var drop1 = new Dropdown({
    toggle: '#toggle',
    autoClose: false,
    id: 'one'
});

var drop2 = new Dropdown({
    toggle: '#toggle2',
    id: 'two',
    autoClose: false
});

document.querySelector('#destroy').addEventListener('click', function() {
    drop1.destroy();
});

document.querySelector('#remove').addEventListener('click', function() {
    document.querySelector('#container').remove();
});

Dropdown.global('Toggle');

