import React, { Fragment, useContext } from "react";
import {
  Menu,
  Header,
  Dropdown,
  Segment,
  Divider,
  Button,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
export const cityOptions = [
  { key: "sligo", text: "Sligo", value: "sligo" },
  { key: "tubbercurry", text: "Tubbercurry", value: "tubbercurry" },
  { key: "balymote", text: "Tubbercurry", value: "tubbercurry" },
  { key: "ballina", text: "Ballina", value: "ballina" },
  { key: "donegal", text: "Donegal", value: "donegal" },
];
export const carMake = [
  { key: "bmw", text: "BMW", value: "bmv" },
  { key: "audi", text: "Audi", value: "audi" },
  { key: "volvo", text: "Volvo", value: "volvo" },
  { key: "mercedes", text: "Mercedes", value: "Merceded" },
  { key: "peugot", text: "Peugot", value: "peugot" },
  { key: "Renault", text: "Renault", value: "renault" },
];
const AdvertFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.adStore;
  return (
    <Fragment>
      <Header
        fluid
        icon={"filter"}
        attached
        color={"blue"}
        content={"Filters"}
      />
      <Segment>
        <Dropdown
          text="Select City"
          icon="filter"
          fluid
          labeled
          button
          className="icon"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="All"
              onClick={() => setPredicate("All")}
              color={"blue"}
              name={"All"}
              content={"All"}
            />
            <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="Sligo"
              onClick={() => setPredicate("Sligo")}
              color={"blue"}
              name={"Sligo"}
              content={"Sligo"}
            />
            <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="Tubbercurry"
              onClick={() => setPredicate("Tubbercurry")}
              color={"blue"}
              name={"Tubbercurry"}
              content={"Tubbercurry"}
            />
            {/* <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="Ballina"
              onClick={() => setPredicate("Ballina")}
              color={"blue"}
              name={"Ballina"}
              content={"Ballina"}
            />
            <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="Donegal"
              onClick={() => setPredicate("Donegal")}
              color={"blue"}
              name={"Donegal"}
              content={"Donegal"}
            />
               <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="Balymote"
              onClick={() => setPredicate("Balymote")}
              color={"blue"}
              name={"Balymote"}
              content={"Balymote"}
            /> */}
          </Dropdown.Menu>
        </Dropdown>
        <Divider />
        <Dropdown
          text="Select Car Make"
          icon="filter"
          fluid
          labeled
          button
          className="icon"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="All"
              onClick={() => setPredicate("All")}
              color={"blue"}
              name={"All"}
              content={"All"}
            />
            <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="Audi"
              onClick={() => setPredicate("Audi")}
              color={"blue"}
              name={"Audi"}
              content={"Audi"}
            />
            <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="BMW"
              onClick={() => setPredicate("BMW")}
              color={"blue"}
              name={"BMW"}
              content={"BMW"}
            />
            <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="Volvo"
              onClick={() => setPredicate("Volvo")}
              color={"blue"}
              name={"Volvo"}
              content={"Volvo"}
            />
            <Dropdown.Item
              label={{ color: "blue", empty: true, circular: true }}
              text="Hyundai"
              onClick={() => setPredicate("Hyundai")}
              color={"blue"}
              name={"Hyundai"}
              content={"Hyundai"}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Segment>
    </Fragment>
  );
};

export default observer(AdvertFilters);
