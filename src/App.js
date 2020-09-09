import React from 'react';
import initialData from './InitialData'; // Test JSON data
import ListContainer from './containers/ListContainer';
// import CardContainer from './containers/CardContainer';

/**
 * Main App
 */
class App extends React.Component {
  constructor() {
    super();

    // Set initial state
    this.state = {
      lists: {
        inProgress: {
          id: 'in-progress',
          title: 'In Progress',
          bioIds: initialData.data.filter(node => node.attributes.field_2020_migration_status === 'In Progress'),
        },
        todo: {
          id: 'to-do',
          title: 'To Do',
          bioIds: initialData.data.filter(node => node.attributes.field_2020_migration_status === 'To Do'),
        },
        done: {
          id: 'done',
          title: 'Done',
          bioIds: initialData.data.filter(node => node.attributes.field_2020_migration_status === 'Done'),
        },
      },
      bioData: initialData.data,
      bioIncluded: initialData.included,
    }

    this.isValidData = this.isValidData.bind(this);
    this.updateItem = this.updateItem.bind(this);
    // this.displayLists = this.displayLists.bind(this);
    // this.displayListItems = this.displayListItems.bind(this);
    // this.displayCardItems = this.displayCardItems.bind(this);
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
  updateItem(drupalId, listName) {
    console.log(`Bio id is ${drupalId}`);
    console.log(`New list name is ${listName}`);

    
    // Move item to new list

    // Update item node
      // If failure, move back to old list

    // Remove item from old list
    // const updatedOldList = this.state.lists[oldListId].taskIds.filter(task => task !== id)

  }

  /**
   * Create ListItem components or empty message
  */
  // displayListItems(bioData) {
  //   if (this.isValidData(bioData)) {
  //     return bioData.data.map(obj => (
  //       <ListItem 
  //         key={obj.id} 
  //         name={obj.attributes.title} 
  //         nodeId={obj.attributes.drupal_internal__nid}
  //         updateItem={this.updateItem} 
  //         drupalId={obj.id}
  //       />
  //     ));
  //   }
  //   else {
  //     return <tr><td colspan="3">No data available.</td></tr>
  //   } 
  // }

  // displayCardItems(bioData) {
  //   if (this.isValidData(bioData)) {
  //     return bioData.data.map(obj => {
  //       const file = bioData.included.find(head => head.id === obj.relationships.field_headshot.data.id).attributes.filename;
  //       return (
  //         <Card 
  //           key={obj.id} 
  //           summary={obj.attributes.body.summary}
  //           name={obj.attributes.title} 
  //           nodeId={obj.attributes.drupal_internal__nid}
  //           updateItem={this.updateItem} 
  //           drupalId={obj.id}
  //           headshotId={obj.relationships.field_headshot.data.id}
  //           headshotAlt={obj.relationships.field_headshot.data.meta.alt}
  //           headshotFilename={file}
  //         />
  //       );
  //     });
  //   }
  //   else {
  //     return <div>No data available.</div>
  //   } 
  // }


  // displayLists() {
    // return this.state.lists.map((listId) => {
    //   const list = this.state.lists[listId];
    //   const bios = list.bioIds.map(bioId => this.state.bioData[bioId]);
    //   return (
    //     <ListContainer 
    //       key={list.id} 
    //       title={list.title}
    //       bios={bios}
    //       updateItem={this.updateItem} 
    //     />
    //   );
    // });
  // }


  /**
   * Display Migration Dashboard
   *
   * Retrieves bios from Drupal's JSON:API and then displays
   * them in To Do, In Progress, and Done lists. Bios can be 
   * moved between To Do and In Progess.
   */
  render() {
    // Display order of status lists
    const displayOrder = ['inProgress', 'todo', 'done'];

    return (
      <div className="App">
        {/* {this.displayLists()} */}

        {displayOrder.map((listId) => {
          const list = this.state.lists[listId];
          // // const bios = list.bioIds.map(bioId => this.state.bioData[bioId]);
          return (
            <ListContainer 
              key={list.id} 
              title={list.title}
              bios={list.bioIds}
              updateItem={this.updateItem} 
            />
          );
        })}
      </div>
    );
  }
}

export default App;
