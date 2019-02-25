import React from "react";
import { Table } from "semantic-ui-react";

export default props => (
  <Table celled striped color="blue" fixed>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Hash</Table.HeaderCell>
        <Table.HeaderCell>Long Url</Table.HeaderCell>
        <Table.HeaderCell>Accessed On</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.urlData.map((urlEntry, i) => (
        <Table.Row key={i}>
          <Table.Cell>{urlEntry.hash}</Table.Cell>
          <Table.Cell>{urlEntry.longUrl}</Table.Cell>
          <Table.Cell>{urlEntry.accessedOn}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
