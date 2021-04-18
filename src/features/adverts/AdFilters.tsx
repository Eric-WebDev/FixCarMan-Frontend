import React, { Fragment, useContext } from "react";
import { Header, Dropdown, Segment, Divider } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";

const AdvertFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate } = rootStore.adStore;
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
