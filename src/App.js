import "./App.css";
import { useState } from "react";
import Fields from "./components/Fields";
import addIcon from "./assets/addIcon.svg";
import createField from "./utils/createField";
import { Card, Container, Tooltip } from "@mui/material";
import "./App.css";

const interfaceObject = [
  {
    key: "person",
    type: "object",
    isRequired: true,
    properties: [
      {
        key: "age",
        type: "number",
        isRequired: true,
      },
    ],
  },
  {
    key: "order",
    type: "string",
    isRequired: true,
  },
  {
    key: "class",
    type: "object",
    isRequired: false,
  },
];

function App() {
  const [data, setData] = useState(interfaceObject);

  return (
    <Container>
      <Card style={{ backgroundColor: "#f5f0f0", padding: "20px" }}>
        <Tooltip title="Add Field">
          <img
            src={addIcon}
            alt="add Field icon"
            className="addIcon"
            onClick={() => {
              setData([...data, createField()]);
            }}
          />
        </Tooltip>
        <Fields data={data} />
      </Card>
    </Container>
  );
}

export default App;
