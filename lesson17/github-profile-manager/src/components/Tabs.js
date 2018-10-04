import React from "react";
import { Link } from "react-router-dom";

import { STATISTIC_TITLES as titles } from '../consts';

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

const Tabs = ({data, props}) => {
  const keys = Object.keys(data);

  return (
    <React.Fragment>
      <ul className="nav nav-fill">
        {keys.map(key => (
          <TabItem
            key={key}
            title={titles[key] || key}
            value={data[key]}
            props={props}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Tabs;
