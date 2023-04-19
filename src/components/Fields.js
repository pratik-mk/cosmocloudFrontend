import { useCallback, useState } from "react";
import EditableText from "./EditableText";
import createField from "../utils/createField";
import addIcon from "../assets/addIcon.svg";
import trashIcon from "../assets/trashIcon.svg";
import { MenuItem, Select, Switch, Tooltip } from "@mui/material";
import "../App.css";
import "./Styles/Fields.css";

export default function Fields({ data }) {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const handleDataTypeChange = (obj, value) => {
    if (obj.type === "object" && value !== "object") {
      delete obj.properties;
      obj.type = value;
    } else if (obj.type !== "object" && value === "object") {
      obj.type = value;
      obj.properties = [];
    } else {
      obj.type = value;
    }
    forceUpdate();
  };

  return (
    <div className="root">
      {data?.map((obj, index) => (
        <div key={index}>
          <ul className="ulRoot">
            <div id="fieldName">
              <EditableText
                data={obj}
                onSave={(newKey) => (obj.key = newKey)}
              />
              &nbsp;
              <Select
                style={{ height: "25px" }}
                value={obj.type}
                name="data-type"
                onChange={({ target }) =>
                  handleDataTypeChange(obj, target.value)
                }
              >
                <MenuItem value="string">STRING</MenuItem>
                <MenuItem value="number">NUMBER</MenuItem>
                <MenuItem value="boolean">BOOLEAN</MenuItem>
                <MenuItem value="object">OBJECT</MenuItem>
              </Select>
            </div>
            <div style={{ display: "flex" }}>
              {obj?.type === "object" && (
                <Tooltip title="Add Field">
                  <img
                    src={addIcon}
                    alt="Add Field"
                    className="icon"
                    onClick={() => {
                      if (obj?.properties?.length > 0)
                        obj.properties.push(createField());
                      else obj.properties = [createField()];
                      forceUpdate();
                    }}
                  />
                </Tooltip>
              )}
              &nbsp;
              <label>
                <Switch
                  value={obj.isRequired}
                  checked={obj.isRequired}
                  onChange={() => {
                    obj.isRequired = !obj.isRequired;
                    forceUpdate();
                  }}
                />
                Required
              </label>
              &nbsp;
              <Tooltip title="Delete Field">
                <img
                  src={trashIcon}
                  alt="Delete Field"
                  className="icon"
                  onClick={() => {
                    data.splice(index, 1);
                    forceUpdate();
                  }}
                />
              </Tooltip>
            </div>
          </ul>
          {obj?.type === "object" && (
            <ul className="ulChild">
              <Fields data={obj?.properties} />
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
