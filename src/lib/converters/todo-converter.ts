import { Todo } from "@/types/todo";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export const todoConverter = {
  toFirestore: function (todo: Todo): DocumentData {
    return {
      title: todo.title,
      description: todo.description,
      createdAt: todo.createdAt,
      lastUpdatedAt: todo.lastUpdatedAt,
      frequency: todo.frequency,
      completedDates: todo.completedDates,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Todo {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      description: data.description,
      createdAt: data.createdAt.toDate(),
      lastUpdatedAt: data.lastUpdatedAt.toDate(),
      frequency: data.frequency,
      completedDates: data.completedDates?.map((date: any) => date.toDate()),
    };
  },
};
