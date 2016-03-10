'use strict';

var assign = require('lodash.assign');
var uniqueId = require('lodash.uniqueid');
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

function findId(element, id) {
    var elementId = element.id;

    if (id) {
        return id;
    }

    if (elementId) {
        return elementId;
    }

    return uniqueId();
}

function Dropdown(options) {
    this.options = assign({}, defaults, options);
    this.toggleElement = this.options.toggle instanceof Element ? this.options.toggle : document.querySelector(this.options.toggle);
    this.dropdownElement = document.querySelector(this.toggleElement.getAttribute('data-dropdown'));
    this.id = findId(this.dropdownElement, this.options.id);
    this.isOpen = false;
    this.openClass = Dropdown.openClass;
    this.events();
}

module.exports = Dropdown;

Dropdown.openClass = 'is-open';

Dropdown.global = function(classSelector) {
    window.addEventListener(clickEvent, function(e) {
        var autoClose;
        var target = e.target;
        var dropdown;

        if (target.classList.contains(classSelector) && target.getAttribute('data-global') !== 'true') {
            target.setAttribute('data-global', 'true');
            autoClose = e.target.getAttribute('data-autoClose') === 'false' ? false : true;
            dropdown = new Dropdown({
                toggle: e.target,
                autoClose: autoClose
            });
        }
    }, true);
};

Dropdown.prototype.events = function() {
    // Handlers
    this.onWindow = function(e) {
        if (e.dropdowns && e.dropdowns[this.id] === false) {
            return;
        }

        this.close();
        // console.log('close in window', this.id);
    }.bind(this);

    this.onToggle = function(e) {
        // console.log('click button', this.id);
        if (!e.dropdowns) {
            e.dropdowns = {};
        }
        e.dropdowns[this.id] = false;
        this.toggle();
    }.bind(this);

    this.onDropdown = function(e) {
        // console.log('click dropdown', this.id);
        if (!e.dropdowns) {
            e.dropdowns = {};
        }

        if (this.options.autoClose) {
            e.dropdowns[this.id] = true;
        } else {
            e.dropdowns[this.id] = false;
        }
    }.bind(this);

    this.toggleElement.addEventListener(clickEvent, this.onToggle);
    this.dropdownElement.addEventListener(clickEvent, this.onDropdown, true);
};

Dropdown.prototype.open = function() {
    this.dropdownElement.classList.add(this.openClass);
    this.toggleElement.classList.add(this.openClass);
    this.isOpen = true;
    window.addEventListener(clickEvent, this.onWindow);
    this.options.onOpen(this);
};

Dropdown.prototype.close = function() {
    this.dropdownElement.classList.remove(this.openClass);
    this.toggleElement.classList.remove(this.openClass);
    this.isOpen = false;
    window.removeEventListener(clickEvent, this.onWindow);
    this.options.onClose(this);
};

Dropdown.prototype.toggle = function() {
    if (this.dropdownElement.classList.contains(this.openClass)) {
        this.close();
    } else {
        this.open();
    }
};

Dropdown.prototype.destroy = function() {
    if (this.isOpen) {
        this.close();
    }

    this.toggleElement.removeEventListener(clickEvent, this.onToggle);
    this.dropdownElement.removeEventListener(clickEvent, this.onDropdown);
};
