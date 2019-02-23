import React, { Component } from 'react';
import './App.css';
import { Table, Icon } from 'semantic-ui-react';

class DataTable extends Component {
  render() {
    return (
      <Table celled striped color='blue'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Hashes</Table.HeaderCell>
          <Table.HeaderCell>Short Url</Table.HeaderCell>
          <Table.HeaderCell>Long Url</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>
      </Table>
    );
  }
}

export default DataTable;
