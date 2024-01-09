import { atom } from 'recoil';
import { Quill } from "quill";

type Docstype = {
    insert: any;
    attributes: any;
  }[];

  export type userStateType = {
    user: string;
    email: string;
  };
  export const userState = atom<any>({
    key: 'userState',
    default: {
        user: null,
        email: null,
    },
  });


  export const quillInstanceAtom = atom<Quill | null>({
    key: 'quillInstance',
    default: null,
  });
  

export type EditButtonState ={
    clicked: boolean;
    data:any;
}

export const editButtonState = atom<EditButtonState>({
    key: 'editButtonAtom',
    default: {
        clicked: false,
        data: null
    }
});



export type DeleteButtonState = {
    clicked: boolean;
    openPopup: boolean;
    data: any; 
  };

export const deleteButtonState = atom<DeleteButtonState>({
    key: 'deleteButtonState',
    default: {
        clicked: false,
        openPopup: false,
        data: null, 
      },
});

export const saveButtonState = atom({
    key: 'saveButtonAtom',
    default: {
        isSaving: false,
        saveError: null,
    }
});


export type NewTabButtonState ={
    clicked: boolean;
    newTab:any;
}

export const newTabButtonState = atom<NewTabButtonState>({
    key: 'newTabButtonAtom',
    default: {
        clicked: false,
        newTab: null
    }
});
export type logoutButtonState ={
    clicked: boolean;
}

export const LogoutButtonState = atom<logoutButtonState>({
    key: 'LogoutButtonAtom',
    default: {
        clicked: false,
    }
});

export type homeButtonState={
    clicked:boolean
};

export const HomeButtonState = atom<homeButtonState>({
    key: 'homeButtonAtom',
    default: {
        clicked: false,
    }
});

export type SaveButtonState ={
    clicked: boolean;
}

export const saveHandlerButtonState = atom<SaveButtonState>({
    key: 'saveButtonAtom',
    default: {
        clicked: false,
    }
});
export const updateHandlerButtonState = atom<SaveButtonState>({
    key: 'updateButtonAtom',
    default: {
        clicked: false,
    }
});

export const savehandlerState = atom({
    key: 'saveHandlerAtom',
    default: {
        clicked: false,
        docName: null,
        saveDoc: false
    }
})