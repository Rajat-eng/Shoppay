import { createSlice } from "@reduxjs/toolkit";

export const DialogSlice = createSlice({
  name: "dialog",
  initialState: {
    show: false,
    header: "",
    msgs: [],
    link: {
      link: "",
      link_text: "",
    },
  },
  reducers: {
    showDialog(state, action) {
      const {header,msgs,link}=action.payload
      return {
        ...state,
        header,
        msgs,
        link,
        show:true
      };
    },
    hideDialog(state, action) {
      return {
        ...state,
        show: false,
        header: "",
        msgs: [],
        link: {
          link: "",
          link_text: "",
        },
      };
    },
  },
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
