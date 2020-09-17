import React from 'react';
/*
* Switch production/local
*/
// import initialData from './InitialData'; // Local JSON data
import ListContainer from './containers/ListContainer';
import CardContainer from './containers/CardContainer';
import Alert from './components/Alert';

/**
 * Helper function to validate data retrieved from JSON:API.
 */
function isValidData(data) {
  if (data === null) {
    return false;
  }
  if (data.data === undefined
    || data.data === null
    || data.data.length === 0) {
    return false;
  }
  return true;
}

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

    /*
    * Switch production/local
    */
    // Production
    this.state = {
      alert: '',
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

    // Local
    /*
    this.state = {
      alert: '',
      bioData: initialData.data,
      bioIncluded: initialData.included,
      lists: {
        inProgress: {
          id: 'inProgress',
          title: 'In Progress',
          bios: initialData.data.filter((node) => node.attributes.field_2020_migration_status === 'In Progress'),
        },
        todo: {
          id: 'todo',
          title: 'To Do',
          bios: initialData.data.filter((node) => node.attributes.field_2020_migration_status === 'To Do'),
        },
        done: {
          id: 'done',
          title: 'Done',
          bios: initialData.data.filter((node) => node.attributes.field_2020_migration_status === 'Done'),
        },
      },
    };
    */

    this.updateItem = this.updateItem.bind(this);
    this.fetchUpdate = this.fetchUpdate.bind(this);
    this.slowChangeAlert = this.slowChangeAlert.bind(this);

    this.fetchItems(); // Populate state from fetch
  }

  /**
   * Fetch nodes from JSON:API and populate state.
   * Display errors in console log.
   */
  fetchItems() {
    /*
    * Switch production/local
    */
    // Production
    const url = '/alittlebithidden/437/jsonapi/node/bio?include=field_headshot';

    // Local
    // const url = 'https://test.com/alittlebithidden/437/jsonapi/node/bio?include=field_headshot';

    // Fetch all bios with headshots
    fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((data) => {
              if (isValidData(data)) {
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
              }
            });
        } else {
          throw Error(response.statusText);
        }
      })
      .catch((error) => console.log('Initial GET API error', error));
  }

  /**
   * Patch node with JSON:API
   * Update state on successful patch.
   * Display errors in Alert component console log.
   */
  fetchUpdate(drupalId, oldListId, newListId, newMigrationStatus) {
    // Update bioData with new status
    const { bioData } = this.state;
    const thisBio = bioData.find((node) => node.id === drupalId);
    // const revertedStatus = thisBio.attributes.field_2020_migration_status;
    thisBio.attributes.field_2020_migration_status = newMigrationStatus;

    // Remove item from old list
    const updatedOldList = this.state.lists[oldListId].bios.filter((node) => node.id !== drupalId);

    /*
    * Switch production/local
    */
    // Production
    const tokenUrl = '/session/token?_format=json';
    const patchUrl = `/alittlebithidden/437/jsonapi/node/bio/${drupalId}`;

    // Local
    // const tokenUrl = `https://test.com/alittlebithidden/session/token`;
    // const patchUrl = `https://test.com/alittlebithidden/437/jsonapi/node/bio/${drupalId}`;
    // Update state
    // Remove from old list and
    // Add to new list
    /*
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
            thisBio,
          ],
        },
      },
    });
    */

    let token;

    // Get token and patch bio
    fetch(tokenUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
      },
    })
      .then((response) => response.text())
      .then((responseToken) => {
        // Patch with responseToken
        token = responseToken;
        fetch(patchUrl, {
          method: 'PATCH',
          credentials: 'same-origin',
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'X-CSRF-Token': token,
          },
          body: JSON.stringify({
            'data': {
              'type': 'node--bio',
              'id': drupalId,
              'attributes': {
                'field_2020_migration_status': newMigrationStatus,
              },
            },
          }),
        })
          .then((patchResponse) => {
            if (!patchResponse.ok) {
            // Alert user to failure
              this.setState({
                ...this.state,
                alert: "Node couldn't be updated on the server.",
              });
              throw Error(patchResponse.statusText);
            }
            // Update state
            // Remove from old list and
            // Add to new list
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
                    thisBio,
                  ],
                },
              },
            });
          })
          .catch((error) => console.log('API Patch error', error));
      })
      .catch((error) => console.log('API Token error', error));
  }

  /**
   * Update node status in state and Drupal server
   */
  updateItem(drupalId, oldListId, newListId, newMigrationStatus) {
    // Update server node
    // Only update state on success
    this.fetchUpdate(drupalId, oldListId, newListId, newMigrationStatus);
  }

  /**
   * Helper function to slowly fade alerts.
   */
  slowChangeAlert() {
    if (this.state.alert.length > 0) {
      setTimeout(() => {
        this.setState({
          ...this.state,
          alert: '',
        });
      }, 5000);

      return (
        <Alert
          message={this.state.alert}
          type="danger"
        />
      );
    }
    return false;
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

        {this.slowChangeAlert()}
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
