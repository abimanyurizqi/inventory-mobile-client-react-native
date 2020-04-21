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
    Picker,
    Toast
} from 'native-base';
import { CommonHeader } from '../../../components/CommonHeader';
import styles from './styles';
import { findById, add, edit } from '../../../actions/transactions';
import { connect } from 'react-redux';
import { showError } from '../../../utils/toast';




class TransactionScreen extends Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        this.state = {
            id: route.params?.id,
            amount: '',
            description: '',
            typeTransaction: 'SELLING',
            error: null
        }
    }

    componentDidMount() {
        if (this.state.id) {
            this.props.findById(this.state.id);
        }
        this.setState({ error: null })
    }


    componentDidUpdate(prevProps, prevState) {
        const { data, error, addData, navigation, editData, addError, editError } = this.props;
        if (prevProps.data !== data) {
            this.setState({
                ...data
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

    onValueChange(value) {
        this.setState({
            typeTransaction: value
        });
    }


    onSubmit = () => {
        if (this.state.id == undefined) {
            this.props.add(this.state)
            console.log(this.state)
        } else {
            this.props.edit(this.state);
            console.log(this.state)
        }

    }


    render() {
        const { navigation, loading  } = this.props;
        const { id, amount, description, typeTransaction, error } = this.state;
        const errorData = error?.data || {}
        return (
            <Container>
                <CommonHeader navigation={navigation} title="Transaction Details" />
                <Content style={styles.content}>

                    <Form>
                        {
                            id &&
                            <Item floatingLabel>
                                <Label style={{fontFamily: 'ProductSans-Bold' }}>ID</Label>
                                <Input style={styles.input} disabled value={id.toString()} />
                            </Item>}
                        <Picker
                            mode="dropdown"
                            
                            placeholder="Type"
                            placeholderStyle={{ color: "#2874F0" }, {fontFamily: 'ProductSans-Bold' }}
                            note={false}
                            selectedValue={typeTransaction}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Selling" value="SELLING" />
                            <Picker.Item label="Buying" value="BUYING" />
                        </Picker>
                        {errorData?.name && <Text style={styles.error}>{errorData.name[0]}</Text>}
                        <Item floatingLabel last>
                            <Label style={{fontFamily: 'ProductSans-Bold'}}>Amount</Label>
                            <Input style={styles.input} value={amount.toString()} onChangeText={value => this.onChange('amount', value)} />
                        </Item>
                        {errorData?.name && <Text style={styles.error}>{errorData.name[0]}</Text>}
                        <Item floatingLabel last>
                            <Label style={{fontFamily: 'ProductSans-Bold' }}>Description</Label>
                            <Input style={styles.input} value={description} onChangeText={value => this.onChange('description', value)} />
                        </Item>
                        {errorData?.name && <Text style={styles.error}>{errorData.name[0]}</Text>}
                    </Form>

                </Content>

                <Button full style={styles.button} onPress={this.onSubmit} disabled={loading}>
                    <Text>Submit</Text>
                </Button>

            </Container>
        );
    }
}


const mapStateToProps = state => ({
    data: state.transactionById.data,
    loading: state.transactionById.loading || state.addedTransaction.loading || state.editedTransaction.loading,
    error: state.transactionById.error,

    addData: state.addedTransaction.data,
    addError: state.addedTransaction.error,

    editData: state.editedTransaction.data,
    editError: state.editedTransaction.error
});

const mapDispatchToProps = {
    findById,
    add,
    edit
};



export default connect(mapStateToProps, mapDispatchToProps)(TransactionScreen)