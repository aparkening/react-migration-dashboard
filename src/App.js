import React from 'react';
import initialData from './InitialData'; // Test JSON data
import ListItem from './components/ListItem';


/**
 * Main App
 */
class App extends React.Component {
  constructor() {
    super();
    this.isValidData = this.isValidData.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.displayListItems = this.displayListItems.bind(this);
  }

  /**
   * Helper function to validate data retrieved from JSON:API.
   */
  isValidData(data) {
    if (data === null) {
      return false;
    }
    if (data.data === undefined ||
      data.data === null ||
      data.data.length === 0 ) {
      return false;
    }
    return true;
  }

  /**
   * Update node status
   */
  updateItem(drupalId) {
    console.log(`Bio id is ${drupalId}`);
  }

  /**
   * Create ListItem components or empty message
  */
  displayListItems(bioData) {
    if (this.isValidData(bioData)) {
      return bioData.data.map(obj => (
        <ListItem 
          key={obj.id} 
          name={obj.attributes.title} 
          nodeId={obj.attributes.drupal_internal__nid}
          updateItem={this.updateItem} 
          drupalId={obj.id}
        />
      ));
    }
    else {
      return <tr><td colspan="3">No data available.</td></tr>
    } 
  }

  /**
   * Display Migration Dashboard
   *
   * Retrieves bios from Drupal's JSON:API and then displays
   * them in To Do, In Progress, and Done lists. Bios can be 
   * moved between To Do and In Progess.
   */
  render() {
    const bioData = initialData; 

    return (
      <div className="App">
        <table className="views-table views-view-table cols-7 responsive-enabled sticky-enabled sticky-table">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
              {/* <th>Edit Bio</th> */}
            </tr>
          </thead>
          <tbody>        
            {this.displayListItems(bioData)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
