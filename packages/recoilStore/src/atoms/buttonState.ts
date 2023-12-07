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
})