import '../styles/dashboard.css';

import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {Message, Icon, Segment, Table, Pagination} from 'semantic-ui-react';

import {getClassRequestor} from '../requests/requestBuilder';
import BurgerMenu from '../components/Burger';
import CreateClassForm from './CreateClassForm';

export const Dashboard = props => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);
  const [activePage, changePage] = useState(1);
  const [classesOnPage, setCurrentClasses] = useState([]);

  const fetchClasses = useCallback(() => {
    getClassRequestor(localStorage.getItem('userid'))
      .then(response => {
        // Sets the state to the data from the classes endpoint (class[])
        setClasses(response.data);
        setCurrentClasses(
          response.data.slice((activePage - 1) * 10, activePage * 10),
        );
        setLoading(false);
      })
      .catch(error => {
        // Error handler
        setLoading(false);
        console.error(error);
      });
  });

  useEffect(() => {
    setLoading(true);
    fetchClasses();
  }, [fetchClasses]);

  const handleSort = clickedColumn => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setClasses(_.sortBy(classes, [clickedColumn]));
      setCurrentClasses(classes.slice((activePage - 1) * 10, activePage * 10));
      setDirection('ascending');
      return;
    }

    setClasses(classes.reverse());
    setCurrentClasses(classes.slice((activePage - 1) * 10, activePage * 10));
    setDirection(direction === 'ascending' ? 'descending' : 'ascending');
  };

  const handlePaginationChange = (e, {activePage}) => {
    changePage(activePage);
    setCurrentClasses(classes.slice((activePage - 1) * 10, activePage * 10));
  };

  return (
    <div>
      <BurgerMenu />
      <main id="page-wrap" className="w-75">
        <div id="content">
          <h2>Welcome to your dashboard.</h2>
          <Segment inverted>
            {loading ? (
              <Message color="black" icon>
                <Icon name="circle notched" loading />
                <Message.Content>
                  <Message.Header>Just one second</Message.Header>
                  We are fetching that content for you.
                </Message.Content>
              </Message>
            ) : (
              <Table inverted selectable sortable size="large">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell
                      sorted={column === 'classid' ? direction : null}
                      onClick={handleSort('classid')}
                    >
                      ID
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      sorted={column === 'classname' ? direction : null}
                      onClick={handleSort('classname')}
                    >
                      Name
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {_.map(classesOnPage, ({classid, classname}) => (
                    <Table.Row key={classname}>
                      <Table.Cell>{classid}</Table.Cell>
                      <Table.Cell>{classname}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell>
                      {localStorage.getItem('usertype') == 0 ? (
                        <CreateClassForm
                          classes={classes}
                          refreshClasses={fetchClasses}
                        />
                      ) : (
                        ''
                      )}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Pagination
                        activePage={activePage}
                        onPageChange={handlePaginationChange}
                        firstItem={null}
                        lastItem={null}
                        pointing
                        secondary
                        totalPages={Math.ceil(classes.length / 10)}
                        inverted
                        floated="right"
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            )}
          </Segment>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
