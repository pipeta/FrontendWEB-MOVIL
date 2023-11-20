import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { loginStyles } from "../theme/loginTheme";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { Divider, List } from "react-native-paper";
import { GithubOutlined, DeleteOutlined, EditFilled } from "@ant-design/icons";
import { PricingCard, lightColors } from "@rneui/themed";

type List2Data = {
  name: string;
  subtitle: string;
  linearGradientColors: string[];
};

const list2: Partial<List2Data>[] = [
  {
    name: "Amy Farha",
    subtitle: "Vice President",
    linearGradientColors: ["#FF9800", "#F44336"],
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman",
    linearGradientColors: ["#3F51B5", "#2196F3"],
  },

];

const EditTeamsScreen = () => {
  const { user, update } = useContext(AuthContext);
  const { email, onChange } = useForm({
    email: user?.email || "",
  });

  const [newName, setNewName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCheckbox = (name: string) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const onSaveChanges = () => {
   
    console.log("Guardando cambios:", email);
  };

  const handleDelete = (name: string) => {
   
  };

  const handleEdit = (name: string) => {
   
    console.log(`Editar elemento: ${name}`);
    setModalVisible(true);
  };

  const handleAdd = () => {
   
    console.log(`Añadir elemento: ${newName}`);
  };

  const renderRoleOption = (role: string) => (
    <TouchableOpacity key={role} style={styles.roleOption}>
      <Text style={styles.roleOptionText}>{role}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Partial<List2Data> }) => (
    <List.Item
      key={item.name} 
      title={<Text style={{ color: "white" }}>{item.name}</Text>}
      description={<Text style={{ color: "white" }}>{item.subtitle}</Text>}
      left={() => (
        <GithubOutlined
          style={{ fontSize: 24, color: "white", marginRight: 10 }}
        />
      )}
      right={() => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => handleEdit(item.name || "")}>
            <EditFilled
              style={{
                fontSize: 24,
                color: "green",
                marginRight: 10,
                marginLeft: 70,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.name || "")}>
            <DeleteOutlined style={{ fontSize: 24, color: "red" }} />
          </TouchableOpacity>
        </View>
      )}
      style={{ borderBottomWidth: 1 }}
    />
  );
  

  return (
    <ImageBackground
      source={require("../theme/pngtree-simple-lights-on-black-background-image_556934.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.addContainer}>
          <TextInput
            placeholder="Nuevo Nombre"
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={[loginStyles.inputField, styles.inputField]}
            onChangeText={(value) => setNewName(value)}
            value={newName}
          />
          <TouchableOpacity onPress={handleAdd}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>Editar</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.addContainer}>
          <TextInput
            placeholder="Añadir Integrante"
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={[loginStyles.inputField, styles.inputField]}
            onChangeText={(value) => setNewName(value)}
            value={newName}
          />
          <TouchableOpacity onPress={handleAdd}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>Añadir</Text>
            </View>
          </TouchableOpacity>
        </View>

      
        <TouchableOpacity onPress={onSaveChanges}>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </View>
        </TouchableOpacity>

        <FlatList
          ListHeaderComponent={
            <View>{list2.map((l) => renderItem({ item: l }))}</View>
          }
          data={list2}
          renderItem={renderItem}
          keyExtractor={(item) => (item.name ? item.name.toString() : "")}
          style={styles.flatList}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccionar Rol:</Text>
              {["Rol1", "Rol2", "Rol3"].map((role) => renderRoleOption(role))}
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.closeButton}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flatList: {
    height: "auto",
    marginBottom: 10,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    color: "white",
  },
  inputField: {
    color: "white",
  },
  addContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: "white",
  },
  submitButton: {
    backgroundColor: "blue",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
  },
  roleOption: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  roleOptionText: {
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    color: "blue",
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
  },
});

export default EditTeamsScreen;
