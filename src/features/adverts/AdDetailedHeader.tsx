import React, { useContext } from "react";
import { Segment, Item, Header, Button, Image, Form } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IAdvert } from "../../app/models/advertsFixCar/adverts";
import { RootStoreContext } from "../../app/stores/rootStore";
import AdDetailedInfo from "./AdDetailedInfo";
import ReactContactForm from "react-mail-form";

// const adImageStyle = {
//   filter: 'brightness(30%)'
// };

// const adImageTextStyle = {
//   position: 'absolute',
//   bottom: '5%',
//   left: '5%',
//   width: '100%',
//   height: 'auto',
//   color: 'white'
// };

const AdDetailedHeader: React.FC<{ ad: IAdvert }> = ({ ad }) => {
  const rootStore = useContext(RootStoreContext);
  const { loading } = rootStore.adStore;
  const { user, isLoggedIn } = rootStore.userStore;
  return (
    <Segment.Group>
      <Segment attached="top" style={{ padding: "0" }}>
        <Segment basic>
          <Item.Group>
            <Item>
              
              <Item.Content>
                <Header
                  size="huge"
                  content={ad.title}
                  style={{ color: "green" }}
                />
                <p>{format(ad.date, "eeee do MMMM")}</p>
                <p>
                  Advertised by{" "}
                  <Link to={`/profile/${ad.advertiserUsername}`}>
                    <strong>{ad.advertiserUsername}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment clearing attached="bottom">
        <AdDetailedInfo ad={ad} />
        {isLoggedIn && user?.username === ad.advertiserUsername ? (
          <Button
            as={Link}
            to={`/manage/${ad.id}`}
            color="green"
            floated="right"
          >
            Manage Advert
          </Button>
        ) : user?.UserGarage!=="garage" ? (
          // <Button loading={loading} >
          //   Send private message
          // </Button>

          <Segment inverted>
            <Form inverted>
              <Form.Group widths="equal">
              <ReactContactForm to="test@email.com" contentsPlaceholder="Your Message" buttonText="Send Email" className="contactForm"/>
              </Form.Group>
            </Form>
          </Segment>
        ) : (
          <Header centered>Contact provided only for verified users</Header>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(AdDetailedHeader);
