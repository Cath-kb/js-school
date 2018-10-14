import React from "react";
const titles = {
  repos: 'Repositories',
  following: 'Following',
  followers: 'Followers',
};

const StatisticItem = ({title, value}) => (
  <li className="list-group-item d-flex justify-content-between align-items-center">
    {title}: <span className="badge badge-primary badge-pill">{value}</span>
  </li>
);

const Statistics = ({data}) => {
  const keys = Object.keys(data);

  return (
    <div>
      <h4><strong>Statistics:</strong></h4>
      <ul className="list-group">
        {keys.map(key => (
          <StatisticItem
            key={key}
            title={titles[key] || key}
            value={data[key]}
          />
        ))}
      </ul>
    </div>
  );
};

export default Statistics;
