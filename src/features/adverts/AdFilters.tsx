import React, { Fragment, useContext } from "react";
import { Menu, Header, Dropdown, Segment, Divider } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";

const AdvertFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.adStore;
  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%", marginTop: 50 }}>
       
          <Header icon={"filter"} attached color={"blue"} content={"Filters"} />
          {/* <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate('all', 'true')}
          color={'blue'}
          name={'all'}
          content={'All Adverts'}
        />
  
        <Menu.Item
          active={predicate.has('isAdvertCreator')}
          onClick={() => setPredicate('IsAdvertCreator', 'true')}
          color={'blue'}
          name={'advertiser'}
          content={"My adverts"}
        /> */}
         <Segment>
          <Dropdown
            clearable
            fluid
            multiple
            search
            selection
            // options={countryOptions}
            placeholder="Select City"
          />
          <Divider section />
          <Dropdown
            clearable
            fluid
            multiple
            search
            selection
            // options={countryOptions}
            placeholder="Select Car Make"
          />
        </Segment>
      </Menu>
    </Fragment>
  );
};

export default observer(AdvertFilters);
