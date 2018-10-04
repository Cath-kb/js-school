import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Following from "./Following";
import Followers from "./Followers";
import PersonInfo from "./Person";
import Tabs from "./Tabs";

class Profile extends React.Component {

  render() {
    const { person, statistics } = this.props.user;
    const { url } = this.props.match;

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <PersonInfo person={person} to={`/${person.login}/edit`} />
          </div>
          <div className="col-md-8">
            <Tabs data={statistics} props={this.props} />
            <hr />
            <Switch>
              <Route path={`/:user_login/following`} component={Following} />
              <Route path={`/:user_login/followers`} component={Followers} />
              <Route render={() => <Redirect to={`${url}/following`} />} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
