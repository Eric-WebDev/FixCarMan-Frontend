import React, { useContext } from "react";
import { Container, Tab } from "semantic-ui-react";
import NotFound from "../../app/layout/NotFound";
import { IProfile } from "../../app/models/profiles/profile";
import { RootStoreContext } from "../../app/stores/rootStore";
import ProfileAdverts from "./ProfileAdverts";
import ProfileDescription from "./ProfileDescription";

// const rootStore = useContext(RootStoreContext);
// const { user} = rootStore.userStore;

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
  profile: IProfile;
}

const ProfileContent: React.FC<IProps> = ({ setActiveTab, profile }) => {
  return (
    <Container>
      {profile?.UserGarage == "garage" && (
        <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition="right"
          panes={panes}
          onTabChange={(e, data) => setActiveTab(data.activeIndex)}
        />
      )}
      {profile?.UserGarage !== "garage" && (
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
