# dropdown-list-element

_Because defining fancy right-click menus should be easy_

## Features

* Easy to use
* Framework independent
* Can be configured to open on `click` or `contextmenu` events
* Menu items can contain `<input>` elements with first class support for `type="checkbox"` and `type="radio"`
* Full keyboard navigation support
* Animatable

## Installation

You can add the `dropdown-list-element` package as a dependency of your npm project. Just be sure to import it 
somewhere so that the custom elements will be registered.

If you run `npm install && npm run build-standalone` after cloning this repository, you will have a self-contained
version of this library bundled with the one (1) external function depended upon that you can use in a normal
`<script>` tag. (Woah, old school!)

## Defining your menus

Quickstart example:

```html
<div>This div has a context menu</div>
<dropdown-menu linked-elements="div:has(+ #this)">
	<dropdown-menu-item value="1">Option 1</dropdown-menu-item>
	<dropdown-menu-item value="2">Option 2</dropdown-menu-item>
	<dropdown-menu-item value="3">Option 3</dropdown-menu-item>
	<dropdown-menu-item>
		Nested options
		<dropdown-menu-inner>
			<dropdown-menu-item value="4">Option 4</dropdown-menu-item>
			<dropdown-menu-item disabled value="5">Disabled option 5</dropdown-menu-item>
			<dropdown-menu-item value="6">Option 6</dropdown-menu-item>
		</dropdown-menu-inner>
	</dropdown-menu-item>
</dropdown-menu>
```

```js
divWithContextMenu.addEventListener("dropdownSelect", (ev) => {
	const {
		selectedElement, // The <active-dropdown-menu-item> selected.
		selectedElementOriginal, // The `<dropdown-menu-item>` used to create the `selectedElement`.
		selectedValue, // The value of the `value` attribute of the `selectedElementOriginal`, `undefined` if not set.
		dropdownMenu, // The <dropdown-menu> used to make the menu selection.
		triggeringElement // The linked element which triggered the opening of the menu.
	} = ev.detail;
	alert("Option " + selectedValue + " was selected!");
});
```

A more detailed example can be found in the `tests/test.html` file. If you wish to try it out yourself, you must run
`npm run build-standalone` after cloning this repository.

## Documentation

This project is full of tsdoc comments for your contextual viewing pleasure, even with the custom DOM events!

A good place to start would be taking a look at the documentation for the `<dropdown-menu>` element via the 
[`DropdownMenuElement` class](https://docs.aritzcracker.ca/npm/dropdown-menu-element/classes/DropdownMenuElement.html)

## Compatibility notes

Because Apple ["thinks different"](https://github.com/WebKit/standards-positions/issues/97), dropdown menus containing
`<form>` elements will not work properly on Safari at the time of writing. However, `<dropdown-menu>` elements which
are optionally children of `<form>` elements while also being grandparents of `<input>` elements will still work as
intended. As a side-note, An earlier version of this library extended upon `<ul>` and `<li>` elements to define the
menus.
