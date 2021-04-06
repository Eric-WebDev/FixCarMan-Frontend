import React, { useContext } from "react";
import { Container, Tab } from "semantic-ui-react";
import NotFound from "../../app/layout/NotFound";
import ProfileAdverts from "./ProfileAdverts";
import ProfileDescription from "./ProfileDescription";

const panes = [
  { menuItem: "About", render: () => <ProfileDescription /> },
  { menuItem: "My Adverts", render: () => <ProfileAdverts /> },
  { menuItem: "Messages", render: () => <NotFound /> },
];
const panes2 = [
  { menuItem: "About", render: () => <ProfileDescription /> },
  { menuItem: "Fixed Cars", render: () => <ProfileAdverts /> },
  { menuItem: "Messages", render: () => <NotFound /> },
];

interface IProps {
  setActiveTab: (activeIndex: any) => void;
  isGarage: boolean;
}

const ProfileContent: React.FC<IProps> = ({ setActiveTab, isGarage }) => {
  return (
    <Container>
      {isGarage && (
        <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition="right"
          panes={panes}
          onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
      )}
      {!isGarage && (
        <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition="right"
          panes={panes2}
          onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
      )}
    </Container>
  );
};

export default ProfileContent;
