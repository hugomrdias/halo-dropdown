# halo-dropdown 
> Dropdown component for Halo

This is for advanced users.


## Install

```
$ npm install --save halo-dropdown
```

## Usage
Check the examples [page](https://hugomrdias.github.io/halo-dropdown/test) and code in the test folder.   

For simple dropdowns without nesting its possible to do a global listener 
```
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('Toggle')) {
        var dropdown = new Dropdown({
            toggle: e.target,
            onClose: function(dropdown) {
                dropdown.destroy();
            }
        });
        dropdown.open();
    }
});

```

## License

MIT © [Hugo Dias](http://hugodias.me)
