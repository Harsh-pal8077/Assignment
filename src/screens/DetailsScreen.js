import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS} from '../components/colors';
import {CONSTANT} from '../components/constant';

const UserDetailsScreen = ({route}) => {
  const {id} = route.params;
  const user = useSelector(state => state.users.find(user => user.id === id));

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenImage = () => {
    setModalVisible(true);
  };

  const handleCloseImage = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.label}>{CONSTANT.AVATAR}</Text>
        <TouchableOpacity onPress={handleOpenImage}>
          <Image style={styles.avatar} source={{uri: user.avatar}} />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>{CONSTANT.FIRST_NAME}</Text>
        <Text style={styles.value}>{user.first_name}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>{CONSTANT.LAST_NAME}</Text>
        <Text style={styles.value}>{user.last_name}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.label}>{CONSTANT.EMAIL}</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseImage}>
            <Text style={styles.closeButtonText}>{CONSTANT.CLOSE}</Text>
          </TouchableOpacity>
          <Image style={styles.modalImage} source={{uri: user.avatar}} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
    padding: 20,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
    fontSize: 16,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.softBlack,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export {UserDetailsScreen};
