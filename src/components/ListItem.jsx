import React from 'react';
import PropTypes from 'prop-types';

/**
 * Display an individual bio in table form.
 *
 * @param {string} name
 *   Full name of bio
 * @param nodeId
 *   drupal_internal__nid of the bio
 * @param {function} updateItem
 *   Function to update status field and move item to another list. Requires drupalId
 * @param drupalId
 *   Data id of bio
 *
 */
function ListItem(props) {
  const {
    name,
    nodeId,
    updateItem,
    drupalId,
    listId,
  } = props;

  return (
    <tr>
      <td>
        <a href={`/node/${nodeId}`}>{name}</a>
      </td>
      <td>
        {listId === 'todo' ? (
          <button
            type="button"
            onClick={() => {
              updateItem(drupalId, listId, 'inProgress', 'In Progress'); /* drupalId, oldListId, newListId, newMigrationStatus */
            }}
          >
            Add to In Progress
          </button>
        ) : (<span>&nbsp;</span>)}
      </td>
    </tr>
  );
}

/**
 * Define propTypes per Airbnb ESLint rules:
 * https://github.com/airbnb/javascript/tree/master/react#props
 */
ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  nodeId: PropTypes.number.isRequired,
  drupalId: PropTypes.string.isRequired,
  updateItem: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
};

export default ListItem;
