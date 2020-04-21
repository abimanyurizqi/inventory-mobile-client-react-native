import React, { Component } from 'react';
import { View, RefreshControl, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Container, Header, Title, Content, Fab, Footer, FooterTab, Input, Item, Button, Left, Right, Body, Thumbnail, Text, ListItem, Segment, List} from 'native-base';
import { CommonHeader } from '../../../components/CommonHeader';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';
import { findAll, deleteById, summary } from '../../../actions/stocks';
import { SwipeListView } from 'react-native-swipe-list-view';
import { showError, showSuccess } from '../../../utils/toast';
import Icon from 'react-native-vector-icons/FontAwesome';



function Stocks({ stock, onPress }) {
    return (
        <ListItem style={styles.item}>
            <Left>
                <Text>{stock.item.name}</Text>
            </Left>
            <Body>
                <Text>{stock.quantity} {stock.unit.name}</Text>
            </Body>
            <Right>
                <Button transparent onPress={() => onPress(stock)}>
                    <Text style={{ color: '#788ad2', paddingRight: 2 }}>Edit</Text>
                </Button>
            </Right>
        </ListItem>
    )
}

function StocksSummary({ stock }) {
    return (
        <ListItem style={styles.item}>
            <Left>
                <Text>{stock.item}</Text>
            </Left>
            <Body>
                <Text>{stock.quantity} {stock.unit}</Text>
            </Body>
        </ListItem>
    )
}


class StocksScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataSummary: [],
            total: 0,
            params: {
                search: '',
                sort: 'asc',
                page: 0

            },
            SegmentHandler: false
        }


    }

    componentDidMount() {
        this.reload(this.state.params);

    }

    componentDidUpdate(prevProps, prevState) {
        const { data, error, addData, editData, deleteData, deleteError, dataSummary } = this.props;
        if (prevProps.data !== data) {
            this.setState({
                data: [...this.state.data, ...data.list],
                total: data.total,
                search: this.state.params.search,
                params: {
                    ...this.state.params,
                    page: data.page
                }
            });
        } else if (prevProps.addData !== addData) {
            this.onRefresh();
            showSuccess('data has been added');
        } else if (prevProps.editData !== editData) {
            this.onRefresh();
            showSuccess('data has been edited');
        } else if (prevProps.deleteData !== deleteData) {
            this.onRefresh();
        } else if (error && prevProps.error !== error) {
            showError(error);
        } else if (deleteError && prevProps.deleteError !== deleteError) {
            showError(error);
        }
    }

    reload({ search, sort = 'asc', page = 0 } = {}) {
        this.props.findAll({ search, sort, page });
    }

    onRefresh = () => {
        const { params } = this.state;
        this.setState({
            data: [],
            total: 0,
            params: { ...params, page: 0 }
        }, () => this.reload(this.state.params)
        );

    }

    onAdd = () => {
        this.props.navigation.navigate('Stock');
    }

    onShowForm = (item) => {
        this.props.navigation.navigate('Stock', item ? { id: item.id } : null);
    }

    onEndReached = () => {
        const { data, total, params } = this.state;
        if (data.length < total) {
            this.reload({
                ...params,
                page: params.page + 1
            });
        }


    }

    onDelete = (data) => {
        Alert.alert(
            "Confirmation",
            "Are you sure want to delete this item?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Yes", onPress: () => this.props.deleteById(data.id) }
            ]
        );

    }

    onSegmentHandler = () => {
        const {SegmentHandler} =  this.state
        if (SegmentHandler == false){
            this.setState({
                SegmentHandler: true
            })
            this.props.summary();
        }else{
            this.setState({
                SegmentHandler: false
            })
        }
    }


    render() {
        const { navigation, loading, dataSummary } = this.props;
        const { data, search, SegmentHandler } = this.state;
        return (
            <Container>
                <CommonHeader navigation={navigation} title="Stocks" add={this.onAdd} />
                <Segment style={{backgroundColor: "#4cb54c", paddingBottom: 25, height: 20}}>
                    <Button first onPress={this.onSegmentHandler} active={!SegmentHandler ? true : false}>
                        <Text>All</Text>
                    </Button>
                    <Button last onPress={this.onSegmentHandler} active={SegmentHandler ? true : false}>
                        <Text>Summary</Text>
                    </Button>
                </Segment>
                <View style={styles.content}>
                    <ListItem style={styles.item}>
                        <Left>
                            <Text style={{ color: 'grey' }}>Items</Text>
                        </Left>
                        <Body>
                            <Text style={{ color: 'grey' }}>Quantity</Text>
                        </Body>
                    </ListItem>
                    {!SegmentHandler ? <SwipeListView refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
                    }
                        data={data}
                        renderItem={({ item }) => <Stocks stock={item} onPress={this.onShowForm} navigation={navigation} />}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.5}
                        renderHiddenItem={(data) => (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => this.onDelete(data.item)}
                            >
                                <Icon color='#fff' name="trash-o" size={20} />
                            </TouchableOpacity>
                        )}
                        rightOpenValue={-75}
                        disableRightSwipe


                    /> : <FlatList 
                        data={dataSummary}
                        renderItem={({ item }) => <StocksSummary stock={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />}
                </View>
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    data: state.stocks.data,
    loading: state.stocks.loading || state.deletedStockById.loading || state.addedStock.loading,
    error: state.stocks.error,

    addData: state.addedStock.data,
    editData: state.editedStock.data,

    deleteData: state.deletedStockById.data,
    deleteError: state.deletedStockById.Error,

    dataSummary: state.summariedStocks.data,
    errorSummary: state.summariedStocks.error,
    loadingSummary: state.summariedStocks.loading


});

const mapDispatchToProps = {
    findAll,
    deleteById,
    summary

};



export default connect(mapStateToProps, mapDispatchToProps)(StocksScreen)
