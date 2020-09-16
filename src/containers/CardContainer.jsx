import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import '../App.css';
import Card from '../components/Card';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

/**
 * Display bios as list of cards.
 *
 * @param {string} title
 *   Title of list
 * @param {array} bios
 *   List of bios
 * @param {function} updateItem
 *   Function to update status field and move item to another list. Requires drupalId
 *  * @param {array} included
 *   List of headshot includes
 *
 */
function CardContainer(props) {
  const {
    title,
    bios,
    updateItem,
    included,
    // animate,
  } = props;

  /**
   * Return Card components with headshot from included array
   */
  function displayItems() {
    return bios.map((obj) => {
      const file = included.find((head) => (
        head.id === obj.relationships.field_headshot.data.id
      )).attributes.filename;
      return (
        <CSSTransition
          key={obj.id}
          timeout={500}
          classNames="fade"
        >
          <Card
            key={obj.id}
            summary={obj.attributes.body.summary}
            name={obj.attributes.title}
            nodeId={obj.attributes.drupal_internal__nid}
            updateItem={updateItem}
            drupalId={obj.id}
            headshotId={obj.relationships.field_headshot.data.id}
            headshotAlt={obj.relationships.field_headshot.data.meta.alt}
            headshotFilename={file}
          />
        </CSSTransition>
      );
    });

    // return false;
  }

  /**
   * Display Card components with title and count
   */
  return (
    <div className="list">
      <h2>
        {title}
        {' '}
        <span>{bios.length ? `(${bios.length} item${bios.length > 1 ? 's' : ''})` : null}</span>
      </h2>
      <Row>
        {bios.length ? (
          <TransitionGroup component={null}>
            {displayItems()}
          </TransitionGroup>
        ) : (<div>Ready for bios!</div>)}
      </Row>
    </div>
  );
}

/**
 * Define propTypes per Airbnb ESLint rules:
 * https://github.com/airbnb/javascript/tree/master/react#props
 */
CardContainer.propTypes = {
  title: PropTypes.string.isRequired,
  bios: PropTypes.array,
  updateItem: PropTypes.func.isRequired,
  included: PropTypes.array.isRequired,
};
CardContainer.defaultProps = {
  bios: [],
};

export default CardContainer;
