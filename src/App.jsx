import React from 'react';
// import initialData from './InitialData'; // Test JSON data
import ListContainer from './containers/ListContainer';
import CardContainer from './containers/CardContainer';

/**
 * Display Migration Dashboard
 *
 * Retrieves bios from Drupal's JSON:API and then displays
 * them in To Do, In Progress, and Done lists. Bios can be
 * moved between To Do and In Progess.
 */
class App extends React.Component {
  constructor() {
    super();

    // Set initial state
    this.state = {
      bioData: [],
      bioIncluded: [],
      lists: {
        inProgress: {
          id: 'inProgress',
          title: 'In Progress',
        },
        todo: {
          id: 'todo',
          title: 'To Do',
        },
        done: {
          id: 'done',
          title: 'Done',
        },
      },
    };

    // this.state = {
    //   lists: {
    //     inProgress: {
    //       id: 'inProgress',
    //       title: 'In Progress',
    //       bios: initialData.data.filter((node) => node.attributes.field_2020_migration_status === 'In Progress'),
    //     },
    //     todo: {
    //       id: 'todo',
    //       title: 'To Do',
    //       bios: initialData.data.filter((node) => node.attributes.field_2020_migration_status === 'To Do'),
    //     },
    //     done: {
    //       id: 'done',
    //       title: 'Done',
    //       bios: initialData.data.filter((node) => node.attributes.field_2020_migration_status === 'Done'),
    //     },
    //   },
    //   bioData: initialData.data,
    //   bioIncluded: initialData.included,
    // };

    this.isValidData = this.isValidData.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.fetchUpdate = this.fetchUpdate.bind(this);

    this.fetchItems(); // Populate state from fetch
  }

  /**
   * Populate state from Drupal's JSON:API
   * Fill bios array by field_2020_migration_status
   */
  componentDidMount() {
    // this.setState({
    //   bioData: initialData.data,
    //   bioIncluded: initialData.included,
    //   lists: {
    //     inProgress: {
    //       ...this.state.lists.inProgress,
    //       bios: initialData.data.filter((node) => (
    //        node.attributes.field_2020_migration_status === 'In Progress')
    //       ),
    //     },
    //     todo: {
    //       ...this.state.lists.todo,
    //       bios: initialData.data.filter((node) => (
    //        node.attributes.field_2020_migration_status === 'To Do')
    //       ),
    //     },
    //     done: {
    //       ...this.state.lists.done,
    //       bios: initialData.data.filter((node) => (
    //        node.attributes.field_2020_migration_status === 'Done')
    //       ),
    //     },
    //   },
    // });
  }

  /**
   * Helper function to validate data retrieved from JSON:API.
   */
  isValidData(data) {
    if (data === null) {
      return false;
    }
    if (data.data === undefined
      || data.data === null
      || data.data.length === 0 ) {
      return false;
    }
    return true;
  }

  /**
   * Fetch nodes from JSON:API and populate state.
   * Display console error if fetch fails.
   */
  fetchItems() {
    fetch('/jsonapi/node/bio?include=field_headshot', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          // Populate state with real data
          this.setState({
            bioData: data.data,
            bioIncluded: data.included,
            lists: {
              inProgress: {
                ...this.state.lists.inProgress,
                bios: data.data.filter((node) => (
                  node.attributes.field_2020_migration_status === 'In Progress')),
              },
              todo: {
                ...this.state.lists.todo,
                bios: data.data.filter((node) => (
                  node.attributes.field_2020_migration_status === 'To Do')),
              },
              done: {
                ...this.state.lists.done,
                bios: data.data.filter((node) => (
                  node.attributes.field_2020_migration_status === 'Done')),
              },
            },
          });
        });
      } else {
        console.log('error getting bios');
      }
    });
  }

  /**
   * Patch node with JSON:API
   */
  fetchUpdate(uuid, status) {
    const url = `/jsonapi/node/bio/${uuid}`;

    fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: [
          {
            "id": uuid,
            "attributes": {
              "field_2020_migration_status": status,
            },
          },
        ],
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
        });
        // return true;
      } else {
        console.log('error updating bio');
        return false;
      }
    });
  }

  /**
   * Update node status in state and Drupal server
   */
  updateItem(drupalId, nodeId, oldListId, newListId, newMigrationStatus) {
    // Record current data for error reversion
    const revertedBioData = [...this.state.bioData];
    const revertedLists = [...this.state.lists];

    // Update bioData with new status
    // const updatedBioData = [...this.state.bioData];
    const { bioData } = this.state;
    const updatedBio = bioData.find((node) => node.id === drupalId);
    updatedBio.attributes.field_2020_migration_status = newMigrationStatus;

    // Remove item from old list
    const updatedOldList = this.state.lists[oldListId].bios.filter((node) => node.id !== drupalId);

    // Update state
    this.setState({
      ...this.state,
      bioData,
      lists: {
        ...this.state.lists,
        [oldListId]: {
          ...this.state.lists[oldListId],
          bios: updatedOldList,
        },
        [newListId]: {
          ...this.state.lists[newListId],
          bios: [
            ...this.state.lists[newListId].bios,
            updatedBio,
          ],
        },
      },
    });

    // Update server node
    // If failure, revert to previous state
    if (this.fetchUpdate(drupalId, newMigrationStatus)) {
      console.log('UPDATE FAIL');
      this.setState({
        ...this.state,
        bioData: revertedBioData,
        lists: revertedLists,
      });
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
    // Display order of status lists
    const displayOrder = ['inProgress', 'todo', 'done'];

    return (
      <div className="App">
        {displayOrder.map((listId) => {
          const list = this.state.lists[listId];
          // Display Cards for In Progress
          if (listId === 'inProgress') {
            return (
              <CardContainer
                key={list.id}
                title={list.title}
                bios={list.bios}
                updateItem={this.updateItem}
                included={this.state.bioIncluded}
              />
            );
          }
          return (
            <ListContainer
              key={list.id}
              title={list.title}
              listId={list.id}
              bios={list.bios}
              updateItem={this.updateItem}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
