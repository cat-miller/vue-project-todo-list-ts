import { TodoStatus, type Todo } from "@/types";
import {reactive, computed} from "vue";


interface TodoStore {
    [TodoStatus.Pending]: Todo[];
    [TodoStatus.InProgress]: Todo[];
    [TodoStatus.Completed]: Todo[];
}

const defaultVal = {
    [TodoStatus.Pending]: [    
        {
            id: 1,
            title: 'learn Vuejs',
            description: 'Watch codepanion videos',
            status: TodoStatus.Pending,
    },
  ],
    [TodoStatus.InProgress]: [],
    [TodoStatus.Completed]: [],
}

const TodoStore = reactive<TodoStore>(defaultVal);

export default () => {
    const getTodosByStatus = (todoStatus: TodoStatus) => {
        return computed(() => TodoStore[todoStatus])
    };

    const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
        todo.status = newStatus;
    }


    const addNewTodo = (todo: Todo) => {

        TodoStore[todo.status].push(todo);

    };

    const deleteTodo = (todoToDelete: Todo) => {
        TodoStore[todoToDelete.status] = TodoStore[todoToDelete.status].filter((todo) => todo.id !== todoToDelete.id);
    };
 
    return { getTodosByStatus, addNewTodo, deleteTodo, updateTodo };
}