import { Link, router, useNavigation } from "expo-router";
import { Text } from "../components";
import { useEffect, useState } from "react";
import { TaskCard } from "../components/Cards";
import useFetchTasks from "@/hooks/useFetchTasks";
import { View } from "@/components/Themed";
import { Alert, Dimensions, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { ScrollView } from "react-native";
import Buttons from "../components/Buttons";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useCreateTask } from "@/hooks/useCreateTask";
import { Task } from "@/types/types";

export default function create() {
  const navigation = useNavigation();

  const { customTasks, isLoading, error } = useFetchTasks();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const { saveData, loading } = useCreateTask(true);

  const handleCreateTask = async () => {
    if (!selectedTask) return;
    console.log("this is the selected task ,", selectedTask);
    const error = await saveData(selectedTask);

    if (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: "New task", headerShadowVisible: false });
  }, [navigation]);

  if (isLoading) return <Text>Loading</Text>;

  if (error) {
    Alert.alert(error);
  }

  console.log("selectedTask", selectedTask);
  return (
    <View style={styles.container}>
      {/* <Picker data={data} onEmojiSelect={console.log} /> */}

      <ScrollView style={styles.cardsContainer}>
        {customTasks.map((t) => {
          return (
            <TaskCard
              item={t}
              handleTaskClick={() =>
                setSelectedTask((prevState) => {
                  if (prevState?.id == t.id) return null;
                  return t;
                })
              }
              hideCheckBox={true}
              selected={selectedTask?.id == t.id}
            />
          );
        })}
      </ScrollView>
      <View style={{ width: "100%", gap: 10 }}>
        <Buttons.Secondary
          onPress={() => router.replace("(tasks)/CreateTask")}
          label="Create custom task"
          width={"auto"}
        />

        <Buttons.Primary
          onPress={() => {
            handleCreateTask();
          }}
          label="Continue"
          width={"100%"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.white,
    // backgroundColor: "green",
    padding: 30,
    flex: 1,
    alignItems: "center",
  },
  cardsContainer: {
    flex: 1,
  },
});
