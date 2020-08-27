import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Form,
    Item,
    Label,
    Input,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Toast,
    View,
} from 'native-base';
import { CommonHeader } from '../../../components/CommonHeader';
import styles from './styles';
import { findById, add, edit, findImageById } from '../../../actions/items';
import { connect } from 'react-redux';
import { showError } from '../../../utils/toast';

import { AsyncStorage, Image } from 'react-native'
import { ceil } from 'react-native-reanimated';
import { TouchableHighlight } from 'react-native-gesture-handler';


class ItemScreen extends Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        this.state = {
            id: route.params?.id,
            name: '',
            error: null,
            imageURL: '',
            token: ''
        }
    }

    componentDidMount() {

        this.getToken();
        if (this.state.id) {
            this.props.findById(this.state.id);
            this.props.findImageById(this.state.id)
        }

        this.setState({ error: null })


    }

    async getToken() {
        await AsyncStorage.getItem("token", (errs, result) => {
            if (!errs) {
                if (result !== null) {

                    this.setState({ token: result });
                }
            }
        });
    }


    componentDidUpdate(prevProps, prevState) {
        const { data, error, addData, navigation, editData, addError, editError, imageItem } = this.props;
        if (prevProps.data !== data) {
            this.setState({
                ...data
            });
        } else if (prevProps.imageItem !== imageItem) {
            this.setState({
                imageURL: imageItem?.url || ''
            });
        } else if (prevProps.addData !== addData) {
            navigation.goBack();
        } else if (prevProps.editData !== editData) {
            navigation.goBack();
        } else if (error && prevProps.error !== error) {
            showError(error)
        } else if (addError && prevProps.addError !== addError) {
            showError(addError)
            this.setState({ error: addError })
        } else if (editError && prevProps.editError !== editError) {
            showError(editError)
            this.setState({ error: editError })
        }
    }



    onChange = (name, value) => {
        this.setState({ [name]: value });
    }

    onSubmit = () => {
        if (this.state.id == undefined) {
            this.props.add(this.state)
        } else {
            this.props.edit(this.state);
        }

    }


    render() {
        const { navigation, loading, addError, editError } = this.props;
        const { id, name, error, imageURL, token } = this.state;
        const errorData = error?.data
        return (
            <Container>
                <CommonHeader navigation={navigation} title="Item Detail" />
                <Content style={styles.content}>

                    <Form>
                        {
                            id &&
                            <View>

                                <Image source={imageURL == '' ? require('../../../../assets/images/no-image.jpg') : { uri: imageURL, headers: { 'Authorization': 'Bearer ' + token } }} style={{ height: 200, marginBottom: 20 }} />

                                <Item floatingLabel last>
                                    <Label>ID</Label>
                                    <Input style={{paddingLeft: 20}} disabled value={id.toString()} />
                                </Item>
                            </View>
                        }


                        <Item floatingLabel last>
                            <Label>Name</Label>
                            <Input style={styles.input} value={name} onChangeText={value => this.onChange('name', value)} />
                        </Item>
                        {errorData?.name && <Text style={styles.error}>{errorData.name[0]}</Text>}

                    </Form>
                </Content>
                <Button style={styles.button} onPress={this.onSubmit} disabled={loading}>
                    <Text>Submit</Text>
                </Button>
            </Container >
        );
    }
}


const mapStateToProps = state => ({
    data: state.itemById.data,
    loading: state.itemById.loading || state.addedItem.loading || state.editedItem.loading || state.itemImage.loading,
    error: state.itemById.error,

    addData: state.addedItem.data,
    addError: state.addedItem.error,

    editData: state.editedItem.data,
    editError: state.editedItem.error,

    imageItem: state.itemImage.data,
    imageError: state.itemImage.error
});

const mapDispatchToProps = {
    findById,
    add,
    edit,
    findImageById
};



export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen)