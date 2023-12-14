import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CommentContext } from '../context/CommentContext';

const NewCommentForm = ({ id_task }: { id_task: string }) => {
  const { createComment } = useContext(CommentContext);
  const [commentText, setCommentText] = useState('');

  const handleCreateComment = async () => {
    if (!commentText.trim()) {
      // Evita crear comentarios vacíos
      return;
    }

    try {
      // Crea un nuevo comentario
      await createComment({
        description: commentText,
        id_task: id_task,
      });

      // Limpia el texto del comentario después de crearlo
      setCommentText('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu comentario..."
        value={commentText}
        onChangeText={(text) => setCommentText(text)}
      />
      <TouchableOpacity onPress={handleCreateComment}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Agregar Comentario</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#00AA00', // Color de fondo verde
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NewCommentForm;
