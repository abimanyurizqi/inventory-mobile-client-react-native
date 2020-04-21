import React, { Component } from 'react';
import { View, RefreshControl, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Container, Header, Title, Content, Fab, Footer, FooterTab, Input, Item, Button, Left, Right, Body, Thumbnail, Text, ListItem, List, Toast } from 'native-base';
import { CommonHeader } from '../../../components/CommonHeader';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';
import { findAll, deleteById } from '../../../actions/units';
import { SwipeListView } from 'react-native-swipe-list-view';
import {showError, showSuccess} from '../../../utils/toast';
import Icon from 'react-native-vector-icons/FontAwesome';



function Units({ unit, onPress }) {
    return (
        <ListItem style={styles.item}>
            <Body>
                <Text style={{fontFamily: 'ProductSans-Bold' }}>{unit.name}</Text>
                <Text style={{fontFamily: 'ProductSans-Regular' }} note numberOfLines={1}>{unit.description}</Text>
            </Body>
            <Right>
                <Button transparent onPress={() => onPress(unit)}>
                    <Text style={{color: '#788ad2', fontFamily: 'ProductSans-Bold' }}>Edit</Text>
                </Button>
            </Right>
        </ListItem>
    )
}

class UnitsScreen extends Component {

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
        } else if (deleteError && prevProps.deleteError !== deleteError) {
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
        this.props.navigation.navigate('Unit');
    }

    onShowForm = (item) => {
        this.props.navigation.navigate('Unit', item ? { id: item.id } : null);
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
                <CommonHeader navigation={navigation} title="Units" add={this.onAdd} />
                <View style={styles.content}>
                    <Item>
                        <Input placeholder='Search' value={search}
                            onChangeText={search => this.setState({ search })} />
                        <Button transparent onPress={this.onSearch}>
                        <Icon name='search' style={{paddingRight: 19}} size={20} color='#788ad2'/>
                        </Button>
                    </Item>

                    <SwipeListView refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
                    }
                        data={data}
                        renderItem={({ item }) => <Units unit={item} onPress={this.onShowForm} navigation={navigation} />}
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


                    />
                </View>
            </Container>
        );
    }
}

UnitsScreen.propTypes = {
    title: PropTypes.string,
    navigation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.units.data,
    loading: state.units.loading || state.deletedUnitById.loading,
    error: state.units.error,

    addData: state.addedUnit.data,
    editData: state.editedUnit.data,

    deleteData: state.deletedUnitById.data,
    deleteError: state.deletedUnitById.Error
});

const mapDispatchToProps = {
    findAll,
    deleteById
};



export default connect(mapStateToProps, mapDispatchToProps)(UnitsScreen)
