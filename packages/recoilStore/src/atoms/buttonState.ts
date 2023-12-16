import { atom } from 'recoil';

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
    data: any; 
  };

export const deleteButtonState = atom<DeleteButtonState>({
    key: 'deleteButtonState',
    default: {
        clicked: false,
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