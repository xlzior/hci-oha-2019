import React, { Component } from 'react';
import { Text, List, ListItem, Body, Input, Form, Item } from 'native-base';

import NavigationBar from './NavigationBar';

export default class Schedule extends Component {
  state = {
    searchTerm: ""
  }
  render() {
    return (
      <NavigationBar {...this.props}>
        <Form>
          <Item>
            <Input
              onChangeText={searchTerm => this.setState({searchTerm})}
              value={this.state.searchTerm}
              placeholder="Search"
              returnKeyType="search"
              clearButtonMode="always"
            />
          </Item>
        </Form>
        <List>
          <ListItem>
            <Body>
              <Text>Concert Band Performance</Text>
              <Text note>1200 at the Central Plaza</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Chinese Orchestra Performance</Text>
              <Text note>1220 at the Central Plaza</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Music and Dance - Chinese Dance Performance</Text>
              <Text note>1240 at the Central Plaza</Text>
            </Body>
          </ListItem>
        </List>
      </NavigationBar>
    )
  }
}