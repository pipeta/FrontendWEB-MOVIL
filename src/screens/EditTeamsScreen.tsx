import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { List } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { TeamsStackParams } from "../navigator/navigatorTypes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Member } from "../interfaces/teamInterfaces";
import { TeamContext } from "../context/TeamContext";
import { RolContext } from "../context/RolContext";
import { Background } from "../components/Background";
import { GithubOutlined } from "@ant-design/icons";

interface Props extends StackScreenProps<TeamsStackParams, "EditTeamsScreen"> {
  route: RouteProp<TeamsStackParams, "EditTeamsScreen">;
}

const EditTeamScreen = ({ route, navigation }: Props) => {
  const { top } = useSafeAreaInsets();
  const { uniqueCode, _id, name } = route.params;

  const { fetchMemberTeam, addUser, removeUser, updateTeam, removeTeam } =
    useContext(TeamContext);
  const { getAllRoles } = useContext(RolContext);

  const [newName, setNewName] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [members, setMembers] = useState<Partial<Member>[]>([]);
  const [selectedMember, setSelectedMember] = useState<Partial<Member> | null>(
    null
  );
  const [checkedStates, setCheckedStates] = useState<{
    [key: string]: boolean;
  }>({});

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

  const onMemberPress = async (member: Partial<Member>) => {
    try {
      console.log(`Fetching roles for ${member.userName}...`);
      console.log(_id)
      await getAllRoles(_id);
      console.log("Roles fetched successfully!");
      setSelectedMember(member);
      setModalVisible(true);
    } catch (error) {
      console.error("Error while getting roles:", error);
    }
  };

  const toggleCheckbox = (role: string) => {
    setCheckedStates((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  const buttonDeleteUser = async (
    uniqueCode: string,
    email: string | undefined
  ) => {
    if (email !== undefined) {
      await removeUser({ uniqueCode, email });
    }
    fetchData(_id);
  };

  const buttonSetNameTeam = async (id_team: string, name: string) => {
    await updateTeam(id_team, name);
    setNewName("");
  };

  const buttonAddUser = async (uniqueCode: string, email: string) => {
    await addUser({ uniqueCode, email });
    fetchData(_id);
    setEmailUser("");
  };

  const renderMemberItem = ({ item }: { item: Partial<Member> }) => (
    <TouchableOpacity onPress={() => onMemberPress(item)}>
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
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <TouchableOpacity
              onPress={() => buttonDeleteUser(uniqueCode, item.email)}
            >
              <FontAwesome
                name="trash"
                style={{ fontSize: 24, color: "red" }}
              />
            </TouchableOpacity>
          </View>
        )}
        style={styles.listItem}
      />
    </TouchableOpacity>
  );

  const renderRoleOption = (role: string) => (
    <TouchableOpacity
      key={role}
      onPress={() => toggleCheckbox(role)}
      style={styles.roleOption}
    >
      <FontAwesome
        name={checkedStates[role] ? "check-square-o" : "square-o"}
        style={{ fontSize: 20, color: "black", marginRight: 10 }}
      />
      <Text style={styles.roleOptionText}>{role}</Text>
    </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => buttonAddUser(uniqueCode, emailUser)}
          >
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>Añadir</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          ListHeaderComponent={<View />}
          data={members}
          renderItem={renderMemberItem}
          keyExtractor={(item) =>
            item.userName ? item.userName.toString() : ""
          }
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
              <Text style={styles.modalTitle}>
                Seleccionar Roles para {selectedMember?.userName}:
              </Text>
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
    width: "80%",
  },
  inputField: {
    flex: 1,
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  addButton: {
    backgroundColor: "#5566ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
    width: 100,
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
  roleOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  roleOptionText: {
    color: "black",
    marginLeft: 10,
  },
  listItem: {
    width: "90%",
    borderBottomWidth: 1,
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
});

export default EditTeamScreen;
