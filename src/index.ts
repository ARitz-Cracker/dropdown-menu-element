import { parseCSSTime, preventDefault } from "@aritz-cracker/browser-utils";

export type DropdownTriggeringClick = "primary" | "secondary" | "both";
/**
 * This is used to specify where the dropdown menu should be opened.
 * 
 * Note that in all cases, the position of the menu will be clamped to fit in the page, assuming the entire menu can
 * fit in the page.
 * 
 * * `pointer`: The top-left corner of the menu will be where the pointer is. Opening the menu rightward and downard
 *   If the pointer is close enough to the the right side of the page such that the menu wouldn't fit, the menu will be
 *   opened to the left of the pointer instead.
 * * `element-right-upward`: The bottom-left corner of the menu will be where the bottom-right corner of the element
 *   is, growing upward.
 * * `element-right-centered`: The left side of the menu will be where the right side of the triggering element is,
 *   keeping the same vertical center as the triggering element.
 * * `element-right-downward`: The top-left corner of the menu will be where the top-right corner of the element
 *   is, growing downward.
 * * `element-left-upward`: The bottom-right corner of the menu will be where the bottom-left corner of the element
 *   is, growing upward.
 * * `element-left-centered`: The right side of the menu will be where the left side of the triggering element is,
 *   keeping the same vertical center as the triggering element.
 * * `element-left-downward`: The top-right corner of the menu will be where the top-left corner of the element
 *   is, growing downward.
 * * `element-bottom-leftward`: The top-right corner of the menu will be where the bottom-right corner of the element
 *   is, growing leftward.
 * * `element-bottom-centered`: The top side of the menu will be where the bottom side of the triggering element is,
 *   keeping the same horizontal center as the triggering element.
 * * `element-bottom-rightward`: The top-left corner of the menu will be where the bottom-left corner of the element
 *   is, growing rightward.
 * * `element-top-leftward`: The bottom-right corner of the menu will be where the top-right corner of the element
 *   is, growing leftward.
 * * `element-top-centered`: The bottom side of the menu will be where the right side of the triggering element is,
 *   keeping the same horizontal center as the triggering element.
 * * `element-top-rightward`: The bottom-left corner of the menu will be where the top-left corner of the element
 *   is, growing rightward.
 */
export type DropdownOpenPosition =
	"pointer" |
	"element-right-upward" |
	"element-right-centered" | 
	"element-right-downward" |
	"element-left-upward" |
	"element-left-centered" | 
	"element-left-downward" |
	"element-bottom-leftward" |
	"element-bottom-centered" |
	"element-bottom-rightward" |
	"element-top-leftward" |
	"element-top-centered" |
	"element-top-rightward";

/**
 * The event type used in `element.addEventListener("dropdownSelect", ...)`
 * 
 * This is a [DOM event](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) using the
 * [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) type with the event name
 * `"dropdownSelect"`. The  {@link DropdownSelectEventDetails | `DropdownSelectEventDetails`} will be on the
 * `.details` property of this object.
 * 
 * When a menu option is selected, a non-bubbling version of this event is emitted on the {@link DropdownMenuElement}.
 * If that event isn't cancelled, (that is, if `preventDefault()` was not called) a bubbling version of this event is
 * emitted on the element which originally triggered the opening of the menu. If that event also isn't cancelled, then
 * the menu will be closed. Otherwise, if either event is cancelled, the menu will be prevented from closing.
 */
export type DropdownSelectEvent = CustomEvent<DropdownSelectEventDetails>
/**
 * The {@link DropdownSelectEvent | `"dropdownSelect"`} event details. See the documentation for each property for
 * further explination.
 */
export type DropdownSelectEventDetails = {
	/** The `<active-dropdown-menu-item>` selected. */
	selectedElement: ActiveDropdownMenuItemElement,
	/** The `<dropdown-menu-item>` used to create the `selectedElement`. */
	selectedElementOriginal: DropdownMenuItemElement,
	/** The value of the `value` attribute of the `selectedElementOriginal` at the time when the menu was opened. */
	selectedValue?: string,
	/** The `<dropdown-menu>` used to create the dropdown menu. */
	dropdownMenu: DropdownMenuElement,
	/**
	 * The linked element which triggered the opening of the menu. This would be the element in which the `"click"`
	 * or `"contextmenu"` event was listed to.
	 */
	triggeringElement: Element
};
/**
 * Callback function for `DropdownMenuElement`'s `ondropdownselect` property. Explicitly returning `false` will prevent
 * the menu from closing.
 */
export type DropdownSelectCallback = (details: DropdownSelectEventDetails) => void | undefined | boolean;

/**
 * The `"dropdownOpen"` event type. Calling `preventDefault()` on this event will prevent the menu from opening, and
 * the default "click" or "contextmenu" behaviour will not be prevented.
 */

/**
 * The event type used in `element.addEventListener("dropdownOpen", ...)`
 * 
 * This is a [DOM event](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) using the
 * [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail) type with the event name
 * `"dropdownSelect"`. The  {@link DropdownOpenEventDetails | `DropdownOpenEventDetails`} will be on the `.details`
 * property of this object.
 * 
 * This event is emitted when a root {@link DropdownMenuElement | `<dropdown-menu>`} is about to be opened. It does not
 * get emitted when a sub-menu opens.
 * 
 * When a menu is to be opened, a non-bubbling version of this event is emitted on the
 * {@link DropdownMenuElement | `<dropdown-menu>`}. If that event isn't cancelled, (that is, if `preventDefault()` was
 * not called) a bubbling version of this event is emitted on the element which originally triggered the opening of the
 * menu. If that event also isn't cancelled, then the default behaviour of the original `"click"` or `"contextmenu"`
 * event will be prevented, and the menu will open. Otherwise, the default behaviour of the original event will not be
 * prevented and the menu will not open.
 * 
 * Upon opening, a new {@link ActiveDropdownMenuElement | `<active-dropdown-menu>`} is created.
 */
export type DropdownOpenEvent = CustomEvent<DropdownOpenEventDetails>
/**
 * The {@link DropdownOpenEvent | `"dropdownOpen"`} event details. See the documentation for each property for further
 * explination.
 */
export type DropdownOpenEventDetails = {
	/** The `<dropdown-menu>` about to be opened. */
	dropdownMenu: DropdownMenuElement,
	/**
	 * The linked element which triggered the opening of the menu. This would be the element in which the `"click"`
	 * or `"contextmenu"` event was listed to.
	 */
	triggeringElement: Element
};
/**
 * Callback function for `DropdownMenuElement`'s `ondropdownopen` property. Explicitly returning `false` will prevent
 * the menu from opening, and the default "click" or "contextmenu" behaviour will not be prevented.
 */
export type DropdownOpenCallback = (details: DropdownOpenEventDetails) => void | undefined | boolean;
declare global {
	interface GlobalEventHandlersEventMap {
		"dropdownSelect": DropdownSelectEvent
		"dropdownOpen": DropdownOpenEvent
	}
}

function hide(elem: HTMLElement) {
	elem.hidden = true;
	elem.style.display = "none";
}
function unhide(elem: HTMLElement) {
	elem.hidden = false;
	elem.style.display = "";
}

let allowEvilAttributes = Boolean(document.documentElement.dataset.allowEvilAttributes);

/**
 * A root-level dropdown menu list. Represented as `<dropdown-menu>` in the document.
 * 
 * If you wish to create this element programatically, use `new DropdownMenuElement()`.
 * 
 * This element emits custom DOM events on both itself and the linked element which triggered it. This happens when a
 * menu is opened and when the user selects an option. For more information, see the linked documentation listed below.
 * 
 * * {@link DropdownOpenEvent | `"dropdownOpen"`}
 * * {@link DropdownSelectEvent | `"dropdownSelect"`}
 * 
 * This element has additional HTML attributes which can be used to define its behaviour. For more information, see the
 * linked documentation listed below.
 * 
 * * `click-trigger`: See the {@link DropdownMenuElement.clickTrigger | `clickTrigger` property}
 * * `linked-elements`: See the {@link DropdownMenuElement.linkedElements | `linkedElements` property}
 * * `ondropdownselect`: See the {@link DropdownMenuElement.ondropdownselect | `ondropdownselect` property}
 * * `ondropdownopen`: See the {@link DropdownMenuElement.ondropdownopen | `ondropdownopen` property}
 * * `open-position`: See the {@link DropdownMenuElement.openPosition | `openPosition` property}
 * 
 * The direct children of this element should _only_ be {@link DropdownMenuItemElement | `<dropdown-menu-item>`} or
 * `<hr>` elements.
 * 
 * If your menus contain inputs, such as check boxes or radio buttons, any programatic changes to their `value` and
 * `checked` properties will not be reflected while the menu is open. `"input"` and `"change"` events will still be
 * fired as normal when the user changes the input values.
 * 
 * If you want your menu to have sub-menus, see the
 * {@link DropdownMenuInnerElement | `<dropdown-menu-inner>` element}
 * 
 * Note that this element is always hidden, and a different element gets shown to the users when they invoke the menu.
 * Therefore, this element should not get targetted for styling. See the 
 * {@link ActiveDropdownMenuElement | `<active-dropdown-menu>` element} for details.
 */
export class DropdownMenuElement extends HTMLElement {
	static get observedAttributes() {
		return [
			"click-trigger",
			"linked-elements",
			"ondropdownselect",
			"ondropdownopen",
			"open-position"
		];
	}
	/**
	 * Whether or not `"ondropdownselect"` and `"ondropdownopen"` will evaluate string values as functions.
	 * The default value is `false`, Unless the root element (the top-most `<html>` or `<svg>`) has the
	 * `data-allow-evil-attributes` attribute set to anything other than an empty string when this library was loaded.
	 * 
	 * This is because it assumed that HTML sanitizers don't consider the creation of _new_ inline event handlers.
	 * 
	 * @param dragons set to `true` to be more vulnerable to XSS.
	 */
	static allowEvilAttributes(dragons: boolean) {
		allowEvilAttributes = dragons;
	}
	constructor() {
		super();
		this.addEventListener("dropdownSelect", (ev) => {
			if (this.#optionSelectCallback != null) {
				if (this.#optionSelectCallback(ev.detail) === false) {
					ev.preventDefault();
				}
			}
		});
		this.addEventListener("dropdownOpen", (ev) => {
			if (this.#openCallback != null) {
				if (this.#openCallback(ev.detail) === false) {
					ev.preventDefault();
				}
			}
		});
		// Cannot be called here, the constructor must not edit the child nodes (including attributes) in any way.
		// hide(this);
	}
	/**
	 * Opens the menu. The `MouseEvent` is used to determine the menu position along with the element which triggered
	 * the opening of the menu.
	 * 
	 * @param ev the event which should trigger the opening of this menu.
	 */
	open(ev: MouseEvent) {
		this.handleEvent(ev);
	}
	/**
	 * If the current active menu exists and was created from this element, then the active menu will be
	 * {@link ActiveDropdownMenuElement.close | closed}
	 */
	close() {
		if (activeRootDropdownMenu && activeRootDropdownMenu.originalRootMenu == this) {
			activeRootDropdownMenu.close();
		}
	}

	/**
	 * Used to handle "click" and "contextmenu" events of the linked elements. Currently an alias of
	 * {@link DropdownMenuElement.open | open}, though this may change in a manner which doesn't adhere to semver.
	 * @internal
	 */
	handleEvent(ev: MouseEvent) {
		if (!(ev.currentTarget instanceof Element)) {
			return;
		}
		if (activeRootDropdownMenu && activeRootDropdownMenu.originalRootMenu == this) {
			ev.preventDefault();
			activeRootDropdownMenu.close();
			return;
		}
		if (
			this.dispatchEvent(new CustomEvent("dropdownOpen", {
				cancelable: true,
				detail: {
					dropdownMenu: this,
					triggeringElement: ev.currentTarget
				} satisfies DropdownOpenEventDetails
			})) &&
			ev.currentTarget.dispatchEvent(new CustomEvent("dropdownOpen", {
				bubbles: true,
				cancelable: true,
				detail: {
					dropdownMenu: this,
					triggeringElement: ev.currentTarget
				} satisfies DropdownOpenEventDetails
			}))
		) {
			ev.preventDefault();
			const newActiveMenu = new ActiveDropdownMenuElement({
				menuTemplate: this,
				originalRootMenu: this,
				originalTriggeringElement: ev.currentTarget,
			});
			newActiveMenu.style.setProperty(
				'--triggering-element-client-width',
				ev.currentTarget.clientWidth + "px"
			);
			newActiveMenu.style.setProperty(
				'--triggering-element-client-height',
				ev.currentTarget.clientHeight + "px"
			);
			if (ev.currentTarget instanceof HTMLElement) {
				newActiveMenu.style.setProperty(
					'--triggering-element-offset-width',
					ev.currentTarget.offsetWidth + "px"
				);
				newActiveMenu.style.setProperty(
					'--triggering-element-offset-height',
					ev.currentTarget.clientHeight + "px"
				);
			}
			newActiveMenu.open(ev, this.openPosition);
		}
	}
	

	#optionSelectCallback: DropdownSelectCallback | null = null;
	/**
	 * Callback function to call when a menu item has been selected. Explicitly returning `false` will pervent the menu
	 * from closing.
	 * 
	 * If {@link DropdownMenuElement.allowEvilAttributes | `allowEvilAttributes`} has been set to `true`, this can also
	 * be set to a `string` which will be evaluated, therefore enabling the use of the `ondropdownselect` attribute as
	 * an inline event handler. The inline event handler will be passed a {@link DropdownSelectEventDetails | `details`}
	 * parameter.
	 */
	get ondropdownselect(): DropdownSelectCallback | null {
		return this.#optionSelectCallback;
	}
	set ondropdownselect(v: string | DropdownSelectCallback | null) {
		if (v == null) {
			this.removeAttribute("ondropdownselect");
		} else if (typeof v !== "string"){
			this.setAttribute("ondropdownselect", "function () { [hidden code] }");
			this.#optionSelectCallback = v;
		} else {
			this.setAttribute("ondropdownselect", v);
		}
	}
	#openCallback: DropdownOpenCallback | null = null;
	/**
	 * Callback function to call when a menu item has been selected. Explicitly returning `false` will pervent the menu
	 * from opening, and the default "click" or "contextmenu" behaviour will not be prevented.
	 * 
	 * If {@link DropdownMenuElement.allowEvilAttributes | `allowEvilAttributes`} has been set to `true`, this can also
	 * be set to a `string` which will be evaluated, therefore enabling the use of the `ondropdownopen` attribute as an
	 * inline event handler. The inline event handler will be passed a {@link DropdownSelectEventDetails | `details`}
	 * parameter.
	 */
	get ondropdownopen(): DropdownOpenCallback | null {
		return this.#openCallback;
	}
	set ondropdownopen(v: string | DropdownOpenCallback | null) {
		if (v == null) {
			this.removeAttribute("ondropdownopen");
		} else if (typeof v !== "string"){
			this.setAttribute("ondropdownopen", "function () { [hidden code] }");
			this.#optionSelectCallback = v;
		} else {
			this.setAttribute("ondropdownopen", v);
		}
	}

	#linkedElements: NodeListOf<Element> | null = null;
	#linkedElementsSelector: string | null = null;
	/**
	 * Reflects the value of the `linked-elements` attribute, which is a query selector defining all the elements to
	 * listen for  `"click"` or `"contextmenu"` events.
	 * 
	 * This selector is ran from the root element's scope. In most cases, that will effectively be the same as
	 * `document`.
	 * 
	 * The selector can contain the string `#this`, which works exactly as it sounds, enabling simple selectors like
	 * `#this + *` meaning the direct sibling after this element, or `*:has(+ #this)` meaning the direct sibling before
	 * this element. Though this will only function if the document does not already contain an element with an ID of
	 * `this`.
	 * 
	 * For more information as to how the selector is used and when it is queried, see the
	 * {@link DropdownMenuElement.refreshLinkedElements | `refreshLinkedElements()` method}. 
	 * 
	 */
	get linkedElements(): string | null {
		return this.#linkedElementsSelector;
	}
	set linkedElements(value: string | null) {
		if (value == null) {
			this.removeAttribute("linked-elements");
		} else {
			this.setAttribute("linked-elements", value);
		}
	}
	/**
	 * Removes this element as an event listener from all previously linked elements, if any, then Listens to the
	 * `"click"` or `"contextmenu"` events, depending on what the
	 * {@link DropdownMenuElement.clickTrigger | `click-trigger`} attribute is set to, on all the elements specified by
	 * the {@link DropdownMenuElement.linkedElements | `linked-elements`} attribute.
	 * 
	 * When the relevant event is emitted on the relevant elements, the menu is opened.
	 * 
	 * This method is automatically called under the following circumstances
	 * 
	 * * When this element is added to the DOM (though not if it is simply moved)
	 * * When this element is removed from the DOM
	 * * When the {@link DropdownMenuElement.linkedElements | `linked-elements`} attribute changes
	 * * When the {@link DropdownMenuElement.clickTrigger | `click-trigger`} attribute changes
	 */
	refreshLinkedElements() {
		if (this.#linkedElements) {
			this.#linkedElements.forEach(elem => {
				if (
					elem.ariaHasPopup == "menu" || elem.ariaHasPopup == "true"
				) {
					elem.ariaHasPopup = null;
				}
				elem.removeEventListener("click", this);
				elem.removeEventListener("contextmenu", this);
			});
			this.#linkedElements = null;
		}
		if (!this.#linkedElementsSelector || !this.isConnected) {
			return;
		}
		try{
			if (!this.id) {
				this.id = "this";
			}
			this.#linkedElements = (
				// Shouldn't getRootNode always return a ParentNode? (Even if ParentNode is a ts invention?)
				this.getRootNode() as ParentNode
			).querySelectorAll(this.#linkedElementsSelector);
			this.#linkedElements.forEach(elem => {
				switch(this.#clickTrigger) {
					case "secondary":
						elem.addEventListener("contextmenu", this);
						break;
					case "both":
						elem.addEventListener("contextmenu", this);
						// Falls through
					case "primary":
						elem.addEventListener("click", this);
						if (
							elem instanceof HTMLButtonElement ||

							elem.getAttribute("role") == "button"
						) {
							elem.ariaHasPopup = "menu";
						}
						break;
					default:
						// no default

				}
			});
		} finally {
			if (this.id == "this") {
				this.id = "";
			}
		}
	}

	#clickTrigger: DropdownTriggeringClick = "secondary";
	/**
	 * Reflects the value of the `click-trigger` attribute. If not set, or set to an invalid value, this defaults to
	 * `"secondary"`.
	 * 
	 * A value of `"primary"` means this menu will be opened on `"click"` events. A value of `"secondary"`, means this
	 * menu will be opened on `"contextmenu"` events. A value of "both" listens to both.
	 */
	get clickTrigger(): DropdownTriggeringClick {
		return this.#clickTrigger;
	}
	set clickTrigger(v: string | null) {
		if (v == null) {
			this.removeAttribute("click-trigger");
		} else {
			this.setAttribute("click-trigger", DropdownMenuElement.normalizeClickTriggerAttribute(v));
		}
	}
	static normalizeClickTriggerAttribute(v: string | null): DropdownTriggeringClick {
		switch (v) {
			case "primary":
			case "both":
				return v;
			case "secondary":
			default:
				return "secondary";
		}
	}

	#openPosition: DropdownOpenPosition | null = null;
	/**
	 * Reflects the value of the `open-position` attribute. If not set, or set to an invalid value, this defaults to
	 * `"element-bottom-rightward"` if {@link DropdownMenuElement.clickTrigger | `click-trigger`} is `"primary" ||
	 * "both"`, or `"pointer"` if {@link DropdownMenuElement.clickTrigger | `click-trigger`} is `"secondary"`.
	 * 
	 * See the {@link DropdownOpenPosition} documentation for details
	 */
	get openPosition(): DropdownOpenPosition {
		if (this.#openPosition) {
			return this.#openPosition;
		}
		switch (this.#clickTrigger) {
			case "primary":
			case "both":
				return "element-bottom-rightward";
			default:
				return "pointer";
		}
	}
	set openPosition(v: string | null) {
		const actualNewValue = DropdownMenuElement.normalizeOpenPositionAttribute(v);
		if (actualNewValue == null) {
			this.removeAttribute("click-trigger");
		} else {
			this.setAttribute("click-trigger", actualNewValue);
		}
	}
	static normalizeOpenPositionAttribute(v : string | null): DropdownOpenPosition | null {
		switch (v) {
			case "element-bottom-centered":
			case "element-bottom-leftward":
			case "element-bottom-rightward":
			case "element-left-centered":
			case "element-left-downward":
			case "element-left-upward":
			case "element-right-centered":
			case "element-right-downward":
			case "element-right-upward":
			case "element-top-centered":
			case "element-top-leftward":
			case "element-top-rightward":
			case "pointer":
				return v as DropdownOpenPosition;
			default:
				return null;
		}
	}
	/**
	 * @internal
	 */
	attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
		switch (name) {
			case "ondropdownselect": {
				if (newValue == null) {
					this.#optionSelectCallback = null;
				} else if (newValue != "function () { [hidden code] }" && allowEvilAttributes) {
					this.#optionSelectCallback = new Function("details", newValue) as DropdownSelectCallback;
				}
				break;
			}
			case "ondropdownopen": {
				if (newValue == null) {
					this.#openCallback = null;
				} else if (newValue != "function () { [hidden code] }" && allowEvilAttributes) {
					this.#openCallback = new Function("details", newValue) as DropdownOpenCallback;
				}
				break;
			}
			case "linked-elements": {
				this.#linkedElementsSelector = newValue;
				this.refreshLinkedElements();
				break;
			}
			case "click-trigger": {
				this.#clickTrigger = DropdownMenuElement.normalizeClickTriggerAttribute(newValue);
				this.refreshLinkedElements();
				break
			}
			case "open-position": {
				this.#openPosition = DropdownMenuElement.normalizeOpenPositionAttribute(newValue);
			}
		}
	}
	/**
	 * @internal
	 */
	connectedCallback() {
		hide(this);
		this.refreshLinkedElements();
	}
	/**
	 * @internal
	 */
	disconnectedCallback() {
		this.refreshLinkedElements();
	}
	/**
	 * @internal
	 */
	adoptedCallback() {
		this.refreshLinkedElements();
	}
}
customElements.define("dropdown-menu", DropdownMenuElement);

/**
 * A dropdown menu item. Represented as `<dropdown-menu-item>` in the document.
 * 
 * This element has additional HTML attributes which can be used to define its behaviour. For more information, see the
 * linked documentation listed below.
 * 
 * * `disabled`: See the {@link DropdownMenuItemElement.disabled | `disabled` property}
 * * `value`: See the {@link DropdownMenuItemElement.value | `value` property}
 * 
 */
export class DropdownMenuItemElement extends HTMLElement {
	static get observedAttributes() {
		return [
			"value",
			"disabled"
		];
	}
	constructor() {
		super();
	}
	#disabled: boolean = false;
	/**
	 * Is `true` if the `disabled` attribute exists, including if it's set to an empty string. `false` otherwise.
	 * 
	 * Note that setting this value will not set the corresponding value on the
	 * {@link ActiveDropdownMenuItemElement | `<active-dropdown-menu-item>`} after it is opened.
	 */
	get disabled() {
		return this.#disabled;
	}
	set disabled(value: boolean) {
		if (value) {
			this.setAttribute("disabled", "");
		} else {
			this.removeAttribute("disabled");
		}
	}
	#value: string | undefined;
	/**
	 * Reflects the value of the `value` attribute. If not set, defaults to `undefined`. This value will be passed to
	 * {@link DropdownSelectEventDetails.selectedValue | `details.selectedValue` } property of the
	 * {@link DropdownSelectEvent | `"dropdownSelect"`} event if the corresponding
	 * {@link ActiveDropdownMenuItemElement | `<active-dropdown-menu-item>`} is selected.
	 * 
	 * Note that setting this value will not set the corresponding value on the
	 * {@link ActiveDropdownMenuItemElement | `<active-dropdown-menu-item>`}  after it is opened.
	 */
	get value() {
		return this.#value;
	}
	set value(value: string | undefined) {
		if (typeof value == "string") {
			this.setAttribute("value", value);
		} else {
			this.removeAttribute("value");
		}
	}
	/**
	 * @internal
	 */
	attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
		switch (name) {
			case "disabled": 
				this.#disabled = newValue != null;
				break;
			case "value":
				this.#value = newValue ?? undefined;
				break;
			default:
		}
	}
}
customElements.define("dropdown-menu-item", DropdownMenuItemElement);

/**
 * A dropdown sub-menu. Represented as `<dropdown-menu-inner>` in the document.
 * 
 * The direct children of this element should _only_ be {@link DropdownMenuItemElement | `<dropdown-menu-item>` } or
 * `<hr>` elements.
 * 
 * This element must be a part of one of 4 specific tree structures, as shown below:
 * ```html
 * …
 * <dropdown-menu>
 *     …
 *     <dropdown-menu-item>
 *         …
 *         <dropdown-menu-inner><!--Your sub-menu here--></dropdown-menu-inner>
 *         …
 *     </dropdown-menu-item>
 *     …
 * </dropdown-menu>
 * …
 * ```
 * or
 * ```html
 * …
 * <dropdown-menu-inner>
 *     …
 *     <dropdown-menu-item>
 *         …
 *         <dropdown-menu-inner><!--Your sub-menu here--></dropdown-menu-inner>
 *         …
 *     </dropdown-menu-item>
 *     …
 * </dropdown-menu-inner>
 * …
 * ```
 * or
 * ```html
 * …
 * <dropdown-menu>
 *     …
 *     <dropdown-menu-item>
 *         …
 *         <form>
 *             …
 *             <dropdown-menu-inner><!--Your sub-menu here--></dropdown-menu-inner>
 *             …
 *         </form>
 *         …
 *     </dropdown-menu-item>
 *     …
 * </dropdown-menu>
 * …
 * ```
 * or
 * ```html
 * …
 * <dropdown-menu-inner>
 *     …
 *     <dropdown-menu-item>
 *         …
 *         <form>
 *             …
 *             <dropdown-menu-inner><!--Your sub-menu here--></dropdown-menu-inner>
 *             …
 *         </form>
 *         …
 *     </dropdown-menu-item>
 *     …
 * </dropdown-menu-inner>
 * …
 * ```
 */
export class DropdownMenuInnerElement extends HTMLElement {
	constructor() {
		super();
	}
	/**
	 * Returns true if this element is where it should be. False otherwise
	 */
	validChild() {
		return (
			(
				this.parentElement?.tagName == "DROPDOWN-MENU-ITEM" &&
				(
					this.parentElement.parentElement?.tagName == "DROPDOWN-MENU" ||
					this.parentElement.parentElement?.tagName == "DROPDOWN-MENU-INNER"
				)
			) || (
				this.parentElement?.tagName == "FORM" &&
				this.parentElement.parentElement?.tagName == "DROPDOWN-MENU-ITEM" &&
				(
					this.parentElement.parentElement.parentElement?.tagName == "DROPDOWN-MENU" ||
					this.parentElement.parentElement.parentElement?.tagName == "DROPDOWN-MENU-INNER"
				)
			)
		);
	}
	/**
	 * @internal
	 */
	connectedCallback() {
		if (!this.validChild()) {
			console.error(
				"<dropdown-menu-inner> has been used in a place which is inappropriate. " +
				"Only the following tree states are valid: " +
				"*:is(dropdown-menu-inner, dropdown-menu) > dropdown-menu-item > dropdown-menu-inner, " +
				"*:is(dropdown-menu-inner, dropdown-menu) > dropdown-menu-item > form > dropdown-menu-inner"
			);
		}
	}
	/**
	 * @internal
	 */
	adoptedCallback() {
		this.connectedCallback();
	}
}
customElements.define("dropdown-menu-inner", DropdownMenuInnerElement);

let activeRootDropdownMenu: ActiveDropdownMenuElement | null = null;

document.addEventListener("contextmenu", (ev) => {
	if (activeRootDropdownMenu) {
		const clickedElem = ev.target as Element | null;
		if (
			activeRootDropdownMenu.contains(clickedElem) ||
			(
				activeRootDropdownMenu.originalRootMenu.clickTrigger != "primary" &&
				activeRootDropdownMenu.triggeringElement.contains(clickedElem)
			)
		) {
			return;
		}
		activeRootDropdownMenu.close();
		ev.preventDefault();
	}
});
let clickEventIsPointerEvent: boolean = false;
document.addEventListener("click", (ev) => {
	// At the time of writing, false for FF+Safari, true for Chromium.
	// My hacky code to get keyboard inputs to work without this.
	clickEventIsPointerEvent = typeof PointerEvent !== "undefined" &&
		Object.getPrototypeOf(ev).constructor == PointerEvent;
	if (activeRootDropdownMenu) {
		const clickedElem = ev.target as Element | null;
		if (
			activeRootDropdownMenu.contains(clickedElem) ||
			(
				activeRootDropdownMenu.originalRootMenu.clickTrigger != "secondary" &&
				activeRootDropdownMenu.triggeringElement.contains(clickedElem)
			)
		) {
			return;
		}
		activeRootDropdownMenu.close();
	}
});

/**
 * This is the menu which actually gets shown to the user. Represented by `<active-dropdown-menu>` in the document.
 * 
 * It is automatically created and appended to the end of the `<body>` whenever a
 * {@link DropdownOpenEvent | `"dropdownOpen"`} event is emitted without being cancelled. It is not intended to be
 * created by anything other than this library.
 * 
 * Creating a new element and appending it at the end of the body ensures that the full menu will still be shown even
 * when defined within elements with the `overflow: hidden` CSS rule.
 * 
 * When created, this uses the root `<dropdown-menu>`, along with any `<dropdown-menu-inner>` elements as templates. 
 * 
 * It follows the same structure as a `<dropdown-menu>`, except all `<dropdown-menu-inner>` elements
 * are replaced with `<active-dropdown-menu>` elements, and all `<dropdown-menu-item>` elements are replaced with
 * {@link ActiveDropdownMenuItemElement | `<active-dropdown-menu-item>`} elements.
 * 
 * For the purposes of CSS styling, here are some tips:
 * * Use `active-dropdown-menu-item:has(active-dropdown-menu)::after` to add a menu charm to hint at the existance of a
 *   sub-menu.
 * * Highlighted menu options can targeted using `active-dropdown-menu-item:focus`. Using `:hover` is unnecessary.
 * * Use `active-dropdown-menu-item:has(active-dropdown-menu:not([inert]))` to target a
 *   `<active-dropdown-menu-item>` which has its sub-menu currently open.
 * * Use `active-dropdown-menu-item[disabled]` to target a menu item that's disabled. the `:disabled` pseudo class
 *   won't work.
 * * In order to help with CSS animations, this element uses the following classes.
 *   * `dropdown-upward`: the menu should expand upward
 *   * `dropdown-downward`: the menu should expand downward
 *   * `dropdown-leftward`: the menu should expand to the left
 *   * `dropdown-rightward`: the menu should expand to the right
 *   * `dropdown-closing`: the menu is about to be closed or removed. If any of the `animation-*` CSS properties change
 *     when this class is applied, then this element will not be removed until the animation finishes playing, unless
 *     the animation is set to play infinitely, in which case it is ignored. While the closing animation plays, this
 *     element will be set to "inert", allowing users to interact with the page as if the menu didn't exist.
 * * If a `<active-dropdown-menu-item>` is activated, that is, if it was clicked on or if the enter key was pressed
 *   while it is focuses, then a `dropdown-selected` class will be added to the `<active-dropdown-menu-item>` at the
 *   same time when the `dropdown-closing` class is added to the `<active-dropdown-menu>`. Note that this class will
 *   have no affect as to when the element is removed.
 */
export class ActiveDropdownMenuElement extends HTMLElement {
	/**
	 * @returns the root active menu if it exists
	 */
	static getActiveRoot(): ActiveDropdownMenuElement | null {
		return activeRootDropdownMenu;
	}
	/**
	 * closes the active menu if it exists
	 */
	static closeActiveRoot() {
		if (activeRootDropdownMenu) {
			activeRootDropdownMenu.close();
		}
	}

	#linkedFormMap: Map<HTMLFormElement, ActiveDropdownMenuFormContextElement> | undefined
	/**
	 * @internal
	 */
	_getFormContext(form: HTMLFormElement): ActiveDropdownMenuFormContextElement {
		const rootMenu = this.#rootMenu;
		const linkedFormMap = rootMenu.#linkedFormMap!;
		
		let result = linkedFormMap.get(form);
		if (!result) {
			result = new ActiveDropdownMenuFormContextElement({
				originalElement: form
			});
			linkedFormMap.set(form, result);
			rootMenu.appendChild(result);
		}
		return result;
	}
	/**
	 * @internal
	 */
	_addFormContext(form: HTMLFormElement, context: ActiveDropdownMenuFormContextElement) {
		const rootMenu = this.#rootMenu;
		const linkedFormMap = rootMenu.#linkedFormMap!;
		linkedFormMap.set(form, context);
	}
	#rootMenu: ActiveDropdownMenuElement
	get rootMenu() {
		return this.#rootMenu;
	}
	#triggeringElement: Element
	get triggeringElement() {
		return this.#triggeringElement;
	}
	#originalRootMenu: DropdownMenuElement
	get originalRootMenu() {
		return this.#originalRootMenu;
	}
	#originalTriggeringElement: Element
	get originalTriggeringElement() {
		return this.#originalTriggeringElement;
	}
	/**
	 * @internal
	 */
	constructor(options: {
		menuTemplate: DropdownMenuElement | DropdownMenuInnerElement,
		rootMenu?: ActiveDropdownMenuElement,
		triggeringElement?: Element,
		originalRootMenu: DropdownMenuElement,
		originalTriggeringElement: Element,
	}) {
		if (!options) {
			throw new Error("<active-dropdown-menu> isn't designed to be used on its own");
		}
		super();
		const {
			menuTemplate,
			rootMenu,
			triggeringElement = options.originalTriggeringElement,
			originalRootMenu,
			originalTriggeringElement,
		} = options;

		if (!rootMenu) {
			this.#linkedFormMap = new Map();
		}
		this.addEventListener("contextmenu", ev => {ev.preventDefault()});
		this.#menuTemplate = menuTemplate;
		this.#rootMenu = rootMenu ?? this;
		this.#triggeringElement = triggeringElement;
		this.#originalRootMenu = originalRootMenu;
		this.#originalTriggeringElement = originalTriggeringElement;
		
	}
	#menuTemplate: DropdownMenuElement | DropdownMenuInnerElement;
	#pendingOpen: [MouseEvent, DropdownOpenPosition] | undefined;
	connectedCallback() {
		this.setAttribute("role", "menu");
		this.style.position = "absolute";
		this.style.zIndex = (2 ** 30) + "";
		this.inert = true;
		hide(this);
		if (this.childElementCount == 0) {
			this.classList.value = this.#menuTemplate.classList.value;
			for (let i = 0; i < this.#menuTemplate.childElementCount; i += 1) {
				const childElement = this.#menuTemplate.children[i];
				if (childElement instanceof HTMLHRElement) {
					this.appendChild(childElement.cloneNode(true));
				}else if (childElement instanceof DropdownMenuItemElement) {
					this.appendChild(
						new ActiveDropdownMenuItemElement({
							parentMenu: this,
							originalElement: childElement
						})
					)
				}
			}
		}
		if (this.#pendingOpen) {
			this.open(...this.#pendingOpen);
			this.#pendingOpen = undefined;
		}
	}
	/**
	 * Gets the first non-disabled `<active-dropdown-menu-item>` on the list if there is any.
	 */
	get firstMenuItem(): ActiveDropdownMenuItemElement | null {
		let firstItem = this.firstElementChild;
		while(
			firstItem != null &&
			(
				!(firstItem instanceof ActiveDropdownMenuItemElement) ||
				firstItem.disabled
			)
		) {
			firstItem = firstItem.nextElementSibling;
		}
		return firstItem;
	}
	/**
	 * Gets the last non-disabled `<active-dropdown-menu-item>` on the list if there is any.
	 */
	get lastMenuItem(): ActiveDropdownMenuItemElement | null {
		let lastItem = this.lastElementChild;
		while(
			lastItem != null &&
			(
				!(lastItem instanceof ActiveDropdownMenuItemElement) ||
				lastItem.disabled
			)
		) {
			lastItem = lastItem.previousElementSibling;
		}
		return lastItem;
	}
	#pageXPos: number = 0;
	get pageXPos(): number {
		return this.#pageXPos;
	}
	#pageYPos: number = 0;
	get pageYPos(): number {
		return this.#pageYPos;
	}
	#closeAnimationTimeout: ReturnType<typeof setTimeout> | undefined;
	#inModal: boolean = false;
	/**
	 * @internal
	 */
	open(event: MouseEvent, position: DropdownOpenPosition) {
		if (!this.isConnected) {
			// If this isn't already in the document when an open was requested, then this is probably a root menu.
			if (activeRootDropdownMenu) {
				activeRootDropdownMenu.close();
			}
			activeRootDropdownMenu = this;
			// The connectedCallback automatically hides this element (as it cannot be done in the constructor), so we
			// must attempt to open this menu again after we're in the document.
			this.#pendingOpen = [event, position];

			// The only way (at the time of writing) we can draw over modals is to also be a modal
			if (this.#originalRootMenu.matches("dialog:modal dropdown-menu")) {
				this.#inModal = true;
				const modal = document.createElement("dialog");
				modal.addEventListener("close", (_) => {
					modal.remove();
				});
				modal.addEventListener("cancel", preventDefault);
				modal.append(this);
				modal.style.background = "none";
				modal.style.margin = "0";
				modal.style.padding = "0";
				modal.style.border = "none";
				modal.style.width = "100%";
				modal.style.height = "100%";
				modal.style.maxWidth = "100%";
				modal.style.maxHeight = "100%";
				document.body.append(modal);
				if (getComputedStyle(modal, "::backdrop").background != "none") {
					const style = document.createElement("style");
					style.innerHTML = "dialog:has(active-dropdown-menu:only-child)::backdrop {background: none !important;}";
					document.head.append(style);
				}
				modal.showModal();
			} else {
				document.body.append(this);
			}
			return;
		}
		if (!this.inert) {
			// probably already opened
			return;
		}
		if (this.#closeAnimationTimeout != undefined) {
			clearTimeout(this.#closeAnimationTimeout);
		}

		const maxY = Math.floor(
			Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight, 
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			)
		);
		const maxX = Math.floor(
			Math.max(
				document.body.scrollWidth,
				document.body.offsetWidth,
				document.documentElement.clientWidth,
				document.documentElement.scrollWidth,
				document.documentElement.offsetWidth
			)
		);
		this.classList.remove(
			"dropdown-closing",
			"dropdown-upward",
			"dropdown-downward",
			"dropdown-leftward",
			"dropdown-rightward"
		);
		unhide(this); // this.clientWidth and this.clientHeight won't work while this is hidden.
		let pageXPos = 0;
		let pageYPos = 0;

		const trigElemBoundingBox =
			// Don't bother getting the bbox if we're not using it, but keep the TS lie alive.
			position == "pointer" ? new DOMRect() :
			// FIXME: MDN Notes that Safari on iOS returns incorrect values while zoomed-in. This should be tested
			this.triggeringElement.getBoundingClientRect();
		
		const trigElemPagePosLeft = trigElemBoundingBox.left + window.scrollX;
		const trigElemPagePosRight = trigElemBoundingBox.right + window.scrollX;
		const trigElemPagePosTop = trigElemBoundingBox.top + window.scrollY;
		const trigElemPagePosBottom = trigElemBoundingBox.bottom + window.scrollY;
		
		
		// Make some reasonable corrections, 
		switch (position) {
			case "element-bottom-centered":
			case "element-bottom-leftward":
			case "element-bottom-rightward":
				if (
					(trigElemPagePosBottom + this.clientHeight) > maxY &&
					(trigElemPagePosTop - this.clientHeight) > 0
				) {
					position = (
						"element-top-" + position.substring(15) // "element-bottom-".length;	
					) as DropdownOpenPosition;
				}
				break;
			case "element-left-centered":
			case "element-left-downward":
			case "element-left-upward":
				if (
					(trigElemPagePosLeft - this.clientWidth) < 0 &&
					(trigElemPagePosRight + this.clientWidth) < maxX
				) {
					position = (
						"element-right-" + position.substring(13) // "element-left-".length;	
					) as DropdownOpenPosition;
				}
				break;
			case "element-right-centered":
			case "element-right-downward":
			case "element-right-upward":
				if (
					(trigElemPagePosRight + this.clientWidth) > maxX &&
					(trigElemPagePosLeft - this.clientWidth) > 0
				) {
					position = (
						"element-left-" + position.substring(14) // "element-right-".length;	
					) as DropdownOpenPosition;
				}
				break;
			case "element-top-centered":
			case "element-top-leftward":
			case "element-top-rightward":
				if (
					(trigElemPagePosTop - this.clientHeight) < 0 &&
					(trigElemPagePosBottom + this.clientHeight) < maxY
				) {
					position = (
						"element-bottom-" + position.substring(12) // "element-top-".length;	
					) as DropdownOpenPosition;
				}
				break;
		}
		// Sometimes this special sauce is needed during multiple classList changes to refresh the animation
		void this.offsetWidth;
		switch (position) {
			case "element-bottom-centered":
				pageXPos = Math.round((trigElemPagePosLeft + trigElemPagePosRight) / 2 - (this.offsetWidth / 2));
				pageYPos = Math.ceil(trigElemPagePosBottom)
				this.classList.add("dropdown-downward");
				break;
			case "element-bottom-leftward":
				// bottom-right, towards left
				pageXPos = Math.round(trigElemPagePosRight - this.offsetWidth);
				pageYPos = Math.ceil(trigElemPagePosBottom);
				this.classList.add("dropdown-downward");
				break;
			case "element-bottom-rightward":
				// bottom-left, towards right
				pageXPos = Math.round(trigElemPagePosLeft);
				pageYPos = Math.ceil(trigElemPagePosBottom);
				this.classList.add("dropdown-downward");
				break;
			case "element-left-centered":
				pageXPos = Math.floor(trigElemPagePosLeft - this.offsetWidth);
				pageYPos = Math.round((trigElemPagePosTop + trigElemPagePosBottom) / 2 - (this.clientHeight / 2));
				this.classList.add("dropdown-leftward");
				break;
			case "element-left-downward":
				pageXPos = Math.floor(trigElemPagePosLeft - this.offsetWidth);
				pageYPos = Math.round(trigElemPagePosTop);
				this.classList.add("dropdown-leftward");
				break;
			case "element-left-upward":
				pageXPos = Math.floor(trigElemPagePosLeft - this.offsetWidth);
				pageYPos = Math.round(trigElemPagePosBottom - this.clientHeight);
				this.classList.add("dropdown-leftward");
				break;
			case "element-right-centered":
				pageXPos = Math.ceil(trigElemPagePosRight);
				pageYPos = Math.round((trigElemPagePosTop + trigElemPagePosBottom) / 2 - (this.clientHeight / 2));
				this.classList.add("dropdown-rightward");
				break;
			case "element-right-downward":
				pageXPos = Math.ceil(trigElemPagePosRight);
				pageYPos = Math.round(trigElemPagePosTop);
				this.classList.add("dropdown-rightward");
				break;
			case "element-right-upward":
				pageXPos = Math.ceil(trigElemPagePosRight);
				pageYPos = Math.round(trigElemPagePosBottom - this.clientHeight);
				this.classList.add("dropdown-rightward");
				break;
			case "element-top-centered":
				pageXPos = Math.round((trigElemPagePosLeft + trigElemPagePosRight) / 2 - (this.offsetWidth / 2));
				pageYPos = Math.floor(trigElemPagePosTop - this.clientHeight);
				this.classList.add("dropdown-upward");
				break;
			case "element-top-leftward":
				// top-right, towards left
				pageXPos = Math.round(trigElemPagePosRight - this.offsetWidth);
				pageYPos = Math.floor(trigElemPagePosTop - this.clientHeight);
				this.classList.add("dropdown-upward");
				break;
			case "element-top-rightward":
				// top-left, towards right
				pageXPos = Math.round(trigElemPagePosLeft);
				pageYPos = Math.floor(trigElemPagePosTop - this.clientHeight);
				this.classList.add("dropdown-upward");
				break;
			case "pointer":
				pageXPos = Math.ceil(event.pageX);
				pageYPos = Math.ceil(event.pageY);
				if ((event.pageY + this.clientHeight) > maxY) {
					if ((event.pageX + this.clientWidth) > maxX) {
						pageXPos -= this.offsetWidth;
						this.classList.add("dropdown-leftward");
					} else {
						this.classList.add("dropdown-rightward");
					}
				} else {
					this.classList.add("dropdown-downward");
				}
		}
		// Clamp the menu position so hopefully the entire thing fits within view
		pageXPos -= Math.max(0, pageXPos + this.offsetWidth - maxX);
		pageXPos = Math.max(0, pageXPos);
		pageYPos -= Math.max(0, pageYPos + this.offsetHeight - maxY);
		pageYPos = Math.max(0, pageYPos);

		

		this.#pageXPos = pageXPos;
		this.#pageYPos = pageYPos;
		if (this.triggeringElement.parentElement instanceof ActiveDropdownMenuElement) {
			// ActiveDropdownMenuElement also has "position: absolute", which means that the "top" and "left" rules
			// will be relative to that instead of the body.
			pageXPos -= this.triggeringElement.parentElement.pageXPos;
			pageYPos -= this.triggeringElement.parentElement.pageYPos;

			// We must also account for the parent menu's border and padding.
			pageXPos -= (
				(
					this.triggeringElement.parentElement.offsetWidth -
					this.triggeringElement.parentElement.clientWidth
				) / 2
			);
			pageYPos -= (
				(
					this.triggeringElement.parentElement.offsetHeight -
					this.triggeringElement.parentElement.clientHeight
				) / 2
			);

			// Let's account for ours too on the Y axis since having the menus (mostly) align looks prettier
			pageYPos -= (this.offsetHeight - this.clientHeight);
		}
		if (this.#inModal) {
			pageXPos -= (event.pageX - event.clientX);
			pageYPos -= (event.pageY - event.clientY);
			if (this.#rootMenu == this && this.parentElement) {
				this.parentElement.inert = false;
				this.parentElement.style.pointerEvents == "";
				this.parentElement.style.userSelect == "";
			}
		}
		this.style.left = pageXPos + "px";
		this.style.top = pageYPos + "px";
		this.inert = false;
		if (document.querySelector(":focus-visible") != null) {
			// Probably using keyboard navigation
			this.firstMenuItem?.focus();
		}
	}
	/**
	 * Closes the sub-menu if it is opened
	 */
	closeSubMenu(except?: ActiveDropdownMenuElement) {
		// Yes, I am assuming there's only 1 opened sub-menu
		const subMenu = this.querySelector("active-dropdown-menu:not([inert])") as ActiveDropdownMenuElement | null;
		if (subMenu == null || subMenu == except) {
			return;
		}
		subMenu.close();
	}
	/**
	 * Calls `.focus()` On the first item on the inner-most opened sub-menu if it exists, else calls `.focus()` on the
	 * first non-disabled item on this list if it exists.
	 */
	focusDefaultItem() {
		const subMenu = this.querySelector("active-dropdown-menu:not([inert])") as ActiveDropdownMenuElement | null;
		if (subMenu == null) {
			this.firstMenuItem?.focus();
		} else {
			subMenu.focusDefaultItem();
		}
	}
	/**
	 * Closes this menu, and calls .focus() on the element which triggered the creation of this.
	 * If this is a sub-menu, that would be the parent list-item. Otherwise it would be the linked element
	 * associted with the root menu.
	 * 
	 * This function also add the `dropdown-closing` class to this element. If the `animation` CSS property changes
	 * after applying that class, then this element will become "inert" (not reacting to user input and allowing users
	 * to click "through" this element) and will be finally removed after the animation finishes playing.
	 */
	close() {
		if (this.inert) {
			// probably already closing
			return;
		}
		this.inert = true;
		const {animation: oldFullAnimation} = getComputedStyle(this);
		this.classList.add("dropdown-closing");
		const {
			animationDelay,
			animationDuration,
			animationIterationCount,
			animationFillMode,
			animation: newFullAnimation
		} = getComputedStyle(this);
		const animationTime =
			parseCSSTime(animationDelay) +
			parseCSSTime(animationDuration) *
			Number(animationIterationCount);
	
		// isNaN also implicitly covers the case which animationIterationCount is "infinite"
		if (oldFullAnimation == newFullAnimation || isNaN(animationTime) || animationTime <= 0) {
			if (this.#rootMenu == this) {
				if (this.#inModal) {
					this.parentElement?.remove();
				}
				this.remove();
			} else {
				hide(this);
				(
					this.querySelectorAll(
						"active-dropdown-menu:not([inert])"
					) as NodeListOf<ActiveDropdownMenuElement>
				).forEach(elem => {
					// "inert" is used as an "is closed" check, so we better be consistent
					elem.inert = true;
					hide(elem);
				});
			}
		} else {
			if (this.#rootMenu == this && this.#inModal && this.parentElement) {
				this.parentElement.inert = true;
				this.parentElement.style.pointerEvents == "none";
				this.parentElement.style.userSelect == "none";
			}
			if (animationFillMode == "none") {
				console.warn(
					"<active-dropdown-menu class=\"" + this.classList.value + "\"> has a closing animation with " +
					"\"animation-fill-mode\" set/defaulting to \"none\". This may result in perceived graphical " +
					"glitches. If this effect is unintentional, try setting the \"animation-fill-mode\" CSS " +
					"property to \"forwards\"."
				);
			}
			// Reset the animation
			this.style.animation = "none";
			void this.offsetHeight; // Trigger reflow (applies animation: none)
			this.style.animation = "";
			this.#closeAnimationTimeout = setTimeout(() => {
				if (this.#rootMenu == this) {
					if (this.#inModal) {
						this.parentElement?.remove();
					}
					this.remove();
				} else {
					hide(this);
					(
						this.querySelectorAll(
							"active-dropdown-menu:not([inert]"
						) as NodeListOf<ActiveDropdownMenuElement>
					).forEach(elem => {
						// "inert" is used as an "is closed" check, so we better be consistent
						elem.inert = true;
						hide(elem);
					});
				}
			}, animationTime + 35);
		}
		if (activeRootDropdownMenu == this) {
			activeRootDropdownMenu = null;
		}
		if (
			this.triggeringElement instanceof HTMLElement &&
			this.triggeringElement.tabIndex >= 0
		) {
			this.triggeringElement.focus();
		}
	}
}
customElements.define("active-dropdown-menu", ActiveDropdownMenuElement);

/**
 * This is the element which actually gets shown to the user. Represented by `<active-dropdown-menu-item>` in the
 * DOM. This is usually created by using the `<dropdown-menu-item>` elements as templates. Currently, only the `class`,
 * `disabled`, and `value` attributes, along with child elements and text are copied.
 * 
 * It is not intended to be created by anything other than this library.
 * 
 * This element has a default tab index of `0`, allowing it to be focusable. It is automatically focused when the mouse
 * hovers over it. 
 * 
 * This element has additional HTML attributes which can be used to define its behaviour. For more information, see the
 * linked documentation listed below.
 * 
 * * `disabled`: See the {@link DropdownMenuItemElement.value | `disabled` property}
 * * `value`: See the {@link DropdownMenuItemElement.value | `value` property}
 */
export class ActiveDropdownMenuItemElement extends HTMLElement {
	#parentMenu: ActiveDropdownMenuElement;
	#originalElement: DropdownMenuItemElement;
	/**
	 * @internal
	 */
	constructor(options: {
		parentMenu: ActiveDropdownMenuElement,
		originalElement: DropdownMenuItemElement
	}) {
		if (!options) {
			throw new Error("<active-dropdown-menu-item> isn't designed to be used on its own");
		}
		super();
		this.#parentMenu = options.parentMenu;
		this.#originalElement = options.originalElement;
	}
	/**
	 * @internal
	 */
	connectedCallback() {
		// Step 0: Random boilerplate
		const parentMenu = this.#parentMenu;		
		const originalElement = this.#originalElement;		
		this.style.whiteSpace = "nowrap";
		this.style.userSelect = "none";
		
		this.classList.value = originalElement.classList.value;
		this.value = originalElement.value;
		this.disabled = originalElement.disabled;

		// Step 1: Clone children
		let subMenu: ActiveDropdownMenuElement | undefined;
		for (let i = 0; i < originalElement.childNodes.length; i += 1) {
			const originalChildNode = originalElement.childNodes[i];
			if (originalChildNode instanceof HTMLFormElement) {
				const formCtx = new ActiveDropdownMenuFormContextElement({
					originalElement: originalChildNode
				});
				parentMenu._addFormContext(originalChildNode, formCtx);
				for (let i = 0; i < originalChildNode.childNodes.length; i += 1) {
					const originalGrandchildNode = originalChildNode.childNodes[i];
					if (originalGrandchildNode instanceof DropdownMenuInnerElement) {
						if (subMenu) {
							console.warn("Multiple <dropdown-menu-inner> elements within the same <dropdown-menu-item> element will not be handled.");
							continue;
						}
						subMenu = new ActiveDropdownMenuElement({
							menuTemplate: originalGrandchildNode,
							rootMenu: parentMenu.rootMenu,
							triggeringElement: this,
							originalRootMenu: parentMenu.originalRootMenu,
							originalTriggeringElement: parentMenu.originalTriggeringElement
						});
						formCtx.appendChild(
							subMenu
						);
					} else if (
						originalGrandchildNode instanceof Element ||
						originalGrandchildNode instanceof Text
					) {
						formCtx.appendChild(originalGrandchildNode.cloneNode(true));
					}
				}
				this.appendChild(formCtx);
			} else if (originalChildNode instanceof DropdownMenuInnerElement) {
				if (subMenu) {
					console.warn("Multiple <dropdown-menu-inner> elements within the same <dropdown-menu-item> element will not be handled.");
					continue;
				}
				subMenu = new ActiveDropdownMenuElement({
					menuTemplate: originalChildNode,
					rootMenu: parentMenu.rootMenu,
					triggeringElement: this,
					originalRootMenu: parentMenu.originalRootMenu,
					originalTriggeringElement: parentMenu.originalTriggeringElement
				});
				this.appendChild(
					subMenu
				);
			} else if (
				originalChildNode instanceof Element ||
				originalChildNode instanceof Text
			) {
				this.appendChild(originalChildNode.cloneNode(true));
			}
		}

		// Step 2: Handle checkboxes and radio buttons (maybe other spicy stuff?)
		const originalInputs = originalElement.querySelectorAll(
			"input:not(:scope dropdown-menu-inner *)"
		) as NodeListOf<HTMLInputElement>;
		const pointerInputs = this.querySelectorAll(
			"input:not(:scope active-dropdown-menu *)"
		) as NodeListOf<HTMLInputElement>;
		// In practice this shouldn't be more than 1, but people sometimes do wild things.
		if (originalInputs.length != pointerInputs.length) {
			console.warn("<active-dropdown-menu-item> somehow didn't properly clone the <input> elements");
		}
		for (let i = 0; i < Math.min(originalInputs.length, pointerInputs.length); i += 1) {
			const originalInput = originalInputs[i];
			const pointerInput = pointerInputs[i];
			if (originalInput.form) {
				const formCtx = parentMenu._getFormContext(originalInput.form);
				pointerInput.setAttribute("form", formCtx.id);
			}
			const passThroughCallback = (ev: Event) => {
				if (originalInput.type == "checkbox" || originalInput.type == "radio") {
					originalInput.checked = pointerInput.checked;
					this.focus(); // Return focus back to the menu item itself.
				} else {
					originalInput.value = pointerInput.value;
				}
				if (pointerInputs.length == 1) {
					this.ariaChecked = pointerInput.checked + "";
				}
				// We can't re-dispatch an existing event, so we gotta clone it
				const clonedEventInit = {} as any;
				// Apparently important properties like `bubbles` may not be on ev itself, but on the prototype.
				// That said, we also can't iterate on the prototype itself. Fun.
				for (const key of Object.keys(Object.getPrototypeOf(ev)).concat(...Object.keys(ev))) {
					clonedEventInit[key] = (ev as any)[key];
				}
				const clonedEvent = new (Object.getPrototypeOf(ev).constructor as any)(ev.type, clonedEventInit);
				if (!originalInput.dispatchEvent(clonedEvent)) {
					ev.preventDefault();
				}
			};
			pointerInput.addEventListener("input", passThroughCallback);
			pointerInput.addEventListener("change", passThroughCallback);
		}

		// Step 3: Handle interaction events (or don't if disabled)
		if (pointerInputs.length == 1) {
			// As far as I understand, I shouldn't need to use the "aria-checked" attribute if I already use the
			// relevant input.
			// Update: No they don't. Set ariaChecked property.
			if (pointerInputs[0].type == "radio") {
				this.setAttribute("role", "menuitemradio");
				pointerInputs[0].tabIndex = -1;
				this.ariaChecked = pointerInputs[0].checked + "";
			} else if (pointerInputs[0].type == "checkbox") {
				this.setAttribute("role", "menuitemcheckbox");
				pointerInputs[0].tabIndex = -1;
				this.ariaChecked = pointerInputs[0].checked + "";
			} else {
				this.setAttribute("role", "menuitem");
			}
		} else {
			this.setAttribute("role", "menuitem");
		}

		this.tabIndex = 0; // make this focusable. This also allows this element to listen to key presses
		const removeOtherSubMenus = (ev: Event) => {
			if (subMenu?.contains(ev.target as Element | null)) {
				return;
			}
			parentMenu.closeSubMenu(subMenu);
		};
		this.addEventListener("click", removeOtherSubMenus);
		this.addEventListener("mouseenter", removeOtherSubMenus);
		this.addEventListener("focusin", removeOtherSubMenus);
		this.addEventListener("mouseenter", ev => {
			if (subMenu?.contains(ev.target as Element | null)) {
				return;
			}
			if (this.disabled) {
				return;
			}
			// Hack to make keyboard navigation work seamlessly
			this.focus();
		});
		
		this.addEventListener("mouseleave", ev => {
			if (subMenu?.contains(ev.target as Element | null)) {
				return;
			}
			// No one else seems to leave their menu option highlighted after moving the mouse away, so...
			this.blur();
		});
		
		if (subMenu) {
			this.ariaHasPopup = "menu";
			let menuOpenTimer: ReturnType<typeof setTimeout> | undefined;
			this.addEventListener("click", (ev: MouseEvent) => {
				if (subMenu.contains(ev.target as Element | null)) {
					return;
				}
				if (this.disabled) {
					return;
				}
				if (menuOpenTimer != undefined) {
					clearTimeout(menuOpenTimer);
					menuOpenTimer = undefined;
				}
				subMenu.open(ev, "element-right-downward");
			});
			this.addEventListener("mouseenter", (ev: MouseEvent) => {
				if (subMenu.contains(ev.target as Element | null)) {
					return;
				}
				if (this.disabled) {
					return;
				}
				// Having dropdown menus immediately open proved distracting if they had open and close animations.
				// It is kind of expected that that sub-menu's won't open if you're "quickly" moving your mouse over
				// The entire menu.
				menuOpenTimer = setTimeout(
					() => {
						// Menus and their sub-menus explicitly become inert when they're closed or closing
						if (parentMenu.inert) {
							return;
						}
						subMenu.open(ev, "element-right-downward");
					},
					// Through my completely unscientific testing with a sample size of 1, "quickly" means approx 240px
					// per second. These are CSS pixels anyway, which are a lie on high-DPI displays. (Yay)
					Math.min(
						Math.min(
							this.offsetHeight,
							this.offsetWidth
						) * 4,
						500 // https://youtu.be/R_b2B5tKBUM?t=88
					)
				);
			});
			this.addEventListener("mouseleave", (ev: MouseEvent) => {
				if (subMenu.contains(ev.target as Element | null)) {
					return;
				}
				if (menuOpenTimer != undefined) {
					clearTimeout(menuOpenTimer);
					menuOpenTimer = undefined;
				}
			});
		} else {
			this.addEventListener("click", (ev) => {
				if (this.disabled) {
					return;
				}
				const clickedElement = ev.target as Element;
				if (clickedElement != this) {
					for (let i = 0; i < pointerInputs.length; i += 1) {
						if (clickedElement.contains(pointerInputs[i])) {
							// Tantacrul on YouTube once said that having context menus disappear when you click on
							// checkboxes is annoying. So let's see how this goes.
							return;
						}
					}
				}
				for (let i = 0; i < Math.min(originalInputs.length, pointerInputs.length); i += 1) {
					const originalInput = originalInputs[i];
					const pointerInput = pointerInputs[i];
					let fireEvent = false;
					if (originalInput.type == "radio") {
						fireEvent = !originalInput.checked;
						pointerInput.checked = true; // Might show in the close animation
						originalInput.checked = true;
					} else if (originalInput.type == "checkbox") {
						// This might be confusing considering the behaviour above
						originalInput.checked = !originalInput.checked;
						pointerInput.checked = originalInput.checked; // Might show in the close animation
						fireEvent = true;
					}
					if (fireEvent) {
						originalInput.dispatchEvent(new InputEvent("input", {
							// Vaules determined by examining a "natural" input event in Firefox
							bubbles: true,
							cancelable: false,
							composed: true
						}));
						originalInput.dispatchEvent(new Event("change", {
							// Values determined by examining a "natural" change event in Firefox
							bubbles: true,
							cancelable: false,
							composed: false
						}));
					}
				}
				if (
					parentMenu.originalRootMenu.dispatchEvent(
						new CustomEvent("dropdownSelect", {
							cancelable: true,
							detail: {
								selectedElement: this,
								selectedElementOriginal: originalElement,
								selectedValue: this.value,
								dropdownMenu: parentMenu.originalRootMenu,
								triggeringElement: parentMenu.originalTriggeringElement
							} satisfies DropdownSelectEventDetails
						})
					) &&
					parentMenu.originalTriggeringElement.dispatchEvent(
						new CustomEvent("dropdownSelect", {
							bubbles: true,
							cancelable: true,
							detail: {
								selectedElement: this,
								selectedElementOriginal: originalElement,
								selectedValue: this.value,
								dropdownMenu: parentMenu.originalRootMenu,
								triggeringElement: parentMenu.originalTriggeringElement
							} satisfies DropdownSelectEventDetails
						})
					)
				) {
					this.classList.add("dropdown-selected");
					parentMenu.rootMenu.close();
				}
			});
		}

		this.addEventListener("keypress", ev => {
			if (subMenu?.contains(ev.target as Element | null)) {
				return;
			}
			switch(ev.key){
				case " ":
					if (
						pointerInputs.length == 1 &&
						(
							pointerInputs[0].type == "radio" ||
							pointerInputs[0].type == "checkbox"
						)
					) {
						// The ARIA docs say that pressing space while focusing on an menuitemradio or menuitemcheckbox
						// must be like clicking the input without closing the menu.
						// The case where the checkbox being explicitly clicked not closing the menu is already
						// handeled above, so let's just tap into that.
						pointerInputs[0].dispatchEvent(
							clickEventIsPointerEvent ?
								new PointerEvent("click", {isPrimary: true}) :
								new MouseEvent("click")
						);
						ev.preventDefault();
						break;
					}
					// else, fall through.
				case "Enter":
					this.dispatchEvent(
						clickEventIsPointerEvent ?
							new PointerEvent("click", {isPrimary: true}) :
							new MouseEvent("click")
					);
					ev.preventDefault();
					break;
				
				default:
			}
		});
		this.addEventListener("keydown", ev => {
			if (subMenu?.contains(ev.target as Element | null)) {
				return;
			}
			switch(ev.key){
				case "Home": {
					parentMenu.firstMenuItem?.focus();
					ev.preventDefault();
					break;
				}
				case "End": {
					parentMenu.lastMenuItem?.focus();
					ev.preventDefault();
					break;
				}
				case "ArrowUp": {
					this.previousMenuItem?.focus();
					ev.preventDefault();
					break;
				}
				case "ArrowDown": {
					this.nextMenuItem?.focus();
					ev.preventDefault();
					break;
				}
				case "Escape":
				case "ArrowLeft":
					parentMenu.close();
					ev.preventDefault();
					break;
				case "ArrowRight":
					if (subMenu) {
						subMenu.open(
							clickEventIsPointerEvent ?
								new PointerEvent("click", {isPrimary: true}) :
								new MouseEvent("click"),
							"element-right-downward"
						);
						subMenu.firstMenuItem?.focus();
					}
					ev.preventDefault();
					break;
				case "Tab": {
					if (ev.shiftKey) {
						if (this == parentMenu.firstMenuItem) {
							ev.preventDefault();
							parentMenu.close();
						}
					} else {
						if (this == parentMenu.lastMenuItem) {
							ev.preventDefault();
							parentMenu.close();
						}
					}
					break;
				}
				default:
			}
		});
	}
	static get observedAttributes() {
		return [
			"value",
			"disabled"
		];
	}
	#disabled: boolean = false;
	/**
	 * Is `true` if the `disabled` attribute exists, including if it's set to an empty string. `false` otherwise.
	 * 
	 * Note that setting this value will not set the corresponding value on the
	 * {@link DropdownMenuItemElement | `<dropdown-menu-item>`}.
	 */
	get disabled() {
		return this.#disabled;
	}
	set disabled(value: boolean) {
		if (value) {
			this.setAttribute("disabled", "");
		} else {
			this.removeAttribute("disabled");
		}
	}
	#value: string | undefined;
	/**
	 * Reflects the value of the `value` attribute. If not set, defaults to `undefined`. This value will be passed to
	 * {@link DropdownSelectEventDetails.selectedValue | `details.selectedValue` } property of the
	 * {@link DropdownSelectEvent | `"dropdownSelect"`} event if selected.
	 * 
	 * Note that setting this value will not set the corresponding value on the
	 * {@link DropdownMenuItemElement | `<dropdown-menu-item>`}.
	 */
	get value() {
		return this.#value;
	}
	set value(value: string | undefined) {
		if (typeof value == "string") {
			this.setAttribute("value", value);
		} else {
			this.removeAttribute("value");
		}
	}
	/**
	 * @internal
	 */
	attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
		switch (name) {
			case "disabled": 
				this.#disabled = newValue != null;
				this.ariaDisabled = this.#disabled + "";
				this.inert = this.#disabled;
				break;
			case "value":
				this.#value = newValue ?? undefined;
				break;
			default:
		}
	}
	/**
	 * Gets the next non-disabled `<active-dropdown-menu-item>` after this one if it exists
	 */
	get nextMenuItem(): ActiveDropdownMenuItemElement | null {
		let nextItem = this.nextElementSibling;
		while (
			nextItem != null &&
			(
				!(nextItem instanceof ActiveDropdownMenuItemElement) ||
				nextItem.disabled
			)
		) {
			nextItem = nextItem.nextElementSibling;
		}
		return nextItem;
	}
	/**
	 * Gets the previous non-disabled `<active-dropdown-menu-item>` previous this one if it exists
	 */
	get previousMenuItem(): ActiveDropdownMenuItemElement | null {
		let previousItem = this.previousElementSibling;
		while (
			previousItem != null &&
			(
				!(previousItem instanceof ActiveDropdownMenuItemElement) ||
				previousItem.disabled
			)
		) {
			previousItem = previousItem.previousElementSibling;
		}
		return previousItem;
	}
}
customElements.define("active-dropdown-menu-item", ActiveDropdownMenuItemElement);

document.addEventListener("keydown", ev => {
	if (
		activeRootDropdownMenu &&
		!activeRootDropdownMenu.contains(document.activeElement)
	) {
		switch(ev.key) {
			case "Home":
			case "End":
			case "ArrowUp":
			case "ArrowDown":
			case "ArrowLeft":
			case "ArrowRight":
			case "Tab":
				ev.preventDefault();
				activeRootDropdownMenu.focusDefaultItem();
				break;
			case "Escape":
				ev.preventDefault();
				activeRootDropdownMenu.close();
				break;
			default:
		}
	}
});


let linkedFormMap: Map<HTMLFormElement, ActiveDropdownMenuFormContextElement> = new Map();
/**
 * @internal
 */
export class ActiveDropdownMenuFormContextElement extends HTMLFormElement {
	constructor(
		options: {
			originalElement: HTMLFormElement
		}
	) {
		super();
		this.setAttribute("is", "active-dropdown-form-context"); // Sometimes this isn't done automatically
		const {
			originalElement
		} = options;
		this.addEventListener("submit", (ev) => {
			ev.preventDefault();
			this.#originalElement.requestSubmit()
		});
		this.id = "dropdown_ctx_" + Date.now().toString(36) + Math.random().toString(36).substring(2);
		this.#originalElement = originalElement;
	}
	
	#originalElement: HTMLFormElement;
	disconnectedCallback() {
		// The disconnectedCallback is the only practical reason why this is an extended built-in element. Though the
		// fact that the Safari team cannot comprehend why you might want a "cleaner" way to attached custom behaviour
		// to pre-existing built-in element is ridiculous. Especially when it's a part of the HTML living standard.
		linkedFormMap.delete(this.#originalElement);
	}
}
customElements.define("active-dropdown-form-context", ActiveDropdownMenuFormContextElement, { extends: "form" });
