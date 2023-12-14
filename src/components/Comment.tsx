import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Comment } from '../interfaces/comment.interfaces';
import { CommentContext } from '../context/CommentContext';

const CommentList = ({ id_task }: { id_task: string }) => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const { getComments, deleteComment } = useContext(CommentContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getComments(id_task);
        setCommentList(comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [getComments]);

  const handleDeleteComment = async (commentId: string) => {
    // Filtra la lista de comentarios para excluir el comentario eliminado
    const updatedList = commentList.filter((comment) => comment._id !== commentId);
    setCommentList(updatedList);
    await deleteComment(commentId);
    console.log('Comentario eliminado:', commentId);
  };

  const renderCommentItem = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <View>
        <Text style={styles.commentDescription}>{item.description}</Text>
        <Text style={styles.commentAuthor}>{item.autorEmail}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteComment(item._id)}>
        <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={commentList}
        keyExtractor={(item) => item._id}
        renderItem={renderCommentItem}
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
  commentContainer: {
    marginBottom: 16,
    backgroundColor: '#666',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#888',
    width: '100%',
    flexDirection: 'row', // Alinea el botón de eliminar al final del comentario
    justifyContent: 'space-between', // Espaciado entre elementos en la fila
    alignItems: 'center', // Alinea verticalmente los elementos en el contenedor
  },
  commentDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  commentAuthor: {
    fontSize: 14,
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#FF0000', // Color de fondo rojo
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default CommentList;

