import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Comment } from '../interfaces/comment.interfaces';
import { CommentContext } from '../context/CommentContext';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';

const CommentList = ({ id_task }: { id_task: string }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const { getComments, deleteComment } = useContext(CommentContext);

  useFocusEffect(
    React.useCallback(() => {
      const fetchComments = async () => {
        try {
          const comments = await getComments(id_task);
          setCommentList(comments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

      fetchComments();
    }, [getComments, id_task])
  );

  const handleDeleteComment = (commentId: string) => {
    setSelectedCommentId(commentId);
  };

  const handleConfirmation = async () => {
    if (selectedCommentId) {
      const updatedList = commentList.filter((comment) => comment._id !== selectedCommentId);
      setCommentList(updatedList);
      await deleteComment(selectedCommentId);
      console.log('Comentario eliminado:', selectedCommentId);
      setSelectedCommentId(null);
    }
  };

  const renderCommentItem = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <ScrollView style={styles.commentInfo}>
        <Text style={styles.commentDescription}>{item.description}</Text>
        <Text style={styles.commentEmail}>{item.autorEmail}</Text>
      </ScrollView>

      <TouchableOpacity onPress={() => handleDeleteComment(item._id)}>
        <View style={styles.deleteButton}>
          <FontAwesome name="trash-o" size={20} color="white" />
        </View>
      </TouchableOpacity>

      <Modal isVisible={!!selectedCommentId} onBackdropPress={() => setSelectedCommentId(null)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>¿Seguro que quieres eliminar este comentario?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={() => setSelectedCommentId(null)}>
              <Text style={styles.modalButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirmation}>
              <Text style={styles.modalButton}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={commentList}
        keyExtractor={(item) => item._id}
        renderItem={renderCommentItem}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    marginTop: 60,
    backgroundColor: '#fff',
  },
  flatList: {
    width: '100%', 
  },
  commentContainer: {
    marginBottom: 16,
    backgroundColor: '#171a1f',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#888',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentInfo: {
    flex: 1,
    marginRight: 10,
  },
  commentDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  commentEmail: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 8,
    borderRadius: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    color: 'blue', // Change the color as needed
    fontSize: 16,
  },
});

export default CommentList;
