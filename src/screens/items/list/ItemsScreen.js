import React, { Component } from 'react';
import { View, RefreshControl, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Container, Header, Title, Content, Fab, Footer, FooterTab, Input, Item, Button, Left, Right, Body, Thumbnail, Text, ListItem, List} from 'native-base';
import { CommonHeader } from '../../../components/CommonHeader';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';
import { findAll, deleteById } from '../../../actions/items';
import { SwipeListView } from 'react-native-swipe-list-view';
import { showError, showSuccess } from '../../../utils/toast';
import Icon from 'react-native-vector-icons/FontAwesome';



const data = [
    {
        id: 1,
        name: "Gula",
        thumbnail: 'https://statik.tempo.co/data/2017/03/13/id_589461/589461_620.jpg',
    }

];

function Items({ item, onPress }) {
    return (
        <ListItem thumbnail style={styles.item}>
            <Left>
                <Thumbnail square source={{ uri: data[0].thumbnail }} />
            </Left>
            <Body>
                <Text>{item.name}</Text>
            </Body>
            <Right>
                <Button transparent onPress={() => onPress(item)}>
                    <Text style={{color: "#4cb54c"}}>Edit</Text>
                </Button>
            </Right>
        </ListItem>
    )
}

class ItemsScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            total: 0,
            search: '',
            params: {
                search: '',
                sort: 'asc',
                page: 0

            }
        }


    }

    componentDidMount() {
        this.reload(this.state.params);
    }

    componentDidUpdate(prevProps, prevState) {
        const { data, error, addData, editData, deleteData, deleteError } = this.props;
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
        } else if ( deleteError && prevProps.deleteError !== deleteError){
            showError(error);
        }
    }

    reload({ search, sort = 'asc', page = 0 } = {}) {
        this.props.findAll({ search: { name: search }, sort, page });
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
        this.props.navigation.navigate('Item');
    }

    onShowForm = (item) => {
        this.props.navigation.navigate('Item', item ? {id: item.id} : null);
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

    onSearch = () => {
        const { search, params } = this.state;
        this.setState({
            data: [],
            total: 0,
            params: { ...params, search: search, page: 0 }
        }, () => this.reload(this.state.params)
        );

    }

    render() {
        const { navigation, loading } = this.props;
        const { data, search } = this.state;
        return (
            <Container>
                <CommonHeader navigation={navigation} title="Items" add={this.onAdd} />
                <View style={styles.content}>
                    <Item>
                        <Input placeholder='Search' value={search}
                            onChangeText={search => this.setState({ search })} />
                        <Button transparent onPress={this.onSearch}>
                            <Icon name='search' style={{paddingRight: 19}} size={20} color='#4cb54c'/>
                        </Button>
                    </Item>

                    <SwipeListView refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
                    }
                        data={data}
                        renderItem={({ item }) => <Items item={item} onPress={this.onShowForm} navigation={navigation} />}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.5}
                        renderHiddenItem={(data) => (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress= {()=> this.onDelete(data.item)}
                                >
                                <Icon color='#fff' name="trash-o" size={20} />
                            </TouchableOpacity>
                        )}
                        rightOpenValue={-75}
                        disableRightSwipe


                    />
                </View>
            </Container>
        );
    }
}

ItemsScreen.propTypes = {
    title: PropTypes.string,
    navigation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.items.data,
    loading: state.items.loading || state.deletedItemById.loading,
    error: state.items.error,

    addData: state.addedItem.data,
    editData: state.editedItem.data,

    deleteData: state.deletedItemById.data,
    deleteError: state.deletedItemById.Error
});

const mapDispatchToProps = {
    findAll,
    deleteById
};



export default connect(mapStateToProps, mapDispatchToProps)(ItemsScreen)
