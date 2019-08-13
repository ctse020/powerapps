import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { CSSProperties } from "react";
import { FullNameGenerator, FullNameConventionCode } from './FullNameGenerator';

export class FullNameControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _fullnameConvention: number = 4;

	private _fullNameValue: string; 
	private _firstNameValue: string; 
	private _middleNameValue: string; 
	private _lastNameValue: string; 

	private _container: HTMLDivElement;
	private _popupContainer: HTMLDivElement;
	private _fullNameElement: HTMLInputElement; 
	private _firstNameElement: HTMLInputElement; 
	private _middleNameElement: HTMLInputElement; 
	private _lastNameElement: HTMLInputElement; 
	private _confirmButton: HTMLButtonElement; 
	private _cancelButton: HTMLButtonElement; 

	private _inputChanged : EventListenerOrEventListenerObject;
	private _confirmClicked: EventListenerOrEventListenerObject;
	private _cancelClicked: EventListenerOrEventListenerObject;

	private _popupService:  ComponentFramework.FactoryApi.Popup.PopupService;
	private _popupOptions: ComponentFramework.FactoryApi.Popup.Popup;
	private _popupName = "fullnamePopup";

	private _notifyOutputChanged: () => void;
	private _context: any; //ComponentFramework.Context<IInputs>;

	// https://powerusers.microsoft.com/t5/PowerApps-Component-Framework/Create-custom-multiselect-control/td-p/282229

	/**
	 * Empty constructor.
	 */
	constructor()
	{
		
		let head = document.head;
		let style = document.createElement("style");
		
		style.type = "text/css";
		style.appendChild(document.createTextNode(".FullNameControl input[type=\"text\"] { background-color: rgb(255, 255, 255); border-bottom-color: rgba(0, 0, 0, 0); border-bottom-style: solid; border-bottom-width: 1px; border-image-outset: 0px; border-image-repeat: stretch; border-image-slice: 100%; border-image-source: none; border-image-width: 1; border-left-color: rgba(0, 0, 0, 0); border-left-style: solid; border-left-width: 1px; border-right-color: rgba(0, 0, 0, 0); border-right-style: solid; border-right-width: 1px; border-top-color: rgba(0, 0, 0, 0); border-top-style: solid; border-top-width: 1px; box-sizing: border-box; color: rgb(0, 0, 0); cursor: text; display: block; font-family: SegoeUI, \"Segoe UI\"; font-size: 14px; font-stretch: 100%; font-style: normal; font-variant-caps: normal; font-variant-east-asian: normal; font-variant-ligatures: normal; font-variant-numeric: normal; font-weight: 600; height: 35px; letter-spacing: normal; line-height: 35px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px; outline-color: rgb(0, 0, 0); outline-style: none; outline-width: 0px; padding-bottom: 0px; padding-left: 7px; padding-right: 7px; padding-top: 0px; text-align: start; text-indent: 0px; text-overflow: ellipsis; text-rendering: auto; text-shadow: none; text-transform: none; white-space: normal; width: 100%; word-break: normal; word-spacing: 0px; writing-mode: horizontal-tb; -webkit-appearance: none; -webkit-rtl-ordering: logical; -webkit-border-image: none; }"));
		style.appendChild(document.createTextNode(".FullNameControl input[type=\"text\"]:hover { background-color: rgb(255, 255, 255); border-bottom-color: rgb(102, 102, 102); border-bottom-style: solid; border-bottom-width: 1px; border-image-outset: 0px; border-image-repeat: stretch; border-image-slice: 100%; border-image-source: none; border-image-width: 1; border-left-color: rgb(102, 102, 102); border-left-style: solid; border-left-width: 1px; border-right-color: rgb(102, 102, 102); border-right-style: solid; border-right-width: 1px; border-top-color: rgb(102, 102, 102); border-top-style: solid; border-top-width: 1px; box-sizing: border-box; color: rgb(0, 0, 0); cursor: text; display: block; font-family: SegoeUI, \"Segoe UI\"; font-size: 14px; font-stretch: 100%; font-style: normal; font-variant-caps: normal; font-variant-east-asian: normal; font-variant-ligatures: normal; font-variant-numeric: normal; font-weight: 400; height: 35px; letter-spacing: normal; line-height: 35px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px; outline-color: rgb(0, 0, 0); outline-style: none; outline-width: 0px; padding-bottom: 0px; padding-left: 7px; padding-right: 7px; padding-top: 0px; text-align: start; text-indent: 0px; text-overflow: ellipsis; text-rendering: auto; text-shadow: none; text-transform: none; white-space: normal; width: 100%; word-break: normal; word-spacing: 0px; writing-mode: horizontal-tb; -webkit-appearance: none; -webkit-rtl-ordering: logical; -webkit-border-image: none; }"));

		style.appendChild(document.createTextNode("." + this._popupName + " input[type=\"text\"] { background-color: rgb(255, 255, 255); border-bottom-color: rgba(0, 0, 0, 0); border-bottom-style: solid; border-bottom-width: 1px; border-image-outset: 0px; border-image-repeat: stretch; border-image-slice: 100%; border-image-source: none; border-image-width: 1; border-left-color: rgba(0, 0, 0, 0); border-left-style: solid; border-left-width: 1px; border-right-color: rgba(0, 0, 0, 0); border-right-style: solid; border-right-width: 1px; border-top-color: rgba(0, 0, 0, 0); border-top-style: solid; border-top-width: 1px; box-sizing: border-box; color: rgb(0, 0, 0); cursor: text; display: block; font-family: SegoeUI, \"Segoe UI\"; font-size: 14px; font-stretch: 100%; font-style: normal; font-variant-caps: normal; font-variant-east-asian: normal; font-variant-ligatures: normal; font-variant-numeric: normal; font-weight: 600; height: 35px; letter-spacing: normal; line-height: 35px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px; outline-color: rgb(0, 0, 0); outline-style: none; outline-width: 0px; padding-bottom: 0px; padding-left: 7px; padding-right: 7px; padding-top: 0px; text-align: start; text-indent: 0px; text-overflow: ellipsis; text-rendering: auto; text-shadow: none; text-transform: none; white-space: normal; width: 100%; word-break: normal; word-spacing: 0px; writing-mode: horizontal-tb; -webkit-appearance: none; -webkit-rtl-ordering: logical; -webkit-border-image: none; }"));
		style.appendChild(document.createTextNode("." + this._popupName + " input[type=\"text\"]:hover { background-color: rgb(255, 255, 255); border-bottom-color: rgb(102, 102, 102); border-bottom-style: solid; border-bottom-width: 1px; border-image-outset: 0px; border-image-repeat: stretch; border-image-slice: 100%; border-image-source: none; border-image-width: 1; border-left-color: rgb(102, 102, 102); border-left-style: solid; border-left-width: 1px; border-right-color: rgb(102, 102, 102); border-right-style: solid; border-right-width: 1px; border-top-color: rgb(102, 102, 102); border-top-style: solid; border-top-width: 1px; box-sizing: border-box; color: rgb(0, 0, 0); cursor: text; display: block; font-family: SegoeUI, \"Segoe UI\"; font-size: 14px; font-stretch: 100%; font-style: normal; font-variant-caps: normal; font-variant-east-asian: normal; font-variant-ligatures: normal; font-variant-numeric: normal; font-weight: 400; height: 35px; letter-spacing: normal; line-height: 35px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px; outline-color: rgb(0, 0, 0); outline-style: none; outline-width: 0px; padding-bottom: 0px; padding-left: 7px; padding-right: 7px; padding-top: 0px; text-align: start; text-indent: 0px; text-overflow: ellipsis; text-rendering: auto; text-shadow: none; text-transform: none; white-space: normal; width: 100%; word-break: normal; word-spacing: 0px; writing-mode: horizontal-tb; -webkit-appearance: none; -webkit-rtl-ordering: logical; -webkit-border-image: none; }"));

		//style.appendChild(document.createTextNode(".FullNameControl button { width: 50px;max-width: 125px;height: 20px;background-color: #FDFDFD;border: 1px solid #C6C6C6;cursor: pointer;margin: 10px 10px 10px 0px;background-image: none;text-align: center;overflow: visible;padding: 0px 0px 0px 0px;color: #262626;font-size: 11px; }"));
		//style.appendChild(document.createTextNode(".FullNameControl label { font-family: SegoeUI, \"Segoe UI\";font-size: 11px; }"));
		head.appendChild(style);
		
	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{

		this._context = context;
		this._container = container;

		// Add control initialization code
		this.setFullnameConventionCode();

		this._firstNameValue = this._context.parameters.firstname.raw ? this._context.parameters.firstname.raw : "";
		this._middleNameValue = this._context.parameters.lastname.raw ? this._context.parameters.middlename.raw : "";
		this._lastNameValue = this._context.parameters.lastname.raw ? this._context.parameters.lastname.raw : "";
		this._fullNameValue = this._context.parameters.fullname.raw ? this._context.parameters.fullname.raw : "";

		this.setContainer();

		this._popupService = context.factory.getPopupService();
		this.setPopupContainer();
		this.setPopupOptions();
		this._popupService.createPopup(this._popupOptions);	
		this._notifyOutputChanged = notifyOutputChanged;

	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		//this._context = context;

		// Add code to update control view
		//this._lastNameValue = context.parameters.lastname.raw ? context.parameters.lastname.raw : "";
		//this._firstNameValue = context.parameters.firstname.raw ? context.parameters.firstname.raw : "";
		//this._middleNameValue = context.parameters.middlename.raw ? context.parameters.middlename.raw : "";
		//this._fullNameValue = context.parameters.fullname.raw ? context.parameters.fullname.raw : "";

	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			lastname: this._lastNameValue,
			firstname: this._firstNameValue,
			middlename: this._middleNameValue,
			fullname: this._fullNameValue
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		this._firstNameElement.removeEventListener("blur", this._inputChanged);
		this._middleNameElement.removeEventListener("blur", this._inputChanged);
		this._lastNameElement.removeEventListener("blur", this._inputChanged);

		this._confirmButton.removeEventListener("click", this._confirmClicked);
		this._cancelButton.removeEventListener("click", this._cancelClicked);
	}

	public confirmClicked(evt: Event): void {	

		if (!this.isValidInput())
		  return;

		this._lastNameValue = this._lastNameElement.value;
		this._firstNameValue = this._firstNameElement.value;
		this._middleNameValue = this._middleNameElement.value;

		this._fullNameValue = FullNameGenerator.GenerateFullName(this._fullnameConvention, this._firstNameValue, this._middleNameValue, this._lastNameValue);
		this._fullNameElement.value = this._fullNameValue;

		this._notifyOutputChanged();
	  this.closePopup();		
	}

	public cancelClicked(evt: Event): void {	
		this.closePopup();
  }

	setFullnameConventionCode() {
		let orgId = this._context.orgSettings._customControlExposedOrgSettings.organizationId;
		let self = this;
		this._context.webAPI.retrieveRecord("organization", orgId, "?$select=fullnameconventioncode").then(
			function success(org: any) {
				self._fullnameConvention = org["fullnameconventioncode"];
			},
			function(error: any) {
					//Xrm.Utility.alertDialog(error.message);
			}    
		);
	}
	
  setContainer() {

		let disabled = this._context.mode.isControlDisabled;
		let maxLength = this._context.parameters.fullname.attributes ? this._context.parameters.fullname.attributes.MaxLength : 160;
		this._fullNameElement = this.createTextInput("input_fullname", this._fullNameValue, maxLength, false, disabled);
		this._fullNameElement.readOnly = true;

		let self = this;
		this._fullNameElement.addEventListener("click", function(e: any) {
				self.openPopup();
		});    
		this._fullNameElement.addEventListener("keypress", function(e: any) {
			if (e.keyCode == 13) {
				self.openPopup();
			}
		});  

		var container = document.createElement("div");
		container.appendChild(this._fullNameElement);
		this._container.appendChild(container);
	}

  setPopupContainer() {
		this._popupContainer = document.createElement("div");
		this._popupContainer.id = "div_popupContainer";
		this._popupContainer.className = this._popupName;
		this._popupContainer.setAttribute("role", "dialog");
		this._popupContainer.style.cssText = "margin-left:10px;margin-right:10px;margin-top:10px";
		this._popupContainer.style.height = "100%";

		this._inputChanged = this.inputChanged.bind(this);
		this._confirmClicked = this.confirmClicked.bind(this);
		this._cancelClicked = this.cancelClicked.bind(this);

		let table = this.createTable();

		// firstname
		let required = (this._context.parameters.firstname.attributes ? this._context.parameters.firstname.attributes.RequiredLevel : 1) == 2;
		let maxLength = this._context.parameters.firstname.attributes ? this._context.parameters.firstname.attributes.MaxLength : 100;
		let disabled = this._context.mode.isControlDisabled;
		let row = this.createRow(table);
		let cell = this.createCell(row);
		let label = this.createLabel("label_firstname", this._context.parameters.firstname.attributes.DisplayName, required);
		cell.appendChild(label);
		cell = this.createCell(row);
		this._firstNameElement = this.createTextInput("input_firstname", this._firstNameValue, maxLength, required, disabled);
		cell.appendChild(this._firstNameElement);

		// middlename
		required = (this._context.parameters.middlename.attributes ? this._context.parameters.middlename.attributes.RequiredLevel : 1) == 2;
		maxLength = this._context.parameters.middlename.attributes ? this._context.parameters.middlename.attributes.MaxLength : 100;		
		row = this.createRow(table);
		cell = this.createCell(row);
		label = label = this.createLabel("label_middlename", this._context.parameters.middlename.attributes.DisplayName, required);
		cell.appendChild(label);
		cell = this.createCell(row);
		this._middleNameElement = this.createTextInput("input_middleName", this._middleNameValue, maxLength, required, disabled);
		cell.appendChild(this._middleNameElement);

		// lastname
		required = (this._context.parameters.lastname.attributes ? this._context.parameters.lastname.attributes.RequiredLevel : 1) == 2;
		maxLength = this._context.parameters.lastname.attributes ? this._context.parameters.lastname.attributes.MaxLength : 100;			
		row = this.createRow(table);
		cell = this.createCell(row);
		label = label = this.createLabel("label_lastname", this._context.parameters.lastname.attributes.DisplayName, required);
		cell.appendChild(label);
		cell = this.createCell(row);
		this._lastNameElement = this.createTextInput("input_lastname", this._lastNameValue, maxLength, required, disabled);
		cell.appendChild(this._lastNameElement);

		this._cancelButton = this.createButton("button_cancel", "Cancel");
		this._cancelButton.style.cssFloat = "left";
		this._cancelButton.addEventListener("click", this._cancelClicked);

		this._confirmButton = this.createButton("button_confirm", "OK");
		this._confirmButton.style.cssFloat = "right";
		this._confirmButton.addEventListener("click", this._confirmClicked);
		this._confirmButton.disabled = this._context.mode.isControlDisabled;

		/*
		this._popupContainer.appendChild(this._firstNameElement);
		this._popupContainer.appendChild(document.createElement("br"));
		this._popupContainer.appendChild(this._middleNameElement);
		this._popupContainer.appendChild(document.createElement("br"));
		this._popupContainer.appendChild(this._lastNameElement);
		*/
		this._popupContainer.appendChild(table);
		this._popupContainer.appendChild(document.createElement("br"));
		this._popupContainer.appendChild(this._cancelButton);
		this._popupContainer.appendChild(this._confirmButton);
	}

	setPopupOptions() {
		this._popupOptions = {
			closeOnOutsideClick: true,
			content: this._popupContainer,
			id: this._popupName,
			name: this._popupName,
			type: 1,
			popupStyle: {
				"width": "350px",
				"height": "230px",
				"border": "1px solid #666666",
				"boxShadow": "0px 2px 4px 0px rgba(0, 0, 0, 0.5);",
				"overflow": "hidden",
				"backgroundColor": "white",
				"display": "flex",
				"top": this._container.offsetTop + "px", //"10px",
				"left": this._container.offsetLeft + "px",//"10px",
				"flexDirection": "column",
				"position": "absolute"
				//"margin-top": "10px"
			},
			shadowStyle: {}
		};	
	}

  createLabel(id: string, text: string, required: boolean): HTMLLabelElement {
		let label = document.createElement("label");
		label.setAttribute("id", id);
		label.style.cssText = "font-family: SegoeUI, \"Segoe UI\";font-size: 14px;font-weight:400;";
		if (!required) {
			label.innerText = text;
		} else {
			label.innerHTML = text + " <font style=\"color:rgb(234, 6, 0);\">*</font>";
		}
		return label;
	}

	createTable() {
		let table = document.createElement("table");
		table.style.cssText = "border: 0px; border-spacing: 0px;";
		return table;
	}

	createRow(table: HTMLTableElement) {
		let row = table.insertRow();
		return row;
	}

	createCell(row: HTMLTableRowElement) {
		let cell = row.insertCell();
		cell.style.cssText = "vertical-align: middle; padding: 5px;";
		return cell;
	}

	createButton(id: string, text: string): HTMLButtonElement {
		let button = document.createElement("button");
		button.setAttribute("id", id);
		button.innerText = text;
		button.style.cssText = "width: 40%;height: 20px;background-color: #FDFDFD;border: 1px solid #C6C6C6;cursor: pointer;margin: 10px 10px 10px 0px;background-image: none;text-align: center;overflow: visible;padding: 0px 0px 0px 0px;color: #262626;font-family: SegoeUI, \"Segoe UI\"; font-size: 14px;font-weight:400;"
		return button;
	}

  createTextInput(id: string, text: string, maxLength: number, required: boolean, disabled: boolean): HTMLInputElement {
		let input = document.createElement("input");
		input.setAttribute("id", id);
		input.setAttribute("type", "text");
		input.setAttribute("placeholder", "---");
		//input.style.cssText = "background-color: rgb(255, 255, 255); border-bottom-color: rgb(102, 102, 102); border-bottom-style: solid; border-bottom-width: 1px; border-image-outset: 0px; border-image-repeat: stretch; border-image-slice: 100%; border-image-source: none; border-image-width: 1; border-left-color: rgb(102, 102, 102); border-left-style: solid; border-left-width: 1px; border-right-color: rgb(102, 102, 102); border-right-style: solid; border-right-width: 1px; border-top-color: rgb(102, 102, 102); border-top-style: solid; border-top-width: 1px; box-sizing: border-box; color: rgb(0, 0, 0); cursor: text; display: block; font-family: SegoeUI, \"Segoe UI\"; font-size: 14px; font-stretch: 100%; font-style: normal; font-variant-caps: normal; font-variant-east-asian: normal; font-variant-ligatures: normal; font-variant-numeric: normal; font-weight: 400; height: 35px; letter-spacing: normal; line-height: 35px; margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px; outline-color: rgb(0, 0, 0); outline-style: none; outline-width: 0px; padding-bottom: 0px; padding-left: 7px; padding-right: 7px; padding-top: 0px; text-align: start; text-indent: 0px; text-overflow: ellipsis; text-rendering: auto; text-shadow: none; text-transform: none; white-space: normal; width: 100%; word-break: normal; word-spacing: 0px; writing-mode: horizontal-tb; -webkit-appearance: none; -webkit-rtl-ordering: logical; -webkit-border-image: none;";		
		input.setAttribute("value", text);
		input.maxLength = maxLength;
		input.disabled = disabled;
		input.required = required;
		input.addEventListener("blur", this._inputChanged);
		return input;
	}

	openPopup() {
		this._firstNameElement.value = this._firstNameValue;
		this._middleNameElement.value = this._middleNameValue;
		this._lastNameElement.value = this._lastNameValue;
		this._popupService.openPopup(this._popupName);
		this._firstNameElement.focus();
	}
	
	closePopup() {
		this._popupService.closePopup(this._popupName);
	}
	
  isValidInput(): boolean {
		if (this.isEmpty(this._firstNameElement.value) && this._firstNameElement.required)
			return false;
  	if (this.isEmpty(this._middleNameElement.value) && this._middleNameElement.required)
			return false;
	  if (this.isEmpty(this._lastNameElement.value) && this._lastNameElement.required)
			return false;						
		return true;
	}

	inputChanged(evt: Event) {
		let control = evt.target as HTMLInputElement;
		if (this.isEmpty(control.value) && control.required)
			control.style.backgroundColor = "rgba(191, 9, 0, 0.075)"; // light red
		else
			control.style.backgroundColor = "initial";
	}

  isEmpty(val: any) {
    if (val == undefined || val == null || val == "")
      return true;
    return false;
	}

  /*
	setComposeAddress(context: any, lines: string, postalcode: string, city: string, state: string, country: string) {
		let self = this;
		let formatAddressRequest = {
				Line1: lines,
				City: city,
				StateOrProvince: state,
				PostalCode: postalcode,
				Country: country,
				getMetadata: function() {
						return {
								boundParameter: null,
								parameterTypes: {
										"Line1": {"typeName": "Edm.String","structuralProperty": 1},
										"City": {"typeName": "Edm.String","structuralProperty": 1},
										"StateOrProvince": {"typeName": "Edm.String","structuralProperty": 1},
										"PostalCode": {"typeName": "Edm.String","structuralProperty": 1},
										"Country": {"typeName": "Edm.String","structuralProperty": 1}
								},operationType: 1,operationName: "FormatAddress"
						};
				}
		}; 
		context.webApi.execute(formatAddressRequest).then(
				function success(result: any) {
						if (result.ok) {
								self._address_composite = JSON.parse(result.responseText).Address;
						}
				},
				function(error: any) {
						//Xrm.Utility.alertDialog(error.message);
				}
		);
	}
  */

	/*
  public isEmpty(val: any) {
    if (val == undefined || val == null || val == "")
      return true;
		if (typeof val == "object")
			return val.length === 0;// || val.length == undefined;
    return false;
	}

  public getSafeStringValue(str: any): string {
		if (this.isEmpty(str))
			return "";
		else
		  return str.trim();
	}

  public trim(str: any): string {
		if (this.isEmpty(str))
			return "";
		else
		  return String(str).trim();
	}

	public left(str: any, n: number): string {
		if (this.isEmpty(str) || n <= 0)
			return "";
		else if (n > String(str).length)
			return str;
		else
			return String(str).substring(0, n);
	}

  public getInitial(str: any): string {
		if (this.isEmpty(str))
			return "";
		else 
		  return this.left(String(str).trim(), 1).toUpperCase() + ".";
	}

	public generateFullName(firstName: string, middleName: string, lastName: string): string {
		let fn = this.getSafeStringValue(this._firstName);
		let mn = this.getSafeStringValue(this._middleName);
		let ln = this.getSafeStringValue(this._lastName);
		switch(this._fullnameConvention) { 
			case 0: { 
			   return ln + ", " + fn;
			   break; 
			} 
			case 1: { 
				return fn + ", " + ln;
			   break; 
			} 
			case 2: { 
				return ln + ", " + fn + " " + mn;
				break; 
			} 
			case 3: { 
			  return fn + " " + mn + ", " + ln;
				break; 
			} 
			case 4: { 
			  return ln + ", " + fn + " " + mn;
				break; 
			} 
			case 5: { 
			  return fn + " " + mn + " " + ln;
				break; 
			} 
			case 6: { 
			  return ln + " " + fn;
				break; 
			} 
			case 7: { 
		  	return ln + fn;
				break; 
			} 
			default: { 
				 return "";
			   break; 
			} 
		 } 
		 return "";
		
		0	LastName, FirstName
		1	FirstName, LastName
		2	LastName, FirstName Initial
		3	FirstName Initial, LastName
		4	LastName, FirstName MiddleName
		5	FirstName MiddleName LastName
		6	LastName FirstName
		7	LastNameFirstName	
		
	}
	*/
}