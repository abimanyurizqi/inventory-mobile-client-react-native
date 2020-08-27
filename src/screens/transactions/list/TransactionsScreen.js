import React, { Component } from 'react';
import { View, RefreshControl, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Container, Header, Title, Content, Fab, Footer, FooterTab, Input, Item, Button, Left, Right, Body, Text, ListItem, List, Toast, Segment, CardItem, Card, Badge } from 'native-base';
import { CommonHeader } from '../../../components/CommonHeader';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';
import { findAll, deleteById, summary } from '../../../actions/transactions';
import { SwipeListView } from 'react-native-swipe-list-view';
import { showError, showSuccess } from '../../../utils/toast';
import Icon from 'react-native-vector-icons/FontAwesome';



function Transactions({ transaction, onPress }) {
    return (
        <Card>
            <CardItem style={{paddingBottom: 4}}>
                <Badge style={{backgroundColor: transaction.typeTransaction == "SELLING" ? "#4cb54c" : "#FAC543"}}>
                    <Text style={{fontSize: 13, fontFamily: 'ProductSans-Bold'}}>
                    {transaction.typeTransaction}
                    </Text>
                </Badge>
            </CardItem>
            <CardItem>
                <Body>
                    <Text style={{fontSize: 25, fontFamily: 'ProductSans-Bold'}}>Rp.{transaction.amount}</Text>
                    <Text note numberOfLines={1} style={{fontFamily: 'ProductSans-Bold'}}>{transaction.description}</Text>
                </Body>
                <Right>
                <Button transparent onPress={() => onPress(transaction)}>
                    <Text style={{ color: '#788ad2', fontFamily: 'ProductSans-Bold' }}>Edit</Text>
                </Button>
                    </Right>
            </CardItem>

        </Card>
        
    )
}

function SummaryTransactions({ transaction }) {
    return (
        <Card>
            <CardItem header>
            <Badge style={{backgroundColor: transaction.type == "SELLING" ? "#4cb54c" : "#FAC543"}}>
                    <Text style={{fontFamily: 'ProductSans-Bold' }}>
                        {transaction.type}
                    </Text>
                </Badge>
            </CardItem>
            <CardItem>
                <Body>
                <Text style={{fontSize: 25, fontFamily: 'ProductSans-Bold' }}>Rp.{transaction.amount}</Text>
                </Body>
                <Right>
                    <Text style={{fontFamily: 'ProductSans-Medium' }}>Jumlah: {transaction.jumlah}</Text>
                </Right>
            </CardItem>

        </Card>
    )
}

class TransactionsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            total: 0,
            params: {
                search: '',
                sort: 'asc',
                page: 0

            },
            summaryParams: {
                year: null,
                month: null,
                date: null
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
        } else if (prevProps.dataSummary !== dataSummary) {
            console.log(dataSummary);
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
        this.props.navigation.navigate('Transaction');
    }

    onShowForm = (item) => {
        this.props.navigation.navigate('Transaction', item ? { id: item.id } : null);
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
        const { SegmentHandler, summaryParams } = this.state
        if (SegmentHandler == false) {
            this.setState({
                SegmentHandler: true
            })
            this.props.summary(summaryParams);
        } else {
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
                
                <CommonHeader navigation={navigation} title="Transactions" add={this.onAdd} />
                <Segment style={{ backgroundColor: "#4cb54c", paddingBottom: 25, height: 20 }}>
                    <Button first onPress={this.onSegmentHandler} active={!SegmentHandler ? true : false}>
                        <Text style={{fontFamily: 'ProductSans-Bold' }}>All</Text>
                    </Button>
                    <Button last onPress={this.onSegmentHandler} active={SegmentHandler ? true : false}>
                        <Text style={{fontFamily: 'ProductSans-Bold' }}>Summary</Text>
                    </Button>
                </Segment>
                <View style={styles.content}>
                    {!SegmentHandler ?
                        <SwipeListView refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
                        }
                            data={data}
                            renderItem={({ item }) => <Transactions transaction={item} onPress={this.onShowForm} />}
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


                        /> :
                        <FlatList
                            data={dataSummary}
                            renderItem={({ item }) => <SummaryTransactions transaction={item} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
                </View>
            </Container>
        );
    }
}



const mapStateToProps = state => ({
    data: state.transactions.data,
    loading: state.transactions.loading || state.deletedTransactionById.loading || state.summariedTransactions.loading,
    error: state.transactions.error,

    addData: state.addedTransaction.data,
    editData: state.editedTransaction.data,

    deleteData: state.deletedTransactionById.data,
    deleteError: state.deletedTransactionById.Error,

    dataSummary: state.summariedTransactions.data,
    summaryError: state.summariedTransactions.error
});

const mapDispatchToProps = {
    findAll,
    deleteById,
    summary
};



export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen)
