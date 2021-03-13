import React from 'react';
import { Card, Image, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IProfile } from '../../app/models/profiles/profile';


interface IProps {
    profile: IProfile
}

const ProfileCard: React.FC<IProps> = ({profile}) => {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{profile.username}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name='user' />
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
