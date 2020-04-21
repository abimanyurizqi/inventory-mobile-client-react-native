import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Form, Label, Input, Item, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { CommonHeader } from '../../components/CommonHeader';
import { login } from '../../actions/login';
import { connect } from 'react-redux'
import styles from './styles'
import { showError, showSuccess } from '../../utils/toast';

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            user: {}
        }
    }

    onChange = (name, value) => {
        this.setState({ [name]: value });
    }

    onSubmit = () => {
        this.props.login(this.state)
    }

    componentDidUpdate(prevProps, prevState) {
        const { data, error, navigation } = this.props;
        if (prevProps.data !== data) {
            this.setState({
                user: data
            });
            this.props.navigation.navigate('Main');
            showSuccess("success loged in")

        } else if (error && prevProps.error !== error) {
            showError(error)

        }
    }

    render() {
        const { navigation, loading } = this.props;
        const { username, password } = this.state;
        return (
            
            <Container style={{backgroundColor: '#4cb54c'}}>
                <Content style={{ margin: 50, paddingTop: 250}}>
                    <Form>
                        <Item rounded style={{marginVertical: 50 }}>
                            
                            <Input style={styles.input} placeholder={'username'} value={username} onChangeText={value => this.onChange('username', value)} />
                        </Item>
                        <Item rounded>
                            
                            <Input style={styles.input} placeholder={'password'} value={password} secureTextEntry={true} onChangeText={value => this.onChange('password', value)} />
                        </Item>
                    </Form>
                    </Content>
                    <Button style={styles.button} onPress={this.onSubmit} disabled={loading}>
                        <Text>Submit</Text>
                    </Button>
                
            </Container>

        )
    }
}

const mapStateToProps = state => ({
    data: state.logged.data,
    loading: state.logged.loading,
    error: state.logged.error,
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)