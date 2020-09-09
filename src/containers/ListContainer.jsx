import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../components/ListItem';


/**
 * Helper function to validate data retrieved from JSON:API.
 */
// function isValidData(data) {
//   if (data === null) {
//     return false;
//   }
//   if (data.data === undefined ||
//     data.data === null ||
//     data.data.length === 0 ) {
//     return false;
//   }
//   return true;
// }


function ListContainer(props) {
  const {
    title,
    bios,
    updateItem,
  } = props;

  // function displayListItems() {
    // if (isValidData(data)) {
    //   console.log("We're going!");
    //   console.log(data);
      // return bios.map(obj => (
      //   <ListItem 
      //     key={obj.id} 
      //     name={obj.attributes.title} 
      //     nodeId={obj.attributes.drupal_internal__nid}
      //     updateItem={updateItem} 
      //     drupalId={obj.id}
      //   />
      // ));
    // }
    // else {
    //   return <tr><td colspan="3">No data available.</td></tr>
    // } 
  // }

  return (
    <div className="list">
      
      <h2>{title}</h2>
      <table className="views-table views-view-table cols-7 responsive-enabled sticky-enabled sticky-table">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>        
          {bios.map(obj => {
            return (
            <ListItem 
              key={obj.id} 
              name={obj.attributes.title} 
              nodeId={obj.attributes.drupal_internal__nid}
              updateItem={updateItem} 
              drupalId={obj.id}
            />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Define propTypes per Airbnb ESLint rules:
 * https://github.com/airbnb/javascript/tree/master/react#props
 */
ListContainer.propTypes = {
  title: PropTypes.string.isRequired,
  bios: PropTypes.array.isRequired,
  updateItem: PropTypes.func.isRequired,
};

export default ListContainer;