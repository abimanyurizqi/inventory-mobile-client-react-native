import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, CardItem, Card} from 'native-base';
import { CommonHeader } from '../../components/CommonHeader';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const items = [
{
    label: 'Items',
    target: 'Items',
    description: 'Go click for go to the itmes page'
},
{
    label: 'Units',
    target: 'Units',
    description: 'Go click for go to the Units page'
    },
{
    label: 'Transactions',
    target: 'Transactions',
    description: 'Go click for go to the Transactions page'
    },
{
    label: 'Stocks',
    target: 'Stocks',
    description: 'Go click for go to the Stocks page'
    },
]


class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    componentDidMount() {
        this.mountUsername()

    }

    mountUsername = async () => {
        const username = await AsyncStorage.getItem('username')
        this.setState({
            username: username
        })
    }

    onPressSignOut = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Login');
    }

 

    render() {
        const { navigation } = this.props
        const { username } = this.state
        return (
            <Container>
                <Content>
                    <CommonHeader navigation={navigation} title="Home" hideRightButton={true} />
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontFamily: 'ProductSans-Bold', fontSize: 40, margin: 50 }}> Hello {username}!! </Text>
                       
                        {items.map((item, index) =>
                       <TouchableOpacity style={{margin: 10}} onPress={()=> {
                            this.props.navigation.navigate(item.target)
                       }}>
                                
                       <Card style={{ height: 200, width: 400}}>
                           
                           <CardItem Header>
                               <Text style={{ fontFamily: 'ProductSans-Bold' , fontSize: 30}}> {item.label}</Text>
                           </CardItem>
                           <CardItem>
                           <Body>

                               <Text style={{ fontFamily: 'ProductSans-regular' }}> {item.description}</Text>

                           </Body>
                           </CardItem>
                       </Card>
                       </TouchableOpacity>
                    )}
                        
                    </View>
                </Content>
            </Container >
        );
    }
}


export default HomeScreen