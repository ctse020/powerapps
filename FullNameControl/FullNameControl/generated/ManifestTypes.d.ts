/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    lastname: ComponentFramework.PropertyTypes.StringProperty;
    firstname: ComponentFramework.PropertyTypes.StringProperty;
    middlename: ComponentFramework.PropertyTypes.StringProperty;
    fullname: ComponentFramework.PropertyTypes.StringProperty;
}
export interface IOutputs {
    lastname?: string;
    firstname?: string;
    middlename?: string;
    fullname?: string;
}
