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
import { findById, add, edit } from '../../../actions/stocks'
import { connect } from 'react-redux';
import { showError } from '../../../utils/toast';




class StockScreen extends Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        this.state = {

            id: route.params?.id,
            quantity: 0,
            item: {},
            unit: {},

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
        const { data, addData, navigation, editData } = this.props;
        if (prevProps.data !== data) {
            this.setState({
                ...data
            });
        }  else if (prevProps.addData !== addData) {
            navigation.goBack();
        } else if (prevProps.editData !== editData) {
            navigation.goBack();
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

    onPressItemSelect = ()=> {
        this.props.navigation.navigate('ItemPicker', {
            onGoBack: this.selectedItem,
          });
          
    }
    
    onPressUnitSelect = ()=> {
        this.props.navigation.navigate('UnitPicker', {
            onGoBack: this.selectedUnit,
          });
          
    }
    
    selectedUnit = (unit) => {
        this.setState({unit: unit})
        console.log(unit)
    }

    selectedItem = (item) => {
        this.setState({item: item})
        console.log(item)
    }


    render() {
        const { navigation, loading, addError, editError, data } = this.props;
        const {id, item, unit, quantity, error } = this.state;
        const errorData = error ? error.data : {}
        return (
            <Container>
                <CommonHeader navigation={navigation} title="Stock Details" />
                <Content style={styles.content}>

                    <Form >
                        {
                            id &&
                            <Item floatingLabel>
                                <Label>ID</Label>
                                <Input style={styles.input} disabled value={id.toString()} />
                            </Item>}
                        <Item floatingLabel last>
                            <Label>Item</Label>
                            <Input style={styles.input} disabled value={item.name} />
                        </Item>
                        {errorData?.name && <Text style={styles.error}>{errorData.name[0]}</Text>}
                        <Button onPress={this.onPressItemSelect}><Text>select</Text></Button>
                        <Item floatingLabel last>
                            <Label>Quantity</Label>
                            <Input style={styles.input} value={quantity.toString()} onChangeText={value => this.onChange('quantity', value)} />
                        </Item>
                        {errorData?.name && <Text style={styles.error}>{errorData.name[0]}</Text>}
                        <Item floatingLabel last>
                            <Label>Unit</Label>
                            <Input style={styles.input} disabled value={unit.name} />
                        </Item>
                        {errorData?.name && <Text style={styles.error}>{errorData.name[0]}</Text>}
                        <Button onPress={this.onPressUnitSelect}><Text>select</Text></Button>
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
    data: state.stockById.data,
    loading: state.stockById.loading,
    error: state.stockById.error,

    addData: state.addedStock.data,
    addError: state.addedStock.error,

    editData: state.editedStock.data,
    editError: state.editedStock.error
});

const mapDispatchToProps = {
    findById,
    add,
    edit
};



export default connect(mapStateToProps, mapDispatchToProps)(StockScreen)