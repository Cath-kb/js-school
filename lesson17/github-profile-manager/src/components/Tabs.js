import React from "react";
import { Link } from "react-router-dom";

import { STATISTIC_TITLES as titles } from '../consts';
import UserProfileContext from '../model/UserProfileContext';

const TabItem = ({title, value, props}) => {
  const isActive = () => {
    return (props.location.pathname).indexOf(`/${title}`) > -1;
  };

  const isDisabled = () => {
    return (title).indexOf(`${titles.repos}`) > -1;
  };

  return (
    <li className="nav-item">
      <Link to={`${props.match.url}/${title}`}
            className={`
              text-capitalize
              ${isActive() ? 'active' : ''}
              ${isDisabled() ? 'disabled link-unstyled' : 'link-styled'}
            `}
      >
        {title}
      </Link>
      <span className="item-value">&nbsp;({value})</span>
    </li>
  )
};

const Tabs = ({props}) => (
  <UserProfileContext.Consumer>
    {
      ({statistics: data }) => (
        <ul className="nav nav-fill">
          {Object.keys(data).map(key => (
            <TabItem
              key={key}
              title={titles[key] || key}
              value={data[key]}
              props={props}
            />
          ))}
        </ul>
      )
    }
  </UserProfileContext.Consumer>
);

export default Tabs;
