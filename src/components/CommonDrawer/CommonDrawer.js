import React, { Component } from 'react';
import { Container, Content, Text, Button, Body, Left, Right, ListItem } from 'native-base';
import { ImageBackground, AsyncStorage } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';



const items = [{
    icon: 'home',
    label: 'Home',
    target: 'Home'
},
{
    icon: 'tags',
    label: 'Items',
    target: 'Items'
},
{
    icon: 'th',
    label: 'Units',
    target: 'Units'
},
{
    icon: 'dropbox',
    label: 'Stocks',
    target: 'Stocks'
},
{
    icon: 'money',
    label: 'Transactions',
    target: 'Transactions'
},
]

function DrawerItem({ navigation, item }) {
    return (
        <ListItem icon onPress={() => navigation.navigate(item.target)}>
            <Left>
                <Icon name={item.icon} />
            </Left>
            <Body>
                <Text style={{fontFamily: 'ProductSans-Bold' }}>
                    {item.label}
                </Text>
            </Body>
        </ListItem>
    );
}


class CommonDrawer extends Component {


onPressSignOut = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Login');
}

    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <ImageBackground source={require('../../../assets/images/drawer.jpg')} style={styles.image} >
                    <Text>inside</Text>
                </ImageBackground>
                <Content>

                    {items.map((item, index) =>
                        <DrawerItem
                            key={index}
                            navigation={navigation}
                            item={item} />
                    )}
                    <ListItem icon onPress={this.onPressSignOut}>
                        <Left>
                            <Icon name='sign-out' />
                        </Left>
                        <Body>
                            <Text style={{fontFamily: 'ProductSans-Bold' }}>
                                Log Out
                            </Text>
                        </Body>
                    </ListItem>

                </Content>
            </Container>
        )
    }
}

export default CommonDrawer;