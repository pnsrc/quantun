import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons'; // Импорт иконок FontAwesome

const ViewNoteFull = ({ visible, closeModal, note }) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={closeModal}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={30} style={StyleSheet.absoluteFill}>
            <ContentContainer closeModal={closeModal} note={note} />
          </BlurView>
        ) : (
          <View style={[StyleSheet.absoluteFill, styles.androidBackground]}>
            <ContentContainer closeModal={closeModal} note={note} />
          </View>
        )}
      </ScrollView>
    </Modal>
  );
};

const ContentContainer = ({ closeModal, note }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        {/* Иконка "Закрыть" */}
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <FontAwesome name="times" size={24} color="#ff6347" />
        </TouchableOpacity>
      </View>
      {/* Внутренний контейнер с содержимым */}
      <View style={styles.innerContainer}>
        <Text style={styles.guid}>{note.lessonName}</Text>
        <Text style={styles.lessonDate}>{note.lessonDate}</Text>
        <Text style={styles.task}>{note.task.task}</Text>
      </View>
      {/* Контейнер для изображения */}
      <View style={styles.imageContainer}>
        {note.task.attachment && (
          <Image source={{ uri: note.task.attachment }} style={styles.image} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 20,
    position: 'absolute',
    top: 10,
    zIndex: 1,
  },
  closeButton: {
    padding: 30,
  },
  innerContainer: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  guid: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
  },
  lessonDate: {
    fontStyle: 'italic',
    marginBottom: 10,
    fontSize: 18,
  },
  task: {
    fontSize: 18,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1 / 1,
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  androidBackground: {
    backgroundColor: '#FFFFFF', // белый фон на андроиде
  },
});

export default ViewNoteFull;
