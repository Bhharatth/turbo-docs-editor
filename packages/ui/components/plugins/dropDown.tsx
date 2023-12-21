import { useState } from 'react';
import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import { DeleteButtonState, EditButtonState, deleteButtonState, editButtonState } from '@gdocs/recoilstore';
import { useRecoilState } from 'recoil';
import { roundToNearestMinutes } from 'date-fns';

type MenuProps = {
  fileId: number;
};

const DropdownMenuDemo: React.FC<MenuProps> = ({ fileId }) => {
  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [person, setPerson] = useState('pedro');

  const [editButtonClicked, setEditButtonClicked] = useRecoilState(editButtonState);
  const [deleteButtonStateData, setDeleteButtonState]  = useRecoilState(deleteButtonState)

  // const [editClicked, seteditClicked] = 

  const handleDeleteButtonClick =(fileId)=> {
    setDeleteButtonState((prevState:  DeleteButtonState)=> ({
      // ...prevState,
      clicked: true,
      openPopup: false,
      data: fileId
    }))
  };

  const handleEditButtonClick =(fileId)=> {
    setEditButtonClicked((prevState: EditButtonState)=> ({
      ...prevState,
      clicked: true,
      data: fileId
    }))
  }


  return (
    <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button
        className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        aria-label="Customize options"
      >
        <HamburgerMenuIcon />
      </button>
    </DropdownMenu.Trigger>
  
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
        
      >
        <DropdownMenu.Item className="group text-[16px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1" 
        onClick={()=> handleEditButtonClick(fileId)}>
          Edit{' '}
          <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white">
            ⌘+T <span className="rounded-full h-2 w-2 inline-block bg-green-500 ml-1" />
          </div>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="group text-[16px] leading-none text-green rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
        onClick={()=> handleDeleteButtonClick (fileId)}>
          Delete{' '}
          <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white">
            ⌘+N <span className="rounded-full h-2 w-2 inline-block bg-red-500 ml-1" />
          </div>
        </DropdownMenu.Item>
  
        <DropdownMenu.Arrow className="fill-white" />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
  
  );
};

export default DropdownMenuDemo;