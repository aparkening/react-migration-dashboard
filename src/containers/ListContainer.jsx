import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../components/ListItem';

/**
 * Display bios in table lists.
 *
 * @param {string} title
 *   Title of list
  * @param {string} listId
 *   Id of list
 * @param {array} bios
 *   List of bios
 * @param {function} updateItem
 *   Function to update status field and move item to another list. Requires drupalId
 *
 */
function ListContainer(props) {
  const {
    title,
    listId,
    bios,
    updateItem,
  } = props;

  /**
   * Helper function to validate data retrieved from JSON:API.
   */
  function isValidData(data) {
    if (data === null) {
      return false;
    }
    if (data === undefined ||
      data === null ||
      data.length === 0 ) {
      return false;
    }
    return true;
  }

  /**
   * Return ListItem components
   */
  function displayItems() {
    if (isValidData(bios)) {
      return bios.map(obj => (
        <ListItem 
          key={obj.id} 
          name={obj.attributes.title} 
          nodeId={obj.attributes.drupal_internal__nid}
          updateItem={updateItem} 
          drupalId={obj.id}
          listId={listId}
        />
      ));
    }
    else {
      return <tr><td colSpan="2">No data available.</td></tr>
    } 
  }

  /**
   * Display List components with title and count
   */
  return (
    <div className="list">
      <h2>{title} <span>{isValidData(bios) ? `${bios.length} item${bios.length>1 ? 's' : ''}` : null}</span></h2>
      <table className="views-table views-view-table cols-7 responsive-enabled sticky-enabled sticky-table">
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody> 
          {displayItems()}
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
  listId: PropTypes.string.isRequired,
  bios: PropTypes.array,
  updateItem: PropTypes.func.isRequired,
};

export default ListContainer;