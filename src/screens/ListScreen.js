import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchUsers} from '../redux/Actions/action';
import { COLORS } from '../components/colors';

const UserListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const isLoading = useSelector(state => state.isLoading);
  const page = useSelector(state => state.page);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleUserPress = id => {
    navigation.navigate('UserDetails', {id});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => handleUserPress(item.id)}>
      <View style={styles.userCardInner}>
        <Image style={styles.avatar} source={{uri: item.avatar}} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  };

  const handleLoadMore = () => {
    dispatch(fetchUsers(page + 1,10));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(fetchUsers(1));
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

// ...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: COLORS.softWhite,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 15,
    color: COLORS.grey,
  },
  loaderContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  userCard: {
    flex: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  userCardInner: {
    width: 180,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
});

export default UserListScreen;
