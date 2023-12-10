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
import { FontAwesome } from "@expo/vector-icons";
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
import { Background } from "../components/Background";
import { ProyectContext } from "../context/ProyectContext";









interface Props extends StackScreenProps<TeamsStackParams, "EditTestScreen"> {
  route: RouteProp<TeamsStackParams, "EditTestScreen">;
}
const EditTestScreen = ({ route, navigation }: Props) => {

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
  console.log('estoy en el editteamsscreen')
  const { getAllRoles } = useContext(RolContext);
  const { fetchMemberTeam, addUser, removeUser, updateTeam,removeTeam } = useContext(TeamContext);
  const {deleteTeamFromProyect}=useContext(ProyectContext)
  const fetchData = async (id_team: string) => {
    try {
      console.log('estoy en el fechdata1')
      console.log(id_team)
      console.log('estoy en el fechdata2')
      console.log('test')
      console.log(_id)
      console.log('tes2')
      const data: Member[] = await fetchMemberTeam(id_team);
      console.log(data)
      setMembers(data);
    } catch (error) {
      console.error(error);
      console.log('estoy en el fechdata error')
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchDataAndSetState = async () => {
        try {
          await fetchData(_id);
          setNewName(name);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchDataAndSetState();
  
      return () => {
        setMembers([]);
      };
    }, [fetchMemberTeam, _id, name])
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
        <View style={{ flexDirection: "row",marginLeft: 10, }}>
          <TouchableOpacity onPress={() => buttonRol}>
            <EditFilled
              style={{
                fontSize: 24,
                color: "green",
                marginRight: 10,
                marginLeft: 5,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => buttonDeleteUser(uniqueCode, item.email)}>
            <DeleteOutlined style={{ fontSize: 24, color: "red" }} />
          </TouchableOpacity>
        </View>
      )}
      style={styles.listItem}  // Nuevo estilo para controlar el ancho de las listas
    />
  );


  return (
    <>
      <Background />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

     

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nombre de equipo"
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={styles.inputField}
            onChangeText={(value) => setNewName(value)}
            value={newName}
          />
          <TouchableOpacity onPress={() => buttonSetNameTeam(_id, newName)}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>Actualizar</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Añadir Integrante"
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={styles.inputField}
            onChangeText={(value) => setEmailUser(value)}
            value={emailUser}
          />
          <TouchableOpacity onPress={() => buttonAddUser(uniqueCode, emailUser)}>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 15,
    width:"80%"
  },
  inputField: {
    flex: 1,
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  addButton: {
    backgroundColor:"#5566ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    width:100
    
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
  flatList: {
    height: "auto",
    marginBottom: 10,
    marginTop: 30,
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
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
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
   listItem: {
    width: "90%",  // Ajusta el ancho del contenedor de la lista según sea necesario
    borderBottomWidth: 1,
    alignSelf: "center",
    // ... (Otros estilos de las listas pueden mantenerse sin cambios)
  },
});

export default EditTestScreen;