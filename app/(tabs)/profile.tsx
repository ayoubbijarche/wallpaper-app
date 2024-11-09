





import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface Post {
  id: string;
  imageUri: string;
}

export default function ProfileScreen() {
  const [username, setUsername] = useState('@johnDoe');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(username);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditUsername = () => {
    if (isEditing) {
      setUsername(editedUsername);
    }
    setIsEditing(!isEditing);
  };

  const handleAddPost = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newPost: Post = {
        id: Date.now().toString(),
        imageUri: result.assets[0].uri,
      };
      setPosts([newPost, ...posts]);
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
      <Image source={{ uri: item.imageUri }} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://picsum.photos/id/1005/300/300' }}
          style={styles.profileImage}
        />
        <View style={styles.usernameContainer}>
          {isEditing ? (
            <TextInput
              style={styles.usernameInput}
              value={editedUsername}
              onChangeText={setEditedUsername}
              autoFocus
            />
          ) : (
            <Text style={styles.username}>{username}</Text>
          )}
          <TouchableOpacity onPress={handleEditUsername} style={styles.editButton}>
            <Ionicons
              name={isEditing ? 'checkmark' : 'pencil'}
              size={14}
              color="#ffff"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.addPostButton} onPress={handleAddPost}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addPostText}>Add Post</Text>
      </TouchableOpacity>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.postsContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.modalText}>Post details go here</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 100,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 5,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffff',
  },
  usernameInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffff',
    borderBottomWidth: 1,
    borderBottomColor: '#2196F3',
    paddingBottom: 2,
    minWidth: 100,
  },
  editButton: {
    marginLeft: 0,
  },
  addPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 20,
  },
  addPostText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  postsContainer: {
    paddingHorizontal: 5,
  },
  postImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
  },
});
