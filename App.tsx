import React, {useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';

const App: React.FC = () => {
  const [todoItem, setTodoItem] = useState<string>('');
  const [todoList, setTodoList] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange = (e: string) => {
    setTodoItem(e);
  };
  const handleAddTodo = () => {
    // Add the todo item to the list
    if (editIndex !== null) {
      // Update the existing todo item
      const updatedTodoList = [...todoList];
      updatedTodoList[editIndex] = todoItem;
      setTodoList(updatedTodoList);
      setEditIndex(null); // Reset edit mode
    } else {
      // Add a new todo item to the list
      setTodoList(prevList => [...prevList, todoItem]);
    }
    setTodoItem('');
  };

  const handleDeleteTodo = (index: number) => {
    // Delete the todo item from the list
    setTodoList(prevList => prevList.filter((_, i) => i !== index));
  };

  const handleEditTodo = (index: number) => {
    console.log(index);
    // Delete the todo item from the list
    setTodoItem(todoList[index]);
    setEditIndex(index);
  };
  return (
    <View className="flex-1 justify-start items-center bg-blue-500 py-10">
      <Text className="text-white text-3xl font-bold">Todo App!</Text>
      <View className="flex-row items-center justify-center gap-4 mt-10 px-3">
        <TextInput
          value={todoItem}
          onChangeText={handleChange}
          placeholder="Write todo tasks here"
          className="w-10/12 h-12 bg-white px-4 py-2 rounded-md "
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          className="bg-cyan-200 px-4 py-3 rounded-md">
          <Text className="font-semibold">Add</Text>
        </TouchableOpacity>
      </View>
      {todoList.length > 0 && (
        <Text className="text-gray-200 text-2xl font-bold mt-10">
          Todo List!
        </Text>
      )}

      <FlatList
        data={todoList}
        renderItem={({item, index}) => (
          <View className="w-10/12 flex-row items-center gap-2 mx-2">
            <TouchableOpacity className="w-10/12  h-12 flex-row items-center justify-start gap-2 px-3 py-2 my-3 rounded-md bg-gray-300 ">
              <Text className="" numberOfLines={1}>
                {item}
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                onPress={() => handleEditTodo(index)}
                className="bg-gray-600 px-3 py-3 rounded-md">
                <Text className="text-white font-semibold text-sm">Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(index)}
                className="bg-red-600 px-2 py-3 rounded-md">
                <Text className="text-white font-semibold text-sm">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{marginBottom: 20}}
      />
    </View>
  );
};

export default App;
