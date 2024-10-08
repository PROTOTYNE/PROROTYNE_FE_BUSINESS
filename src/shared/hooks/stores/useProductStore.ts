import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useProductStore = create<Product.Store>()(
  immer((set) => ({
    productName: "",
    contents: "",
    reqTickets: -1,
    notes: "",
    category: "",

    launchedDate: null,

    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",

    images: [],

    setInfo: (
      productName,
      contents,
      reqTickets,
      notes,
      category,
      launchedDate
    ) => {
      set(() => ({
        productName,
        contents,
        reqTickets,
        notes,
        category,
        launchedDate,
      }));
    },

    addImage: (file) => {
      set((state) => {
        if (state.images.length > 4) return;
        state.images.push(file);
      });
    },

    reset: () => {
      set(() => ({
        productName: "",
        contents: "",
        reqTickets: -1,
        notes: "",
        category: "",

        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",

        images: [],
      }));
    },

    setQuestions: ({
      question1,
      question2,
      question3,
      question4,
      question5,
    }) => {
      set(() => ({
        question1,
        question2,
        question3,
        question4,
        question5,
      }));
    },
  }))
);
