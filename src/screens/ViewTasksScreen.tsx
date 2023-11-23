import React, { useContext, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Tareas } from '../components/Tareas';
import { SearchInput } from '../components/SearchInput';
// import { Task } from '../types'; // Asumiendo que tienes un tipo Task definido

interface ViewTasksProps {}
 
type Task = {
    id: number; 
    name: string;
    projectId: string;
    responsible: string;
  };
export const ViewTasks: React.FC<ViewTasksProps> = () => {
  // const [tasks, setTasks] = useState<Task[]>([]); 
  // const [tasks, setTasks] = fetch
  const [taskFiltered, setTaskFiltered] = useState<Task[]>([]);
  const [ term, setTerm ] = useState('')


  const filterTasks = () => {
    const filteredTasks = tasks.filter((task) =>
      task.name.toLowerCase().includes(taskFiltered.toLowerCase()) ||
      task.responsible.toLowerCase().includes(taskFiltered.toLowerCase())
    );
   
    setTasks(filteredTasks);
  };

 
  const showMyTasks = () => {
   
  };

  useEffect(() => {
    

    if(term.length === 0){
      return setTaskFiltered([])
    }
    setTaskFiltered(filterTasks)
  
    
  }, [term])
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Tareas</Text>

      <View style={styles.filterContainer}>

        <SearchInput 
          onDebounce={(value) => setTerm(value)}
          
        
        />


        


        <TextInput
          style={styles.inputField}
          placeholder="Filtrar por nombre o responsable"
          placeholderTextColor="rgba(255,255,255,0.4)"
          onChangeText={(text) => setTaskFiltered(text)}
          value={taskFiltered}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={filterTasks}
        >
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.myTasksButton}
        onPress={showMyTasks}
      >
        <Text style={styles.myTasksButtonText}>Solo Mis Tareas</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.name}</Text>
            <Text>Responsable: {item.responsible}</Text>
          </View>
        )}
      />
      <Tareas></Tareas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  myTasksButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  myTasksButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: '#EFEFEF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
});
