import React, { Component } from 'react';
import { StyleSheets } from 'react-native';
import { Container, Content, Header, Title, Body, Left, Right, Button, Icon, View } from 'native-base';

export default class NavigationBar extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={()=>this.props.navigation.toggleDrawer()}>
              <Icon type='MaterialIcons' name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{padding: 12}}>
          {this.props.children}
        </Content>
      </Container>
    )
  }
}