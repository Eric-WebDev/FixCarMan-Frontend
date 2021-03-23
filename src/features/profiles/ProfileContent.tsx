import React from 'react';
import { Tab } from 'semantic-ui-react';
import NotFound from '../../app/layout/NotFound';
import ProfileAdverts from './ProfileAdverts';
import ProfileDescription from './ProfileDescription';

const panes = [
  { menuItem: 'About', render: () => <ProfileDescription /> },
  { menuItem: 'My Adverts', render: () => <ProfileAdverts/> },
  { menuItem: 'My Cars', render: () => <NotFound /> },
  { menuItem: 'Messages', render: () => <NotFound /> }
];

interface IProps {
    setActiveTab: (activeIndex: any) => void;
}

const ProfileContent: React.FC<IProps> = ({setActiveTab}) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
};

export default ProfileContent;