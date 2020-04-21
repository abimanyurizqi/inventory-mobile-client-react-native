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
    Toast
} from 'native-base';
import { CommonHeader } from '../../../components/CommonHeader';
import styles from './styles';
import { findById, add, edit } from '../../../actions/units';
import { connect } from 'react-redux';
import { showError } from '../../../utils/toast';




class UnitScreen extends Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        this.state = {
            id: route.params?.id,
            name: '',
            description: '',
            error: null
        }
    }

    componentDidMount() {
        if (this.state.id) {
            this.props.findById(this.state.id);
            
        }
        this.setState({error: null})
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
            this.setState({error: addError})
        } else if (editError && prevProps.editError !== editError) {
            showError(editError)
            this.setState({error: editError})
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
        const { id, name, description, error } = this.state;
        const errorData = error?.data || {}
        return (
            <Container>
                <CommonHeader navigation={navigation} title="Unit Details" />
                <Content style={styles.content}>

                    <Form >
                        {
                            id &&
                            <Item floatingLabel>
                                <Label style={{fontFamily: 'ProductSans-Bold' }}>ID</Label>
                                <Input style={styles.input} disabled value={id.toString()} />
                            </Item>}
                        <Item floatingLabel last>
                            <Label style={{fontFamily: 'ProductSans-Bold' }}>Name</Label>
                            <Input style={styles.input} value={name} onChangeText={value => this.onChange('name', value)} />
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
                    <Text style={styles.text}>Submit</Text>
                </Button>
                
                



            </Container>
        );
    }
}


const mapStateToProps = state => ({
    data: state.unitById.data,
    loading: state.unitById.loading || state.addedUnit.loading || state.editedUnit.loading,
    error: state.unitById.error,

    addData: state.addedUnit.data,
    addError: state.addedUnit.error,

    editData: state.editedUnit.data,
    editError: state.editedUnit.error
});

const mapDispatchToProps = {
    findById,
    add,
    edit
};



export default connect(mapStateToProps, mapDispatchToProps)(UnitScreen)