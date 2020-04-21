import React, { Component } from 'react';
import { View, RefreshControl, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Container, Header, Title, Content, Fab, Footer, FooterTab, Input, Item, Button, Left, Right, Body, Thumbnail, Text, ListItem, List} from 'native-base';
import { CommonHeader } from '../../../../components/CommonHeader';
import PropTypes from 'prop-types';
import styles from '../styles';
import { connect } from 'react-redux';
import { findAll } from '../../../../actions/units';
import { SwipeListView } from 'react-native-swipe-list-view';
import { showError, showSuccess } from '../../../../utils/toast';
import Icon from 'react-native-vector-icons/FontAwesome';


function Units({ unit, onPress }) {
    return (
        <ListItem thumbnail style={styles.item} onPress={() => onPress(unit)}>
            <Body>
                <Text>{unit.name}</Text>
            </Body>
        </ListItem>
    )
}

class UnitPicker extends Component {

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

    onSearch = () => {
        const { search, params } = this.state;
        this.setState({
            data: [],
            total: 0,
            params: { ...params, search: search, page: 0 }
        }, () => this.reload(this.state.params)
        );

    }

    onShowForm = (unit) => {
        this.props.route.params.onGoBack(unit);
        this.props.navigation.goBack();
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


    render() {
        const { navigation, loading } = this.props;
        const { data, search } = this.state;
        return (
            <Container>
                <CommonHeader navigation={navigation} title="Select Items"  hideRightButton={true} />
                <View style={styles.content}>
                <Item>
                        <Input placeholder='Search' value={search}
                            onChangeText={search => this.setState({ search })} />
                        <Button transparent onPress={this.onSearch}>
                            <Icon name='search' style={{paddingRight: 19}} size={20} color='#788ad2'/>
                        </Button>
                    </Item>
                    <FlatList refreshControl={
                        <RefreshControl refreshing={loading} />
                    }
                        data={data}
                        renderItem={({ item }) => <Units unit={item} onPress={this.onShowForm} navigation={navigation} />}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </Container>
        );
    }
}


const mapStateToProps = state => ({
    data: state.units.data,
    loading: state.units.loading,
    error: state.units.error,

});

const mapDispatchToProps = {
    findAll,
};



export default connect(mapStateToProps, mapDispatchToProps)(UnitPicker)
