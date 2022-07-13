import React from 'react';

export const Remote = (props) => {

  const data = (props && props.mode !== "library") ? props : Definition;
  const inputs = data.inputs;

  const style = {
    padding: "0.5em",
    whiteSpace: "pre-wrap",
    backgroundColor: inputs.backgroundColor,
    color: inputs.textColor,
    fontSize: inputs.size + "em"
  };
  if (inputs.font){
    style["fontFamily"] = inputs.font;
  }

  const device = () => {
    if (inputs.showDevice && inputs.attribute.device) 
      return (inputs.showAttribute) ? inputs.attribute.device + "/" : inputs.attribute.device;
    return "";
  }

  const display = () => {
    return (inputs.attribute && inputs.attribute.label && inputs.attribute.label.length) ? inputs.attribute.label : "attributeLabel";
  }

  const values = () => {
    return (inputs.attribute && inputs.attribute.value) ? inputs.attribute.value : "value";
  }

  return (
    <div id="AttributeDisplay" style={style}>
      <div>
        Mode = {props.mode}
      </div>
      {device()}
      {display()}
      {(inputs.showDevice || inputs.showAttribute !== "None") && ": "}
      {values()}
    </div>
  );
};

const Definition = {
  idKey: "ATTRIBUTE_DISPLAY",
  type: "ATTRIBUTE_DISPLAY",
  name: "Remote Att. Display",
  defaultWidth: 10,
  defaultHeight: 2,
  inputs: {
    showAttribute: "Label",
    attribute: {
      type: "attribute",
      label: "",
      dataFormat: "scalar",
      required: true
    },
    precision: {
      type: "number",
      label: "Precision",
      default: 2
    },
    showDevice: {
      type: "boolean",
      label: "Device Name",
      default: true           // TREVOR : false
    },
    showAttribute: {
      type: "select",
      label: "Attribute display:",
      default: "Label",
      options: [
        {
          name: "Label",
          value: "Label"
        },
        {
          name: "Name",
          value: "Name"
        },
        {
          name: "None",
          value: "None"
        }
      ]
    },
    scientificNotation: {
      type: "boolean",
      label: "Scientific Notation",
      default: false
    },
    showEnumLabels: {
      type: "boolean",
      label: "Show Enum Labels",
      default: false
    },
    textColor: {
      label: "Text Color",
      type: "color",
      default: "#000000"
    },
    backgroundColor: {
      label: "Background Color",
      type: "color",
      default: "#ffffff"
    },
    size: {
      label: "Text size (in units)",
      type: "number",
      default: 1,
      nonNegative: true
    },
    font: {
      type: "select",
      default: "Helvetica",
      label: "Font type",
      options: [
        {
          name: "Default (Helvetica)",
          value: "Helvetica"
        },
        {
          name: "Monospaced (Courier new)",
          value: "Courier new"
        }
      ]
    }
  }
};

const RemoteObject = { Definition: Definition, Remote: Remote };

export default RemoteObject;
