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
import {
  GithubOutlined,
  DeleteOutlined,
  EditFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { PricingCard, lightColors } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Member } from "../interfaces/teamInterfaces";
import { TeamContext } from "../context/TeamContext";
import { RolContext } from "../context/RolContext";









interface Props extends StackScreenProps<TeamsStackParams, "EditTeamsScreen"> {
  route: RouteProp<TeamsStackParams, "EditTeamsScreen">;
}
const EditTeamsScreen = ({ route, navigation }: Props) => {

  const [members, setMembers] = useState<Partial<Member>[]>([]);

  const { top } = useSafeAreaInsets();
  const { uniqueCode, _id, name } = route.params;
  const { user, update } = useContext(AuthContext);
  const { email, onChange } = useForm({
    email: user?.email || "",
  });

  const [newName, setNewName] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});

  const { getAllRoles } = useContext(RolContext);
  const { fetchMemberTeam, addUser, removeUser, updateTeam } = useContext(TeamContext);

  const fetchData = async (id_team: string) => {
    try {
      const data: Member[] = await fetchMemberTeam(id_team);
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData(_id);
      setNewName(name);
  
      return () => {
        setMembers([]);
      };
    }, [fetchMemberTeam])
  );


  const buttonRol = () => {
    setModalVisible(true)
  }


  const toggleCheckbox = (name: string) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const buttonDeleteUser = async (uniqueCode: string, email: string | undefined) => {
    if(email !== undefined){
      await removeUser({uniqueCode: uniqueCode, email: email });
    }
    fetchData(_id);
  };

  const buttonSetNameTeam = async (id_team: string,name: string) => {
    await updateTeam(id_team,name);
    setNewName("");
  };

  const buttonAddUser = async (uniqueCode: string, email: string) => {
    await addUser({uniqueCode: uniqueCode, email: email });
    fetchData(_id);
    setEmailUser("");
  };

  const renderRoleOption = (role: string) => (
    <TouchableOpacity key={role} style={styles.roleOption}>
      <Text style={styles.roleOptionText}>{role}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Partial<Member> }) => (
    <List.Item
      key={item.userName}
      title={<Text style={{ color: "white" }}>{item.userName}</Text>}
      description={<Text style={{ color: "white" }}>{item.email}</Text>}
      left={() => (
        <GithubOutlined
          style={{ fontSize: 24, color: "white", marginRight: 10 }}
        />
      )}
      right={() => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => buttonRol}>
            <EditFilled
              style={{
                fontSize: 24,
                color: "green",
                marginRight: 10,
                marginLeft: 70,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => buttonDeleteUser(uniqueCode,item.email)}>
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
        style={{ ...styles.backButton, top: top + 5 }}
      >
        <ArrowLeftOutlined />
      </TouchableOpacity>
      <View style={{ marginBottom: 30 }}></View>

      <View style={styles.container}>
        <View style={styles.addContainer}>
          <TextInput
            placeholder="Nombre de equipo"
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={[loginStyles.inputField, styles.inputField]}
            onChangeText={(value) => setNewName(value)}
            value={newName}
          />
          <TouchableOpacity onPress={() => buttonSetNameTeam(_id, newName)}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>Actualizar</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.addContainer}>
          <TextInput
            placeholder="Añadir Integrante"
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={[loginStyles.inputField, styles.inputField]}
            onChangeText={(value) => setEmailUser(value)}
            value={emailUser}
          />
          <TouchableOpacity onPress={() => buttonAddUser(uniqueCode,emailUser)}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>Añadir</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          ListHeaderComponent={<View />}
          data={members}
          renderItem={renderItem}
          keyExtractor={(item) => (item.userName ? item.userName.toString() : "")}
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
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
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
  backButton: {
    position: "absolute",
    left: 20,
    color: "white",
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
