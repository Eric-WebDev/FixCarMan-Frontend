import React, { useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import AdStore from '../../app/stores/adStore';
import AdItem from './AdItem'
import { RootStoreContext } from '../../app/stores/rootStore';

const AdList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { adsByDate } = rootStore.adStore;
  return (
    <Fragment>
      {adsByDate.map(([group, ads]) => (
        <Fragment key={group}>
          {/* <Label size='large' color='blue'>
            Filter {group}
          </Label> */}
          <Item.Group divided>
            {ads.map(ad => (
              <AdItem key={ad.id} ad={ad} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(AdList);