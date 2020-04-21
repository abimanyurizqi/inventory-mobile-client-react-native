import React, { Component } from 'react';
import { Header, Title, Button, Left, Body, Right, Content, View } from 'native-base';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';



class CommonHeader extends Component {

    onBackPress = () => {
        this.props.navigation.goBack();
    }

    onMenuPress = () => {
        this.props.navigation.openDrawer();
    }


    render() {
        const { title, navigation, hideLeftButton, hideRightButton, add, flex } = this.props
        return (

            <Header style={{ backgroundColor: '#4cb54c' , height: 85}}
                androidStatusBarColor="#3b8a3b">
                {!hideLeftButton && <Left style={{flex: 1}}>
                    {typeof navigation.openDrawer === 'function' ?
                        <Button transparent onPress={this.onMenuPress}>
                            <Icon name='navicon' size={20} color="#fff" />
                        </Button> :

                        <Button transparent onPress={this.onBackPress}>
                            <Icon name="chevron-left" size={20} color="#fff" />
                        </Button>

                    }
                </Left>
                }

                <Body style={{flex: !hideLeftButton && !hideRightButton ? 0 : 1.3 }}>

                    <Title style={{fontFamily: 'ProductSans-Bold', fontSize: 25}}>{title}</Title>


                </Body>
                {!hideRightButton && <Right style={{flex: 1}}>
                    {typeof navigation.openDrawer === 'function' ?
                        <Button transparent onPress={() => add()}>
                            <Icon name="plus" size={20} color="#fff" />
                        </Button> :
                        null
                    }
                </Right>
                }
            </Header>

        )
    }
}

CommonHeader.propTypes = {
    title: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    hideLeftButton: PropTypes.bool,
    hideRightButton: PropTypes.bool,
    add: PropTypes.func
}

export default CommonHeader;