import React from 'react';

/* TODO: extra features: 
** 1. remove button (x) on top right corner
** 2. edit button on bottom right corner pops new form with 'Edit' title
*/
const DevItem = ({dev}) => {
    return (
      <li className="dev-item">
        <header>
          <img src={dev.avatar_url} alt={dev.name} />
          <div className="user-info">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(", ")}</span>
          </div>
        </header>
        <p>{dev.bio}</p>
        <a
          href={`https://github.com/${dev.github_username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          see Github profile
        </a>
      </li>
    );
}

export default DevItem;