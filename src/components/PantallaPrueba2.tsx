import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem, lightColors } from "@rneui/themed";
import { GithubOutlined, DeleteOutlined, EditFilled } from "@ant-design/icons";

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

const Lists2: React.FunctionComponent = () => {
    const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});
  
    const toggleCheckbox = (name: string) => {
      setCheckedStates((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
      }));
    };
  
    const handleDelete = (name: string) => {
    
      console.log(`Eliminar elemento: ${name}`);
    };
    const handleEdit = (name: string) => {
      
        console.log(`Editar elemento: ${name}`);
      };
  
      const renderItem = ({ item }: { item: Partial<List2Data> }) => (
        <View key={item.name}>
          <ListItem bottomDivider>
            <GithubOutlined style={{ fontSize: 24, color: "red", marginRight: 10 }} />
            <ListItem.Content>
              <ListItem.Title style={{ color: "red" }}>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content right style={{ flexDirection: 'row' }}> 
              <TouchableOpacity onPress={() => handleEdit(item.name || "")}>
                <EditFilled style={{ fontSize: 24, color: "green", marginRight: 10 }} /> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.name || "")}>
                <DeleteOutlined style={{ fontSize: 24, color: "red" }} />
              </TouchableOpacity>
            </ListItem.Content>
          </ListItem>
        </View>
      );
  
    return (
      <View>
        <FlatList
          ListHeaderComponent={
            <View>
              {list2.map((l) => renderItem({ item: l }))}
            </View>
          }
          data={list2}
          renderItem={renderItem}
          keyExtractor={(item) => (item.name ? item.name.toString() : "")}
        />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: lightColors.greyOutline,
  },
});

export default Lists2;
