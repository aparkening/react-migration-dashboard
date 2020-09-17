import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import ListItem from '../components/ListItem';

const Container = styled.div`
  margin-top: 3em;
  //When element enters dom */
  .fade-enter {
    opacity: 0;
  }
  /* After element enters [transition time] */
  .fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  /* When state turns false */
  .fade-exit {
    opacity: 1;
  }
  /* Right after exit [transition time] */
  .fade-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
  }
`;

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
   * Return ListItem components
   */
  function displayItems() {
    return bios.map((obj) => (
      <CSSTransition
        key={obj.id}
        timeout={500}
        classNames="fade"
      >
        <ListItem
          key={obj.id}
          name={obj.attributes.title}
          nodeId={obj.attributes.drupal_internal__nid}
          updateItem={updateItem}
          drupalId={obj.id}
          listId={listId}
        />
      </CSSTransition>
    ));
  }

  /**
   * Display List components with title and count
   */
  return (
    <Container>
      <h2>
        {title}
        {' '}
        <span>{bios.length ? `(${bios.length} item${bios.length > 1 ? 's' : ''})` : null}</span>
      </h2>
      <table className="views-table views-view-table cols-7 responsive-enabled sticky-enabled sticky-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>{' '}</th>
          </tr>
        </thead>
        <tbody>
          {bios.length ? (
            <TransitionGroup component={null}>
              {displayItems()}
            </TransitionGroup>
          ) : (<tr><td colSpan="2">No bios with this status.</td></tr>)}
        </tbody>
      </table>
    </Container>
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
ListContainer.defaultProps = {
  bios: [],
};

export default ListContainer;
