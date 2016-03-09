'use strict';

var assign = require('lodash.assign');
var noop = function() {};
var defaults = {
    toggle: null,
    autoClose: true,
    onOpen: noop,
    onClose: noop
};
var clickEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

if (window.PointerEvent) {
    clickEvent = 'pointerdown';
}

if (window.navigator.msPointerEnabled) {
    clickEvent = 'MSPointerDown';
}

function Dropdown(options) {
    this.options = assign({}, defaults, options);
    this.toggleElement = this.options.toggle instanceof Element ? this.options.toggle : document.querySelector(this.options.toggle);
    this.dropdownElement = document.querySelector(this.toggleElement.getAttribute('data-dropdown'));
    this.parentElement = this.dropdownElement.parentNode;
    this.isOpen = false;
    this.openClass = 'is-open';
    this.events();
}

module.exports = Dropdown;

Dropdown.prototype.events = function() {
    // Handlers
    this.onParent = function(e) {
        console.log('close in parent', this.options.id, e);
        this.close();
        this.parentElement.removeEventListener('click', this.onParent);
        e.stopPropagation();
    }.bind(this);

    this.onWindow = function(e) {
        console.log('close in window', this.options.id);
        if (e.dropdowns && e.dropdowns[this.options.id] === false) {
            return;
        }
        this.close();
    }.bind(this);

    this.onToggle = function(e) {
        console.log('click button', this.options.id);
        this.toggle();
        e.stopPropagation();
    }.bind(this);

    this.onDropdown = function(e) {
        console.log('click dropdown', this.options.id);
        if (!e.dropdowns) {
            e.dropdowns = {};
        }

        if (this.options.autoClose) {
            // e.dontClose = true;
            e.dropdowns[this.options.id] = true;
            // e.stopPropagation();
        } else {
            e.dropdowns[this.options.id] = false;
            // e.dontClose = false;
        }
    }.bind(this);

    this.toggleElement.addEventListener(clickEvent, this.onToggle);
    this.dropdownElement.addEventListener(clickEvent, this.onDropdown, true);
};

Dropdown.prototype.open = function() {
    this.dropdownElement.classList.add(this.openClass);
    this.isOpen = true;
    window.addEventListener(clickEvent, this.onWindow);
    //this.parentElement.addEventListener(clickEvent, this.onParent);
    this.options.onOpen(this);
};

Dropdown.prototype.close = function() {
    if (this.isOpen) {
        this.dropdownElement.classList.remove(this.openClass);
        this.isOpen = false;
        window.removeEventListener(clickEvent, this.onWindow);
        //this.parentElement.removeEventListener(clickEvent, this.onParent);
        this.options.onClose(this);
    }
};

Dropdown.prototype.toggle = function() {
    if (this.dropdownElement.classList.contains(this.openClass)) {
        this.close();
    } else {
        this.open();
    }
};

Dropdown.prototype.destroy = function() {
    this.toggleElement.removeEventListener(clickEvent, this.onToggle);
    this.dropdownElement.removeEventListener(clickEvent, this.onDropdown);
    window.removeEventListener(clickEvent, this.onWindow);
};
