import format from "date-fns/format";
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Item, Label } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import AdItem from "./AdItem";

const AdList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { adsByDate } = rootStore.adStore;
  return (
    <Fragment>
      {adsByDate.map(([group, ads]) => (
        <Fragment key={group}>
          {/* <Label size='large' color='blue'>
            {format(group, 'eeee do MMMM')}
          </Label> */}
          <Item.Group divided>
            {ads.map(ad => (
              <AdItem key={ad.id} ad={ad}/>
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(AdList);