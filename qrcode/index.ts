import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class MyQRCode implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    /** variable for HTML elements */
    private _barcodetextElement: HTMLInputElement; 
    private _barcodeimageElement: HTMLImageElement; 

    /** variable for properties */ 
    private _barcodetext: string; 
    private _barcodeimageurl: string; 

    /** event variables */
    private _barcodetextChanged: EventListenerOrEventListenerObject;

    private _context: ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;
    private _container: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor()
	{

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
		// Add control initialization code

        // assigning environment variables. 
        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;

        // register eventhandler functions 
        this._barcodetextChanged = this.barcodetextChanged.bind(this);

        // input control 
        this._barcodetextElement = document.createElement("input");
        this._barcodetextElement.setAttribute("type", "text");
        this._barcodetextElement.addEventListener("change", this._barcodetextChanged);

        this._barcodeimageElement = document.createElement("img");
        this._barcodeimageElement.setAttribute("id", "qrcode");

        // finally add to the container so that it renders on the UI. 
        this._container.appendChild(this._barcodetextElement);
        this._container.appendChild(this._barcodeimageElement);
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view



        //debugger;

        // CRM attributes bound to the control properties. 
        //var firstnameAttr = this._context.parameters.firstname.attributes.LogicalName;

        // setting CRM field values here. 
        //Xrm.Page.getAttribute(crmFileNameAttr).setValue(this._context.parameters.FileName.formatted);

	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
        return {
            barcodetext: this._barcodetext
        }; 
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
        // remove the event handlers. 
        this._barcodetextElement.removeEventListener("change", this._barcodetextChanged);
    }

    // event handlers 
    public barcodetextChanged(evt: Event): void {
        debugger;

        this._barcodetext = this._barcodetextElement.value

        var img = document.getElementById("qrcode") as HTMLImageElement;
        if (this._barcodetext == "" || this._barcodetext == null) {
            img.src = "";
        } else {
            var QRCode = require('qrcode');
            QRCode.toDataURL(this._barcodetext)
                .then((url: string) => {
                    var img = document.getElementById("qrcode") as HTMLImageElement;
                    img.src = url;
                })
                .catch((err: any) => {
                    console.error(err);
                });
        }


        // this will call the getOutputs method. 
        this._notifyOutputChanged();
    }

}
